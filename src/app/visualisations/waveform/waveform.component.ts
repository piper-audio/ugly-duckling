import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  ChangeDetectorRef
} from '@angular/core';
import wavesUI from 'waves-ui-piper';
import {attachTouchHandlerBodges} from '../WavesJunk';
import {OnSeekHandler} from '../../playhead/PlayHeadHelpers';

type Layer = any;
type Track = any;

@Component({
  selector: 'ugly-waveform',
  templateUrl: './waveform.component.html',
  styleUrls: ['./waveform.component.css']
})
export class WaveformComponent {

  @ViewChild('track') trackDiv: ElementRef;
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

  @Input() set audioBuffer(buffer: AudioBuffer) {
    this._audioBuffer = buffer || undefined;
    if (this.audioBuffer) {
      this.renderWaveform(this.audioBuffer);
    }
  }

  get audioBuffer(): AudioBuffer {
    return this._audioBuffer;
  }

  private _audioBuffer: AudioBuffer;
  private layers: Layer[];
  private zoomOnMouseDown: number;
  private offsetOnMouseDown: number;
  private waveTrack: Track;

  constructor(private ref: ChangeDetectorRef) {
    this.layers = [];
  }

  renderTimeline(duration: number = 1.0): Timeline {
    const track: HTMLElement = this.trackDiv.nativeElement;
    track.innerHTML = '';
    const height: number = track.getBoundingClientRect().height;
    const width: number = track.getBoundingClientRect().width;
    this.timeline.pixelsPerSecond = width / duration;
    this.timeline.visibleWidth = width;
    this.waveTrack = this.timeline.createTrack(
      track,
      height,
      `wave-${this.trackIdPrefix || 'default'}`
    );

    if ('ontouchstart' in window) {
      attachTouchHandlerBodges(this.trackDiv.nativeElement, this.timeline);
    }
  }

  // TODO can likely be removed, or use waves-ui methods
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
    const height = this.trackDiv.nativeElement.getBoundingClientRect().height;
    if (this.timeline && this.waveTrack) {
      // resize
      const width = this.trackDiv.nativeElement.getBoundingClientRect().width;

      this.clearTimeline();
      this.timeline.visibleWidth = width;
      this.timeline.pixelsPerSecond = width / buffer.duration;
      this.waveTrack.height = height;
    } else {
      this.renderTimeline(buffer.duration);
    }
    this.timeline.timeContext.offset = 0.5 * this.timeline.timeContext.visibleDuration;

    // time axis
    const timeAxis = new wavesUI.helpers.TimeAxisLayer({
      height: height,
      color: '#b0b0b0'
    });
    this.addLayer(timeAxis, this.waveTrack, this.timeline.timeContext, true);

    const nchannels = buffer.numberOfChannels;
    const totalWaveHeight = height * 0.9;
    const waveHeight = totalWaveHeight / nchannels;

    for (let ch = 0; ch < nchannels; ++ch) {
      const waveformLayer = new wavesUI.helpers.WaveformLayer(buffer, {
        top: (height - totalWaveHeight) / 2 + waveHeight * ch,
        height: waveHeight,
        color: '#0868ac',
        channel: ch
      });
      this.addLayer(waveformLayer, this.waveTrack, this.timeline.timeContext);
    }

    this.timeline.state = new wavesUI.states.CenteredZoomState(this.timeline);
    this.waveTrack.render();
    this.waveTrack.update();
    this.ref.markForCheck();
  }

  // TODO can likely use methods in waves-ui directly
  private addLayer(layer: Layer,
                   track: Track,
                   timeContext: any,
                   isAxis: boolean = false): void {
    timeContext.zoom = 1.0;
    if (!layer.timeContext) {
      layer.setTimeContext(isAxis ?
        timeContext : new wavesUI.core.LayerTimeContext(timeContext));
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
