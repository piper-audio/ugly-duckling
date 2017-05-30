/**
 * Created by lucast on 26/05/2017.
 */
import {ElementRef, Input} from '@angular/core';
import {OnSeekHandler} from '../playhead/PlayHeadHelpers';
import {attachTouchHandlerBodges} from './WavesJunk';
import Waves from 'waves-ui-piper';

export abstract class WavesComponent {
  @Input() set width(width: number) {
    if (this.timeline) {
      requestAnimationFrame(() => {
        this.timeline.timeContext.visibleWidth = width;
        this.timeline.tracks.update();
      });
    }
  }
  @Input() timeline: Timeline;
  @Input() trackIdPrefix: string;
  @Input() onSeek: OnSeekHandler;

  protected layers: Layer[];
  protected zoomOnMouseDown: number;
  protected offsetOnMouseDown: number;
  protected waveTrack: Track;

  constructor() {
    this.layers = [];
  }

  protected renderTimeline($el: ElementRef, duration?: number): Timeline {
    const track: HTMLElement = $el.nativeElement;
    track.innerHTML = '';
    const height: number = track.getBoundingClientRect().height;
    if (duration >= 0) {
      const width: number = track.getBoundingClientRect().width;
      this.timeline.pixelsPerSecond = width / duration;
      this.timeline.visibleWidth = width;
    }
    this.waveTrack = this.timeline.createTrack(
      track,
      height,
      `wave-${this.trackIdPrefix || 'default'}`
    );

    if ('ontouchstart' in window) {
      attachTouchHandlerBodges(
        $el.nativeElement,
        this.timeline
      );
    }
    this.resetTimelineState($el);
  }

  // TODO can likely be removed, or use waves-ui methods
  protected clearTimeline($el: ElementRef): void {
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
    this.resetTimelineState($el);
  }

  private resetTimelineState($el: ElementRef): void {
    const height = $el.nativeElement.getBoundingClientRect().height;
    this.timeline.timeContext.offset =
      0.5 * this.timeline.timeContext.visibleDuration;

    // time axis
    const timeAxis = new Waves.helpers.TimeAxisLayer({
      height: height,
      color: '#b0b0b0'
    });
    this.addLayer(timeAxis, this.waveTrack, this.timeline.timeContext, true);
    this.timeline.state = new Waves.states.CenteredZoomState(this.timeline);
    this.timeline.tracks.update(); // TODO this is problematic, shared state across components
  }


  // TODO can likely use methods in waves-ui directly
  protected addLayer(layer: Layer,
                     track: Track,
                     timeContext: any,
                     isAxis: boolean = false): void {
    timeContext.zoom = 1.0;
    if (!layer.timeContext) {
      layer.setTimeContext(isAxis ?
        timeContext : new Waves.core.LayerTimeContext(timeContext));
    }
    track.add(layer);
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
