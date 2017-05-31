import {
  Component,
  Input,
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
export class WaveformComponent extends WavesComponent<AudioBuffer> {

  @ViewChild('track') trackDiv: ElementRef;
  @Input() set audioBuffer(buffer: AudioBuffer) {
    this.duration = buffer.duration;
    this.timeline.pixelsPerSecond = this.timeline.visibleWidth / buffer.duration;
    this.feature = buffer;
  }

  protected get containerHeight(): number {
    return this.trackDiv.nativeElement.getBoundingClientRect().height;
  }

  protected get trackContainer(): ElementRef {
    return this.trackDiv;
  }

  protected get featureLayers(): Layer[] {
    const nChannels = this.feature.numberOfChannels;
    const totalWaveHeight = this.height * 0.9;
    const waveHeight = totalWaveHeight / nChannels;

    const channelLayers: Layer[] = [];
    for (let ch = 0; ch < nChannels; ++ch) {
      channelLayers.push(new wavesUI.helpers.WaveformLayer(this.feature, {
          top: (this.height - totalWaveHeight) / 2 + waveHeight * ch,
          height: waveHeight,
          color: this.colour,
          channel: ch
        })
      );
    }
    return channelLayers;
  }
}
