import {
  Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, NgZone,
  OnDestroy
} from '@angular/core';
import {AudioPlayerService} from "../services/audio-player/audio-player.service";
import wavesUI from 'waves-ui';
import {
  FeatureExtractionService
} from "../services/feature-extraction/feature-extraction.service";
import {Subscription} from "rxjs";
import {
  FeatureCollection,
  FixedSpacedFeatures, SimpleResponse
} from "piper/HigherLevelUtilities";
import {toSeconds} from "piper";
import {FeatureList, Feature} from "piper/Feature";
import * as Hammer from 'hammerjs';

type Timeline = any; // TODO what type actually is it.. start a .d.ts for waves-ui?
type Layer = any;
type Track = any;
type DisposableIndex = number;
type Colour = string;

@Component({
  selector: 'app-waveform',
  templateUrl: './waveform.component.html',
  styleUrls: ['./waveform.component.css']
})
export class WaveformComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('track') trackDiv: ElementRef;

  private _audioBuffer: AudioBuffer;
  private timeline: Timeline;
  private cursorLayer: any;
  private disposableLayers: Layer[];
  private colouredLayers: Map<DisposableIndex, Colour>;

  @Input()
  set audioBuffer(buffer: AudioBuffer) {
    this._audioBuffer = buffer || undefined;
    if (this.audioBuffer)
      this.renderWaveform(this.audioBuffer);
  }

  get audioBuffer(): AudioBuffer {
    return this._audioBuffer;
  }

  private featureExtractionSubscription: Subscription;
  private playingStateSubscription: Subscription;
  private seekedSubscription: Subscription;
  private isPlaying: boolean;

  constructor(private audioService: AudioPlayerService,
              private piperService: FeatureExtractionService,
              public ngZone: NgZone) {
    this.colouredLayers = new Map();
    this.disposableLayers = [];
    this._audioBuffer = undefined;
    this.timeline = undefined;
    this.cursorLayer = undefined;
    this.isPlaying = false;
    const colours = function* () {
      const circularColours = [
        'black',
        'red',
        'green',
        'purple',
        'orange'
      ];
      let index = 0;
      const nColours = circularColours.length;
      while (true) {
        yield circularColours[index = ++index % nColours];
      }
    }();

    this.featureExtractionSubscription = piperService.featuresExtracted$.subscribe(
      features => {
        this.renderFeatures(features, colours.next().value);
      });
    this.playingStateSubscription = audioService.playingStateChange$.subscribe(
      isPlaying => {
        this.isPlaying = isPlaying;
        if (this.isPlaying)
          this.animate();
      });
    this.seekedSubscription = audioService.seeked$.subscribe(() => {
      if (!this.isPlaying)
        this.animate();
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.timeline = this.renderTimeline();
  }

  renderTimeline(duration: number = 1.0): Timeline {
    const track: HTMLElement = this.trackDiv.nativeElement;
    track.innerHTML = "";
    const height: number = track.getBoundingClientRect().height;
    const width: number = track.getBoundingClientRect().width;
    const pixelsPerSecond = width / duration;
    const timeline = new wavesUI.core.Timeline(pixelsPerSecond, width);
    timeline.createTrack(track, height, 'main');
    return timeline;
  }

  renderWaveform(buffer: AudioBuffer): void {
    const height: number = this.trackDiv.nativeElement.getBoundingClientRect().height;
    const mainTrack = this.timeline.getTrackById('main');
    if (this.timeline) {
      // resize
      const width = this.trackDiv.nativeElement.getBoundingClientRect().width;

      // loop through layers and remove them, waves-ui provides methods for this but it seems to not work properly
      const timeContextChildren = this.timeline.timeContext._children;

      for (let i = 0, length = this.disposableLayers.length; i < length; ++i) {
        let layer = this.disposableLayers.pop();
        mainTrack.remove(layer);

        const index = timeContextChildren.indexOf(layer.timeContext);
        if (index >= 0)
          timeContextChildren.splice(index, 1);
        layer.destroy();
      }
      this.colouredLayers.clear();

      this.timeline.visibleWidth = width;
      this.timeline.pixelsPerSecond = width / buffer.duration;
      mainTrack.height = height;
    } else {
      this.timeline = this.renderTimeline(buffer.duration)
    }
    this.timeline.timeContext.offset = 0.5 * this.timeline.timeContext.visibleDuration;
    // time axis
    const timeAxis = new wavesUI.helpers.TimeAxisLayer({
      height: height,
      color: 'gray'
    });
    this.addLayer(timeAxis, mainTrack, this.timeline.timeContext, true);

    const waveformLayer = new wavesUI.helpers.WaveformLayer(buffer, {
      top: 10,
      height: height * 0.9,
      color: 'darkblue'
    });
    this.addLayer(waveformLayer, mainTrack, this.timeline.timeContext);

    this.cursorLayer = new wavesUI.helpers.CursorLayer({
      height: height
    });
    this.addLayer(this.cursorLayer, mainTrack, this.timeline.timeContext);
    this.timeline.state = new wavesUI.states.CenteredZoomState(this.timeline);
    mainTrack.render();
    mainTrack.update();


    if ('ontouchstart' in window) {
      console.log('TOUCH!');
      const hammertime = new Hammer(this.trackDiv.nativeElement);
      const scroll = (ev) => {
        const sign = ev.direction === Hammer.DIRECTION_LEFT ? -1 : 1;
        let delta = this.timeline.timeContext.timeToPixel.invert(sign * ev.distance);
        if (Math.abs(ev.velocityX) < 2 /*arbitrary, it just felt a bit better than 1*/) {
          delta *= Math.abs(ev.velocityX);
        }
        this.timeline.timeContext.offset += delta;
        this.timeline.tracks.update();
      };

      const zoom = (ev) => {
        const minZoom = this.timeline.state.minZoom;
        const maxZoom = this.timeline.state.maxZoom;
        const initialZoom = this.timeline.timeContext.zoom;
        const targetZoom = initialZoom * ev.scale;
        this.timeline.timeContext.zoom = Math.min(Math.max(targetZoom, minZoom), maxZoom);
        this.timeline.tracks.update();
      };
      const seek = (ev) => {
        this.audioService.seekTo(
          this.timeline.timeContext.timeToPixel.invert(ev.center.x) - this.timeline.timeContext.offset
        );
      };
      hammertime.get('pinch').set({ enable: true });
      hammertime.on('panleft', scroll);
      hammertime.on('panright', scroll);
      hammertime.on('pinch', zoom);
      hammertime.on('tap', seek);
    }

    this.animate();
  }

  // TODO refactor - this doesn't belong here
  private renderFeatures(extracted: SimpleResponse, colour: Colour): void {
    if (!extracted.hasOwnProperty('features') || !extracted.hasOwnProperty('outputDescriptor')) return;
    if (!extracted.features.hasOwnProperty('shape') || !extracted.features.hasOwnProperty('data')) return;
    const features: FeatureCollection = (extracted.features as FeatureCollection);
    const outputDescriptor = extracted.outputDescriptor;
    const height = this.trackDiv.nativeElement.getBoundingClientRect().height;
    const mainTrack = this.timeline.getTrackById('main');

    // TODO refactor all of this
    switch (features.shape) {
      case 'vector': {
        const stepDuration = (features as FixedSpacedFeatures).stepDuration;
        const featureData = (features.data as Float32Array);
        if (featureData.length === 0) return;
        const normalisationFactor = 1.0 /
          featureData.reduce(
            (currentMax, feature) => Math.max(currentMax, feature),
            -Infinity
          );

        const plotData = [...featureData].map((feature, i) => {
          return {
            cx: i * stepDuration,
            cy: feature * normalisationFactor
          };
        });

        let breakpointLayer = new wavesUI.helpers.BreakpointLayer(plotData, {
          color: colour,
          height: height
        });
        this.colouredLayers.set(this.addLayer(
          breakpointLayer,
          mainTrack,
          this.timeline.timeContext
        ), colour);
        break;
      }
      case 'list': {
        const featureData = (features.data as FeatureList);
        if (featureData.length === 0) return;
        // TODO look at output descriptor instead of directly inspecting features
        const hasDuration = outputDescriptor.configured.hasDuration;
        const isMarker = !hasDuration
          && outputDescriptor.configured.binCount === 0
          && featureData[0].featureValues == null;
        const isRegion = hasDuration
          && featureData[0].timestamp != null;
        // TODO refactor, this is incomprehensible
        if (isMarker) {
          const plotData = featureData.map(feature => {
            return {x: toSeconds(feature.timestamp)}
          });
          let markerLayer = new wavesUI.helpers.MarkerLayer(plotData, {
            height: height,
            color: colour,
          });
          this.colouredLayers.set(this.addLayer(
            markerLayer,
            mainTrack,
            this.timeline.timeContext
          ), colour);
        } else if (isRegion) {
          const binCount = outputDescriptor.configured.binCount || 0;
          const isBarRegion = featureData[0].featureValues.length >= 1 || binCount >= 1 ;
          const getSegmentArgs = () => {
            if (isBarRegion) {

              // TODO refactor - this is messy
              interface FoldsToNumber<T> {
                reduce(fn: (previousValue: number,
                            currentValue: T,
                            currentIndex: number,
                            array: ArrayLike<T>) => number,
                       initialValue?: number): number;
              }

              // TODO potentially change impl., i.e avoid reduce
              const findMin = <T>(arr: FoldsToNumber<T>, getElement: (x: T) => number): number => {
                return arr.reduce((min, val) => Math.min(min, getElement(val)), Infinity);
              };

              const findMax = <T>(arr: FoldsToNumber<T>, getElement: (x: T) => number): number => {
                return arr.reduce((min, val) => Math.max(min, getElement(val)), -Infinity);
              };

              const min = findMin<Feature>(featureData, (x: Feature) => {
                return findMin<number>(x.featureValues, y => y);
              });

              const max = findMax<Feature>(featureData, (x: Feature) => {
                return findMax<number>(x.featureValues, y => y);
              });

              const barHeight = 1.0 / height;
              return [
                featureData.reduce((bars, feature) => {
                  const staticProperties = {
                    x: toSeconds(feature.timestamp),
                    width: toSeconds(feature.duration),
                    height: min + barHeight,
                    color: colour,
                    opacity: 0.8
                  };
                  // TODO avoid copying Float32Array to an array - map is problematic here
                  return bars.concat([...feature.featureValues]
                    .map(val => Object.assign({}, staticProperties, {y: val})))
                }, []),
                {yDomain: [min, max + barHeight], height: height} as any
              ];
            } else {
              return [featureData.map(feature => {
                return {
                  x: toSeconds(feature.timestamp),
                  width: toSeconds(feature.duration),
                  color: colour,
                  opacity: 0.8
                }
              }), {height: height}];
            }
          };

          let segmentLayer = new wavesUI.helpers.SegmentLayer(
            ...getSegmentArgs()
          );
          this.colouredLayers.set(this.addLayer(
            segmentLayer,
            mainTrack,
            this.timeline.timeContext
          ), colour);
        }

        break;
      }
      default:
        console.log('Cannot render an appropriate layer.');
    }

    this.timeline.tracks.update();
  }

  private animate(): void {
    this.ngZone.runOutsideAngular(() => {
      // listen for time passing...
      const updateSeekingCursor = () => {
        const currentTime = this.audioService.getCurrentTime();
        this.cursorLayer.currentPosition = currentTime;
        this.cursorLayer.update();

        const currentOffset = this.timeline.timeContext.offset;
        const offsetTimestamp = currentOffset
          + currentTime;

        const visibleDuration = this.timeline.timeContext.visibleDuration;
        // TODO reduce duplication between directions and make more declarative
        // this kinda logic should also be tested
        const mustPageForward = offsetTimestamp > visibleDuration;
        const mustPageBackward = currentTime < -currentOffset;

        if (mustPageForward) {
          const hasSkippedMultiplePages = offsetTimestamp - visibleDuration > visibleDuration;

          this.timeline.timeContext.offset = hasSkippedMultiplePages
              ? -currentTime +  0.5 * visibleDuration
              :  currentOffset - visibleDuration;
          this.timeline.tracks.update();
        }

        if (mustPageBackward) {
          const hasSkippedMultiplePages = currentTime + visibleDuration < -currentOffset;
          this.timeline.timeContext.offset = hasSkippedMultiplePages
            ? -currentTime + 0.5 * visibleDuration
            : currentOffset + visibleDuration;
          this.timeline.tracks.update();
        }

        if (this.isPlaying)
          requestAnimationFrame(updateSeekingCursor);
      };
      updateSeekingCursor();
    });
  }

  private addLayer(layer: Layer, track: Track, timeContext: any, isAxis: boolean = false): DisposableIndex {
    timeContext.zoom = 1.0;
    if (!layer.timeContext) {
      layer.setTimeContext(isAxis ?
        timeContext : new wavesUI.core.LayerTimeContext(timeContext));
    }
    track.add(layer);
    layer.render();
    layer.update();
    return this.disposableLayers.push(layer) - 1;
  }

  private static changeColour(layer: Layer, colour: string): void {
    const butcherShapes = (shape) => {
      shape.install({color: () => colour});
      shape.params.color = colour;
      shape.update(layer._renderingContext, layer.data);
    };

    layer._$itemCommonShapeMap.forEach(butcherShapes);
    layer._$itemShapeMap.forEach(butcherShapes);
    layer.render();
    layer.update();
  }

  ngOnDestroy(): void {
    this.featureExtractionSubscription.unsubscribe();
    this.playingStateSubscription.unsubscribe();
    this.seekedSubscription.unsubscribe();
  }
}
