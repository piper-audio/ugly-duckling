import {
  Component,
  Input,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import wavesUI from 'waves-ui-piper';
import {WavesComponent} from '../waves-base.component';


@Component({
  selector: 'ugly-waveform',
  templateUrl: '../waves-template.html',
  styleUrls: ['../waves-template.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
      this.clearTimeline(this.trackDiv);
      this.timeline.visibleWidth = width;
      this.timeline.pixelsPerSecond = width / buffer.duration;
      this.waveTrack.height = height;
    } else {
      this.renderTimeline(this.trackDiv, buffer.duration);
    }

    const nchannels = buffer.numberOfChannels;
    const totalWaveHeight = height * 0.9;
    const waveHeight = totalWaveHeight / nchannels;

    for (let ch = 0; ch < nchannels; ++ch) {
      const waveformLayer = new wavesUI.helpers.WaveformLayer(buffer, {
        top: (height - totalWaveHeight) / 2 + waveHeight * ch,
        height: waveHeight,
        color: this.colour,
        channel: ch
      });
      this.addLayer(waveformLayer, this.waveTrack, this.timeline.timeContext);
    }

    this.waveTrack.render();
    this.waveTrack.update();
    this.ref.markForCheck();
  }
}
