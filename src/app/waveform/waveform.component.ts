import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  AfterViewInit,
  NgZone,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import {
  AudioPlayerService, AudioResource,
  AudioResourceError
} from '../services/audio-player/audio-player.service';
import wavesUI from 'waves-ui';
import {
  FeatureExtractionService
} from '../services/feature-extraction/feature-extraction.service';
import {Subscription} from 'rxjs/Subscription';
import {
  FeatureCollection,
  FixedSpacedFeatures,
  SimpleResponse
} from 'piper/HigherLevelUtilities';
import {toSeconds} from 'piper';
import {FeatureList, Feature} from 'piper/Feature';
import * as Hammer from 'hammerjs';
import {WavesSpectrogramLayer} from '../spectrogram/Spectrogram';

type Layer = any;
type Track = any;
type Colour = string;

const colours = function* () {
  const circularColours = [
    '#0868ac', // "sapphire blue", our waveform / header colour
    '#c33c54', // "brick red"
    '#17bebb', // "tiffany blue"
    '#001021', // "rich black"
    '#fa8334', // "mango tango"
    '#034748' // "deep jungle green"
  ];
  let index = 0;
  const nColours = circularColours.length;
  while (true) {
    yield circularColours[index = ++index % nColours];
  }
}();

@Component({
  selector: 'ugly-waveform',
  templateUrl: './waveform.component.html',
  styleUrls: ['./waveform.component.css']
})

