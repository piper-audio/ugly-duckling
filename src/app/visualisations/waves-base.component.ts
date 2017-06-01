/**
 * Created by lucast on 26/05/2017.
 */
import {AfterViewInit, ElementRef, Input, ViewChild} from '@angular/core';
import {OnSeekHandler} from '../playhead/PlayHeadHelpers';
import {attachTouchHandlerBodges} from './WavesJunk';
import Waves from 'waves-ui-piper';
import {countingIdProvider} from 'piper/client-stubs/WebWorkerStreamingClient';
import {ShapedFeatureData} from './FeatureUtilities';

const trackIdGenerator = countingIdProvider(0);

// has to be an abstract class vs as interface for Angular's DI
export abstract class VerticallyBounded {
  abstract get range(): [number, number];
  abstract renderScale(range: [number, number]): void;
}

export abstract class WavesComponent<T extends ShapedFeatureData | AudioBuffer>
  implements AfterViewInit {
  @ViewChild('track') trackContainer: ElementRef;
  @Input() set width(width: number) {
    if (this.timeline) {
      requestAnimationFrame(() => {
        this.timeline.timeContext.visibleWidth = width;
        this.timeline.tracks.update();
      });
    }
  }
  @Input() timeline: Timeline;
  @Input() onSeek: OnSeekHandler;
  @Input() colour: string;
  @Input() set feature(feature: T) {
    this.mFeature = feature;
    this.update();
  }

  get feature(): T {
    return this.mFeature;
  }

  private layers: Layer[];
  private zoomOnMouseDown: number;
  private offsetOnMouseDown: number;
  private waveTrack: Track;
  private mFeature: T;
  private id: string;
  protected abstract get featureLayers(): Layer[];
  protected postAddMap: (value: Layer, index: number, array: Layer[]) => void;
  protected height: number;
  protected duration: number;

  constructor() {
    this.layers = [];
    this.id = trackIdGenerator.next().value;
  }

  ngAfterViewInit(): void {
    this.height =
      this.trackContainer.nativeElement.getBoundingClientRect().height;
    this.renderTimeline();
    this.update();
  }

  private update(): void {
    if (!this.waveTrack || !this.mFeature) {
      return;
    }
    this.clearTimeline();
    const layers = this.featureLayers;
    for (const layer of layers) {
      this.addLayer(layer);
    }
    if (this.postAddMap) {
      layers.forEach(this.postAddMap);
    }
  }


  private renderTimeline(): Timeline {
    const track: HTMLElement = this.trackContainer.nativeElement;
    track.innerHTML = '';
    if (this.duration >= 0) {
      const width: number = track.getBoundingClientRect().width;
      this.timeline.pixelsPerSecond = width / this.duration;
      this.timeline.visibleWidth = width;
    }
    this.waveTrack = this.timeline.createTrack(
      track,
      this.height,
      this.id
    );

    if ('ontouchstart' in window) {
      attachTouchHandlerBodges(
        track,
        this.timeline
      );
    }
    this.resetTimelineState();
  }

  // TODO can likely be removed, or use waves-ui methods
  private clearTimeline(): void {
    // loop through layers and remove them, waves-ui provides methods for this but it seems to not work properly
    const timeContextChildren = this.timeline.timeContext._children;
    for (const track of this.timeline.tracks) {
      if (track.layers.length === 0) { continue; }
      const trackLayers: Layer[] = Array.from(track.layers as Layer[]);
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
    this.resetTimelineState();
  }

  private resetTimelineState(): void {
    // time axis
    const timeAxis = new Waves.helpers.TimeAxisLayer({
      height: this.height,
      color: '#b0b0b0'
    });
    this.addLayer(timeAxis, true);
    this.timeline.state = new Waves.states.CenteredZoomState(this.timeline);
    this.timeline.tracks.update(); // TODO this is problematic, shared state across components
  }


  // TODO can likely use methods in waves-ui directly
  protected addLayer(layer: Layer,
                     isAxis: boolean = false): void {
    const timeContext = this.timeline.timeContext;
    if (!layer.timeContext) {
      layer.setTimeContext(isAxis ?
        timeContext : new Waves.core.LayerTimeContext(timeContext));
    }
    this.waveTrack.add(layer);
    this.layers.push(layer);
    layer.render();
    layer.update();
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
      if (this.onSeek) {
        this.onSeek(timeContext.timeToPixel.invert(x) - timeContext.offset);
      }
    }
  }
}

export abstract class VerticallyBoundedWavesComponent
<T extends ShapedFeatureData> extends WavesComponent<T>
  implements VerticallyBounded {
  abstract range: [number, number];

  renderScale(range: [number, number]): void {
    this.addLayer(new Waves.helpers.ScaleLayer({
      tickColor: this.colour,
      textColor: this.colour,
      height: this.height,
      yDomain: range
    }));
  }
}
