import {
  Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit
} from '@angular/core';

declare var wavesUI: any; // TODO non-global app scope import
type Timeline = any; // TODO what type actually is it.. start a .d.ts for waves-ui?

@Component({
  selector: 'app-waveform',
  templateUrl: './waveform.component.html',
  styleUrls: ['./waveform.component.css']
})
export class WaveformComponent implements OnInit, AfterViewInit {

  @ViewChild('track') trackDiv: ElementRef;

  private _audioBuffer: AudioBuffer = undefined;

  @Input()
  set audioBuffer(buffer: AudioBuffer) {
    this._audioBuffer = buffer || undefined;
    if (this.audioBuffer)
      this.renderWaveform(this.audioBuffer);
  }

  get audioBuffer(): AudioBuffer {
    return this._audioBuffer;
  }

  constructor() {}
  ngOnInit() {}

  ngAfterViewInit(): void {
    this.renderTimeline();
  }

  renderTimeline(duration: number = 1.0): Timeline {
    const track: HTMLElement = this.trackDiv.nativeElement;
    track.innerHTML = "";
    const height: number = track.getBoundingClientRect().height;
    const width: number = track.getBoundingClientRect().width;
    const pixelsPerSecond = width / duration;
    const timeline = new wavesUI.core.Timeline(pixelsPerSecond, width);
    timeline.createTrack(track, height, 'main');

    // time axis
    const timeAxis = new wavesUI.helpers.TimeAxisLayer({
      height: height,
      color: 'gray'
    });

    timeline.addLayer(timeAxis, 'main', 'default', true);
    timeline.state = new wavesUI.states.CenteredZoomState(timeline);
    return timeline;
  }

  renderWaveform(buffer: AudioBuffer): void {
    const height: number = this.trackDiv.nativeElement.getBoundingClientRect().height;
    const timeline: Timeline = this.renderTimeline(buffer.duration);
    const waveformLayer = new wavesUI.helpers.WaveformLayer(buffer, {
      top: 10,
      height: height * 0.9,
      color: 'darkblue'
    });
    (timeline as any).addLayer(waveformLayer, 'main');
  }

}
