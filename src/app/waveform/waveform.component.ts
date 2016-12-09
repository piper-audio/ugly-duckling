import {
  Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, NgZone,
  OnDestroy
} from '@angular/core';
import {AudioPlayerService} from "../services/audio-player/audio-player.service";
import wavesUI from 'waves-ui';
import {FeatureList} from "piper/Feature";
import {FeatureExtractionService} from "../services/feature-extraction/feature-extraction.service";
import {Subscription} from "rxjs";
import {toSeconds} from "piper";

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
    timeline.timeContext.offset = 0.5 * timeline.timeContext.visibleDuration;
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
    this.animate();
  }

  // TODO refactor - this doesn't belong here
  private renderFeatures(features: FeatureList, colour: Colour): void {
    const normalisationFactor = 1.0 /
      features.reduce((currentMax, feature) => {
        return (feature.featureValues)
          ? Math.max(currentMax, feature.featureValues[0])
          : currentMax;
      }, -Infinity);
    const plotData = features.map(feature => {
      return {
        cx: toSeconds(feature.timestamp),
        cy: feature.featureValues[0] * normalisationFactor
      };
    });
    let breakpointLayer = new wavesUI.helpers.BreakpointLayer(plotData, {
      color: colour,
      height: this.trackDiv.nativeElement.getBoundingClientRect().height
    });
    this.colouredLayers.set(this.addLayer(
      breakpointLayer,
      this.timeline.getTrackById('main'),
      this.timeline.timeContext
    ), colour);

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