export class WaveformComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('track') trackDiv: ElementRef;

  @Input() timeline: Timeline;
  @Input() trackIdPrefix: string;
  @Input() set isSubscribedToExtractionService(isSubscribed: boolean) {
    if (isSubscribed) {
      if (this.featureExtractionSubscription) {
        return;
      }
      
      this.featureExtractionSubscription =
        this.piperService.featuresExtracted$.subscribe(
          features => {
            this.renderFeatures(features, colours.next().value);
          });
    } else {
      if (this.featureExtractionSubscription) {
        this.featureExtractionSubscription.unsubscribe();
      }
    }
  }
  @Input() set isSubscribedToAudioService(isSubscribed: boolean) {
    this._isSubscribedToAudioService = isSubscribed;
    if (isSubscribed) {
      if (this.onAudioDataSubscription) {
        return;
      }

      this.onAudioDataSubscription =
        this.audioService.audioLoaded$.subscribe(res => {
          const wasError = (res as AudioResourceError).message != null;

          if (wasError) {
            console.warn('No audio, display error?');
          } else {
            this.audioBuffer = (res as AudioResource).samples;
          }
        });
    } else {
      if (this.onAudioDataSubscription) {
        this.onAudioDataSubscription.unsubscribe();
      }
    }
  }

  get isSubscribedToAudioService(): boolean {
    return this._isSubscribedToAudioService;
  }

  @Input() set isOneShotExtractor(isOneShot: boolean) {
    this._isOneShotExtractor = isOneShot;
  }

  get isOneShotExtractor(): boolean {
    return this._isOneShotExtractor;
  }

  @Input() set isSeeking(isSeeking: boolean) {
    this._isSeeking = isSeeking;
    if (isSeeking) {
      if (this.seekedSubscription) {
        return;
      }
      if (this.playingStateSubscription) {
        return;
      }

      this.seekedSubscription = this.audioService.seeked$.subscribe(() => {
        if (!this.isPlaying) {
          this.animate();
        }
      });
      this.playingStateSubscription =
        this.audioService.playingStateChange$.subscribe(
          isPlaying => {
            this.isPlaying = isPlaying;
            if (this.isPlaying) {
              this.animate();
            }
          });
    } else {
      if (this.isPlaying) {
        this.isPlaying = false;
      }
      if (this.playingStateSubscription) {
        this.playingStateSubscription.unsubscribe();
      }
      if (this.seekedSubscription) {
        this.seekedSubscription.unsubscribe();
      }
    }
  }

  get isSeeking(): boolean {
    return this._isSeeking;
  }

  set audioBuffer(buffer: AudioBuffer) {
    this._audioBuffer = buffer || undefined;
    if (this.audioBuffer) {
      this.renderWaveform(this.audioBuffer);
      // this.renderSpectrogram(this.audioBuffer);
    }
  }

  get audioBuffer(): AudioBuffer {
    return this._audioBuffer;
  }

  private _audioBuffer: AudioBuffer;
  private _isSubscribedToAudioService: boolean;
  private _isOneShotExtractor: boolean;
  private _isSeeking: boolean;
  private cursorLayer: any;
  private highlightLayer: any;
  private layers: Layer[];
  private featureExtractionSubscription: Subscription;
  private playingStateSubscription: Subscription;
  private seekedSubscription: Subscription;
  private onAudioDataSubscription: Subscription;
  private isPlaying: boolean;
  private zoomOnMouseDown: number;
  private offsetOnMouseDown: number;
  private hasShot: boolean;
  private isLoading: boolean;

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

  constructor(private audioService: AudioPlayerService,
              private piperService: FeatureExtractionService,
              private ngZone: NgZone,
              private ref: ChangeDetectorRef) {
    this.isSubscribedToAudioService = true;
    this.isSeeking = true;
    this.layers = [];
    this.audioBuffer = undefined;
    this.timeline = undefined;
    this.cursorLayer = undefined;
    this.highlightLayer = undefined;
    this.isPlaying = false;
    this.isLoading = true;
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.trackIdPrefix = this.trackIdPrefix || 'default';
    if (this.timeline) {
      this.renderTimeline(null, true, true);
    } else {
      this.renderTimeline();
    }
  }

  renderTimeline(duration: number = 1.0,
                 useExistingDuration: boolean = false,
                 isInitialRender: boolean = false): Timeline {
    const track: HTMLElement = this.trackDiv.nativeElement;
    track.innerHTML = '';
    const height: number = track.getBoundingClientRect().height;
    const width: number = track.getBoundingClientRect().width;
    const pixelsPerSecond = width / duration;
    const hasExistingTimeline = this.timeline instanceof wavesUI.core.Timeline;

    if (hasExistingTimeline) {
      if (!useExistingDuration) {
        this.timeline.pixelsPerSecond = pixelsPerSecond;
        this.timeline.visibleWidth = width;
      }
    } else {
      this.timeline = new wavesUI.core.Timeline(pixelsPerSecond, width);
    }
    const waveTrack = this.timeline.createTrack(
      track,
      height,
      `wave-${this.trackIdPrefix}`
    );
    if (isInitialRender && hasExistingTimeline) {
      // time axis
      const timeAxis = new wavesUI.helpers.TimeAxisLayer({
        height: height,
        color: '#b0b0b0'
      });
      this.addLayer(timeAxis, waveTrack, this.timeline.timeContext, true);
      this.cursorLayer = new wavesUI.helpers.CursorLayer({
        height: height,
        color: '#c33c54'
      });
      this.addLayer(this.cursorLayer, waveTrack, this.timeline.timeContext);
    }
    if ('ontouchstart' in window) {
      interface Point {
        x: number;
        y: number;
      }

      let zoomGestureJustEnded = false;

      const pixelToExponent: Function = wavesUI.utils.scales.linear()
        .domain([0, 100]) // 100px => factor 2
        .range([0, 1]);

      const calculateDistance: (p1: Point, p2: Point) => number = (p1, p2) => {
        return Math.pow(
          Math.pow(p2.x - p1.x, 2) +
          Math.pow(p2.y - p1.y, 2), 0.5);
      };

      const calculateMidPoint: (p1: Point, p2: Point) => Point = (p1, p2) => {
        return {
          x: 0.5 * (p1.x + p2.x),
          y: 0.5 * (p1.y + p2.y)
        };
      };

      const hammertime = new Hammer.Manager(this.trackDiv.nativeElement, {
        recognizers: [
          [Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }]
        ]
      });

      // it seems HammerJs binds the event to the window?
      // causing these events to propagate to other components?
      const componentTimeline = this.timeline;
      let initialZoom;
      let initialDistance;
      let offsetAtPanStart;
      let startX;
      let isZooming;

      const scroll = (ev) => {
        if (ev.center.x - startX === 0) {
          return;
        }

        if (zoomGestureJustEnded) {
          zoomGestureJustEnded = false;
          console.log('Skip this event: likely a single touch dangling from pinch');
          return;
        }
        componentTimeline.timeContext.offset = offsetAtPanStart +
          componentTimeline.timeContext.timeToPixel.invert(ev.deltaX);
        componentTimeline.tracks.update();
      };

      const zoom = (ev) => {
        if (ev.touches.length < 2) {
          return;
        }

        ev.preventDefault();
        const minZoom = componentTimeline.state.minZoom;
        const maxZoom = componentTimeline.state.maxZoom;
        const p1: Point = {
          x: ev.touches[0].clientX,
          y: ev.touches[0].clientY
        };
        const p2: Point = {
          x: ev.touches[1].clientX,
          y: ev.touches[1].clientY
        };
        const distance = calculateDistance(p1, p2);
        const midPoint = calculateMidPoint(p1, p2);

        const lastCenterTime =
          componentTimeline.timeContext.timeToPixel.invert(midPoint.x);

        const exponent = pixelToExponent(distance - initialDistance);
        const targetZoom = initialZoom * Math.pow(2, exponent);

        componentTimeline.timeContext.zoom =
          Math.min(Math.max(targetZoom, minZoom), maxZoom);

        const newCenterTime =
          componentTimeline.timeContext.timeToPixel.invert(midPoint.x);

        componentTimeline.timeContext.offset += newCenterTime - lastCenterTime;
        componentTimeline.tracks.update();
      };
      hammertime.on('panstart', (ev) => {
        offsetAtPanStart = componentTimeline.timeContext.offset;
        startX = ev.center.x;
      });
      hammertime.on('panleft', scroll);
      hammertime.on('panright', scroll);


      const element: HTMLElement = this.trackDiv.nativeElement;
      element.addEventListener('touchstart', (e) => {
        if (e.touches.length < 2) {
          return;
        }

        isZooming = true;
        initialZoom = componentTimeline.timeContext.zoom;

        initialDistance = calculateDistance({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        }, {
          x: e.touches[1].clientX,
          y: e.touches[1].clientY
        });
      });
      element.addEventListener('touchend', () => {
        if (isZooming) {
          isZooming = false;
          zoomGestureJustEnded = true;
        }
       });
      element.addEventListener('touchmove', zoom);
    }
    // this.timeline.createTrack(track, height/2, `wave-${this.trackIdPrefix}`);
    // this.timeline.createTrack(track, height/2, `grid-${this.trackIdPrefix}`);
  }

  estimatePercentile(matrix, percentile) {
    // our sample is not evenly distributed across the whole data set:
    // it is guaranteed to include at least one sample from every
    // column, and could sample some values more than once. But it
    // should be good enough in most cases (todo: show this)
    if (matrix.length === 0) {
      return 0.0;
    }
    const w = matrix.length;
    const h = matrix[0].length;
    const n = w * h;
    const m = (n > 50000 ? 50000 : n); // should base that on the %ile
    let m_per = Math.floor(m / w);
    if (m_per < 1) {
      m_per = 1;
    }

    const sample = [];
    for (let x = 0; x < w; ++x) {
      for (let i = 0; i < m_per; ++i) {
        const y = Math.floor(Math.random() * h);
        const value = matrix[x][y];
        if (!isNaN(value) && value !== Infinity) {
          sample.push(value);
        }
      }
    }
    if (sample.length === 0) {
      console.log('WARNING: No samples gathered, even though we hoped for ' +
                  (m_per * w) + ' of them');
      return 0.0;
    }
    sample.sort((a, b) => { return a - b; });
    const ix = Math.floor((sample.length * percentile) / 100);
    console.log('Estimating ' + percentile + '-%ile of ' +
                n + '-sample dataset (' + w + ' x ' + h + ') as value ' + ix +
                ' of sorted ' + sample.length + '-sample subset');
    const estimate = sample[ix];
    console.log('Estimate is: ' + estimate + ' (where min sampled value = ' +
                sample[0] + ' and max = ' + sample[sample.length - 1] + ')');
    return estimate;
  }

  interpolatingMapper(hexColours) {
    const colours = hexColours.map(n => {
      const i = parseInt(n, 16);
      return [ ((i >> 16) & 255) / 255.0,
               ((i >> 8) & 255) / 255.0,
               ((i) & 255) / 255.0 ];
    });
    const last = colours.length - 1;
    return (value => {
      const m = value * last;
      if (m >= last) {
        return colours[last];
      }
      if (m <= 0) {
        return colours[0];
      }
      const base = Math.floor(m);
      const prop0 = base + 1.0 - m;
      const prop1 = m - base;
      const c0 = colours[base];
      const c1 = colours[base + 1];
      return [ c0[0] * prop0 + c1[0] * prop1,
               c0[1] * prop0 + c1[1] * prop1,
               c0[2] * prop0 + c1[2] * prop1 ];
    });
  }

  iceMapper() {
    const hexColours = [
      // Based on ColorBrewer ylGnBu
      'ffffff', 'ffff00', 'f7fcf0', 'e0f3db', 'ccebc5', 'a8ddb5',
      '7bccc4', '4eb3d3', '2b8cbe', '0868ac', '084081', '042040'
    ];
    hexColours.reverse();
    return this.interpolatingMapper(hexColours);
  }

  hsv2rgb(h, s, v) { // all values in range [0, 1]
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    let r = 0, g = 0, b = 0;
    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }
    return [ r, g, b ];
  }

  greenMapper() {
    const blue = 0.6666;
    const pieslice = 0.3333;
    return (value => {
      const h = blue - value * 2.0 * pieslice;
      const s = 0.5 + value / 2.0;
      const v = value;
      return this.hsv2rgb(h, s, v);
    });
  }

  sunsetMapper() {
    return (value => {
      const r = (value - 0.24) * 2.38;
      const g = (value - 0.64) * 2.777;
      let b = (3.6 * value);
      if (value > 0.277) {
        b = 2.0 - b;
      }
      return [ r, g, b ];
    });
  }

  clearTimeline(): void {
    // loop through layers and remove them, waves-ui provides methods for this but it seems to not work properly
    const timeContextChildren = this.timeline.timeContext._children;
    for (const track of this.timeline.tracks) {
      if (track.layers.length === 0) { continue; }
      const trackLayers = Array.from(track.layers);
      while (trackLayers.length) {
        const layer: Layer = trackLayers.pop();
        if (this.layers.includes(layer)) {
          track.remove(layer);
          this.layers.splice(this.layers.indexOf(layer), 1);
          const index = timeContextChildren.indexOf(layer.timeContext);
          if (index >= 0) {
            timeContextChildren.splice(index, 1);
          }
          layer.destroy();
        }
      }
    }
  }

  renderWaveform(buffer: AudioBuffer): void {
    // const height: number = this.trackDiv.nativeElement.getBoundingClientRect().height / 2;
    const height: number = this.trackDiv.nativeElement.getBoundingClientRect().height;
    const waveTrack = this.timeline.getTrackById(`wave-${this.trackIdPrefix}`);
    if (this.timeline) {
      // resize
      const width = this.trackDiv.nativeElement.getBoundingClientRect().width;

      this.clearTimeline();

      this.timeline.visibleWidth = width;
      this.timeline.pixelsPerSecond = width / buffer.duration;
      waveTrack.height = height;
    } else {
      this.renderTimeline(buffer.duration);
    }
    this.timeline.timeContext.offset = 0.5 * this.timeline.timeContext.visibleDuration;

    // time axis
    const timeAxis = new wavesUI.helpers.TimeAxisLayer({
      height: height,
      color: '#b0b0b0'
    });
    this.addLayer(timeAxis, waveTrack, this.timeline.timeContext, true);

    const nchannels = buffer.numberOfChannels;
    const totalWaveHeight = height * 0.9;
    const waveHeight = totalWaveHeight / nchannels;

    for (let ch = 0; ch < nchannels; ++ch) {
      console.log('about to construct a waveform layer for channel ' + ch);
      const waveformLayer = new wavesUI.helpers.WaveformLayer(buffer, {
        top: (height - totalWaveHeight) / 2 + waveHeight * ch,
        height: waveHeight,
        color: '#0868ac',
        channel: ch
      });
      this.addLayer(waveformLayer, waveTrack, this.timeline.timeContext);
    }

    this.cursorLayer = new wavesUI.helpers.CursorLayer({
      height: height,
      color: '#c33c54'
    });
    this.addLayer(this.cursorLayer, waveTrack, this.timeline.timeContext);
    this.timeline.state = new wavesUI.states.CenteredZoomState(this.timeline);
    waveTrack.render();
    waveTrack.update();

    this.isLoading = false;
    this.ref.markForCheck();
    this.animate();
  }

  renderSpectrogram(buffer: AudioBuffer): void {
    const height: number = this.trackDiv.nativeElement.getBoundingClientRect().height / 2;
    const gridTrack = this.timeline.getTrackById(`grid-${this.trackIdPrefix}`);

    const spectrogramLayer = new WavesSpectrogramLayer(buffer, {
      top: 0,
      height: height,
      stepSize: 512,
      blockSize: 1024,
      normalise: 'none',
      mapper: this.sunsetMapper()
    });
    this.addLayer(spectrogramLayer, gridTrack, this.timeline.timeContext);

    this.timeline.tracks.update();
  }

  // TODO refactor - this doesn't belong here
  private renderFeatures(extracted: SimpleResponse, colour: Colour): void {
    if (this.isOneShotExtractor && !this.hasShot) {
      this.featureExtractionSubscription.unsubscribe();
      this.hasShot = true;
    }

    if (!extracted.hasOwnProperty('features')
      || !extracted.hasOwnProperty('outputDescriptor')) {
      return;
    }
    if (!extracted.features.hasOwnProperty('shape')
      || !extracted.features.hasOwnProperty('data')) {
      return;
    }
    const features: FeatureCollection = (extracted.features as FeatureCollection);
    const outputDescriptor = extracted.outputDescriptor;
    // const height = this.trackDiv.nativeElement.getBoundingClientRect().height / 2;
    const height = this.trackDiv.nativeElement.getBoundingClientRect().height;
    const waveTrack = this.timeline.getTrackById(`wave-${this.trackIdPrefix}`);

    // TODO refactor all of this
    switch (features.shape) {
      case 'vector': {
        const stepDuration = (features as FixedSpacedFeatures).stepDuration;
        const featureData = (features.data as Float32Array);
        if (featureData.length === 0) {
          return;
        }
        const plotData = [...featureData].map((feature, i) => {
          return {
            cx: i * stepDuration,
            cy: feature
          };
        });
        let min = featureData.reduce((m, f) => Math.min(m, f), Infinity);
        let max = featureData.reduce((m, f) => Math.max(m, f), -Infinity);
        if (min === Infinity) {
          min = 0;
          max = 1;
        }
        const lineLayer = new wavesUI.helpers.LineLayer(plotData, {
          color: colour,
          height: height,
          yDomain: [ min, max ]
        });
        this.addLayer(
          lineLayer,
          waveTrack,
          this.timeline.timeContext
        );
        this.highlightLayer = new wavesUI.helpers.HighlightLayer(lineLayer, {
          opacity: 0.7,
          height: height,
          color: '#c33c54',
          yDomain: [ min, max ]
        });
        this.addLayer(
          this.highlightLayer,
          waveTrack,
          this.timeline.timeContext
        );
        break;
      }
      case 'list': {
        const featureData = (features.data as FeatureList);
        if (featureData.length === 0) {
          return;
        }
        // TODO look at output descriptor instead of directly inspecting features
        const hasDuration = outputDescriptor.configured.hasDuration;
        const isMarker = !hasDuration
          && outputDescriptor.configured.binCount === 0
          && featureData[0].featureValues == null;
        const isRegion = hasDuration
          && featureData[0].timestamp != null;
        console.log('Have list features: length ' + featureData.length +
                    ', isMarker ' + isMarker + ', isRegion ' + isRegion +
                    ', hasDuration ' + hasDuration);
        // TODO refactor, this is incomprehensible
        if (isMarker) {
          const plotData = featureData.map(feature => ({
            time: toSeconds(feature.timestamp),
            label: feature.label
          }));
          const featureLayer = new wavesUI.helpers.TickLayer(plotData, {
            height: height,
            color: colour,
            labelPosition: 'bottom',
            shadeSegments: true
          });
          this.addLayer(
            featureLayer,
            waveTrack,
            this.timeline.timeContext
          );
        } else if (isRegion) {
          console.log('Output is of region type');
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
                    .map(val => Object.assign({}, staticProperties, {y: val})));
                }, []),
                {yDomain: [min, max + barHeight], height: height} as any
              ];
            } else {
              return [featureData.map(feature => ({
                x: toSeconds(feature.timestamp),
                width: toSeconds(feature.duration),
                color: colour,
                opacity: 0.8
              })), {height: height}];
            }
          };

          const segmentLayer = new wavesUI.helpers.SegmentLayer(
            ...getSegmentArgs()
          );
          this.addLayer(
            segmentLayer,
            waveTrack,
            this.timeline.timeContext
          );
        }
        break;
      }
      case 'matrix': {
        const stepDuration = (features as FixedSpacedFeatures).stepDuration;
        // !!! + start time
        const matrixData = (features.data as Float32Array[]);

        if (matrixData.length === 0) {
          return;
        }

        console.log('matrix data length = ' + matrixData.length);
        console.log('height of first column = ' + matrixData[0].length);
        const targetValue = this.estimatePercentile(matrixData, 95);
        const gain = (targetValue > 0.0 ? (1.0 / targetValue) : 1.0);
        console.log('setting gain to ' + gain);
        const matrixEntity =
          new wavesUI.utils.PrefilledMatrixEntity(matrixData,
                                                  0, // startTime
                                                  stepDuration);
        const matrixLayer = new wavesUI.helpers.MatrixLayer(matrixEntity, {
          gain,
          top: 0,
          height: height,
          normalise: 'none',
          mapper: this.iceMapper()
        });
        this.addLayer(
          matrixLayer,
          waveTrack,
          this.timeline.timeContext
        );
        break;
      }
      default:
        console.log(
          `Cannot render an appropriate layer for feature shape '${features.shape}'`
        );
    }

    this.isLoading = false;
    this.ref.markForCheck();
    this.timeline.tracks.update();
  }

  private animate(): void {
    if (!this.isSeeking) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      // listen for time passing...
      const updateSeekingCursor = () => {
        const currentTime = this.audioService.getCurrentTime();
        this.cursorLayer.currentPosition = currentTime;
        this.cursorLayer.update();

        if (typeof(this.highlightLayer) !== 'undefined') {
          this.highlightLayer.currentPosition = currentTime;
          this.highlightLayer.update();
        }

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

            this.timeline.timeContext.offset = hasSkippedMultiplePages ?
                -currentTime +  0.5 * visibleDuration :
                currentOffset - visibleDuration;
          this.timeline.tracks.update();
        }

        if (mustPageBackward) {
          const hasSkippedMultiplePages = currentTime + visibleDuration < -currentOffset;
            this.timeline.timeContext.offset = hasSkippedMultiplePages ?
                -currentTime + 0.5 * visibleDuration :
                currentOffset + visibleDuration;
          this.timeline.tracks.update();
        }

        if (this.isPlaying) {
          requestAnimationFrame(updateSeekingCursor);
        }
      };
      updateSeekingCursor();
    });
  }

  private addLayer(layer: Layer, track: Track, timeContext: any, isAxis: boolean = false): void {
    timeContext.zoom = 1.0;
    if (!layer.timeContext) {
      layer.setTimeContext(isAxis ?
        timeContext : new wavesUI.core.LayerTimeContext(timeContext));
    }
    track.add(layer);
    this.layers.push(layer);
    layer.render();
    layer.update();
    if (this.cursorLayer && track.$layout.contains(this.cursorLayer.$el)) {
      track.$layout.appendChild(this.cursorLayer.$el);
    }
  }

  ngOnDestroy(): void {
    if (this.featureExtractionSubscription) {
      this.featureExtractionSubscription.unsubscribe();
    }
    if (this.playingStateSubscription) {
      this.playingStateSubscription.unsubscribe();
    }
    if (this.seekedSubscription) {
      this.seekedSubscription.unsubscribe();
    }
    if (this.onAudioDataSubscription) {
      this.onAudioDataSubscription.unsubscribe();
    }
  }

  seekStart(): void {
    this.zoomOnMouseDown = this.timeline.timeContext.zoom;
    this.offsetOnMouseDown = this.timeline.timeContext.offset;
  }

  seekEnd(x: number): void {
    const hasSameZoom: boolean = this.zoomOnMouseDown ===
      this.timeline.timeContext.zoom;
    const hasSameOffset: boolean = this.offsetOnMouseDown ===
      this.timeline.timeContext.offset;
    if (hasSameZoom && hasSameOffset) {
      this.seek(x);
    }
  }

  seek(x: number): void {
    if (this.timeline) {
      const timeContext: any = this.timeline.timeContext;
      if (this.isSeeking) {
        this.audioService.seekTo(
          timeContext.timeToPixel.invert(x) - timeContext.offset
        );
      }
    }
  }
}
