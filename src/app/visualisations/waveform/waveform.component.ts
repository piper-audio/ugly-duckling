import {
  Component,
  Input,
  ChangeDetectorRef,
  ElementRef,
  ViewChild
} from '@angular/core';
import wavesUI from 'waves-ui-piper';
import {WavesComponent} from '../waves-base.component';


@Component({
  selector: 'ugly-waveform',
  templateUrl: './waveform.component.html',
  styleUrls: ['./waveform.component.css']
})
export class WaveformComponent extends WavesComponent {
  @ViewChild('track') trackDiv: ElementRef;
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

  constructor(private ref: ChangeDetectorRef) {
    super();
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
      this.renderTimeline(this.trackDiv, buffer.duration);
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
}
