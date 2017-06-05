import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import wavesUI from 'waves-ui-piper';
import {WavesComponent} from '../waves-base.component';


@Component({
  selector: 'ugly-waveform',
  templateUrl: '../waves-template.html',
  styleUrls: ['../waves-template.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: WavesComponent, useExisting: WaveformComponent}
  ]
})
export class WaveformComponent extends WavesComponent<AudioBuffer> {
  @Input() set audioBuffer(buffer: AudioBuffer) {
    this.duration = buffer.duration;
    this.timeline.pixelsPerSecond = this.timeline.visibleWidth / buffer.duration;
    this.feature = buffer;
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
