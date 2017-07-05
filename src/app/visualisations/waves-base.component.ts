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
export abstract class VerticallyBounded<T> {
  abstract get range(): T;
}

export abstract class VerticalScaleRenderer<T> extends VerticallyBounded<T> {
  abstract renderScale(range: T): void;
}

export abstract class VerticalValueInspectorRenderer
  extends VerticalScaleRenderer<[number, number]> {
  // TODO how do I know these layers are actually 'describable'?
  abstract renderInspector(range: [number, number], unit?: string): void;
  abstract get updatePosition(): OnSeekHandler;
}

export abstract class PlayheadManager {
  abstract update(time: number): void;
  abstract remove(): void;
}

export abstract class PlayheadRenderer {
  abstract renderPlayhead(initialTime: number, colour: string): PlayheadManager;
}

export type LayerRemover = () => void;

export abstract class WavesComponent<T extends ShapedFeatureData | AudioBuffer>
  implements AfterViewInit, PlayheadRenderer {

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
  @Input() duration: number;
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
  protected cachedFeatureLayers: Layer[];
  protected postAddMap: (value: Layer, index: number, array: Layer[]) => void;
  height: number;

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

  renderPlayhead(initialTime: number, colour: string): PlayheadManager {
    console.warn('waves base render playhead');
    const cursor = new Waves.helpers.CursorLayer({
      height: this.height,
      color: colour,
    });
    cursor.currentPosition = initialTime;
    return {
      update: currentTime => {
        cursor.currentPosition = currentTime;
        cursor.update();
      },
      remove: this.addLayer(cursor)
    };
  }

  private update(): void {
    if (!this.waveTrack || !this.mFeature) {
      return;
    }
    this.clearTimeline();
    this.cachedFeatureLayers = this.featureLayers;
    for (const layer of this.cachedFeatureLayers) {
      this.addLayer(layer);
    }
    if (this.postAddMap) {
      this.cachedFeatureLayers.forEach(this.postAddMap);
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
    const track = this.waveTrack;
    if (track.layers.length === 0) { return; }
    const trackLayers: Layer[] = Array.from(track.layers as Layer[]);
    while (trackLayers.length) {
      this.removeLayer(trackLayers.pop());
    }
    this.resetTimelineState();
  }

  private removeLayer(layer: Layer) {
    if (this.layers.includes(layer) && this.waveTrack) {
      const timeContextChildren = this.timeline.timeContext._children;
      this.waveTrack.remove(layer);
      this.layers.splice(this.layers.indexOf(layer), 1);
      const index = timeContextChildren.indexOf(layer.timeContext);
      if (index >= 0) {
        timeContextChildren.splice(index, 1);
      }
      layer.destroy();
    }
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
  addLayer(layer: Layer,
           isAxis: boolean = false): LayerRemover {
    const timeContext = this.timeline.timeContext;
    if (!layer.timeContext) {
      if (isAxis) {
        layer.setTimeContext(timeContext);
      } else {
        const layerTimeContext = new Waves.core.LayerTimeContext(timeContext);
        if (this.duration) {
          layerTimeContext.duration = this.duration;
        }
        layer.setTimeContext(layerTimeContext);
      }
    }
    this.waveTrack.add(layer);
    this.layers.push(layer);
    layer.render();
    layer.update();
    return () => this.removeLayer(layer);
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
  implements VerticalScaleRenderer<[number, number]> {
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

export abstract class VerticallyBinnedWavesComponent
<T extends ShapedFeatureData> extends WavesComponent<T>
  implements VerticalScaleRenderer<string[]> {
  abstract range: string[];

  renderScale(binNames: string[]): void {
    this.addLayer(new Waves.helpers.DiscreteScaleLayer({
      tickColor: this.colour,
      textColor: this.colour,
      height: this.height,
      binNames
    }));
  }
}

export abstract class InspectableVerticallyBoundedComponent
<T extends ShapedFeatureData> extends VerticallyBoundedWavesComponent<T>
  implements VerticalValueInspectorRenderer {

  private wrappedSeekHandler: OnSeekHandler;
  private highlight: HighlightLayer;

  @Input() set onSeek(handler: OnSeekHandler) {
    this.wrappedSeekHandler = (x: number) => {
      handler(x);
      this.updatePosition(x);
    };
  }

  get updatePosition() {
    return (currentTime: number): void => {
      if (this.highlight) {
        this.highlight.currentPosition = currentTime;
        this.highlight.update();
      }
    };
  }

  get onSeek(): OnSeekHandler {
    return this.wrappedSeekHandler;
  }


  renderInspector(range: [number, number], unit?: string): void {
    if (range) {
      this.highlight = new Waves.helpers.HighlightLayer(
        this.cachedFeatureLayers,
        {
          opacity: 0.7,
          height: this.height,
          color: '#c33c54', // TODO pass in?
          labelOffset: 38,
          yDomain: range,
          unit: unit || ''
        }
      );
      this.addLayer(this.highlight);
    }
  }
}
