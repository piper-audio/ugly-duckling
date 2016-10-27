import {
  Component, OnInit, ViewChild, ElementRef,
  AfterViewInit, OnChanges, SimpleChanges, Input
} from '@angular/core';

declare var wavesUI: any; // TODO non-global app scope import

@Component({
  selector: 'app-waveform',
  templateUrl: './waveform.component.html',
  styleUrls: ['./waveform.component.css']
})
export class WaveformComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('track') trackDiv: ElementRef;

  private _audioBuffer: AudioBuffer = undefined;

  @Input()
  set audioBuffer(buffer: AudioBuffer) {
    console.log("setter");
    this._audioBuffer = buffer || undefined;
  }

  get audioBuffer(): AudioBuffer {
    return this._audioBuffer;
  }



  private timeline: any; // TODO what type is it?

  constructor() {
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    // const track: HTMLElement = this.trackDiv.nativeElement;
    // const duration: number = 1.0;
    // const height: number = track.getBoundingClientRect().height;
    // const width: number = track.getBoundingClientRect().width;
    // const pixelsPerSecond = width / duration;
    // const timeline = new wavesUI.core.Timeline(pixelsPerSecond, width);
    // timeline.createTrack(track, height, 'main');
    //
    // // time axis
    // const timeAxis = new wavesUI.helpers.TimeAxisLayer({
    //   height: height,
    //   top: 10,
    //   color: 'gray'
    // });
    //
    // timeline.addLayer(timeAxis, 'main', 'default', true);
    // timeline.state = new wavesUI.states.CenteredZoomState(timeline);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ng changes");
    if (changes.hasOwnProperty("audioBuffer")) { // why wouldn't it?
      if (changes["audioBuffer"].currentValue)
        this.renderWaveform(changes["audioBuffer"].currentValue);
    }
  }

  renderWaveform(buffer: AudioBuffer) {
    // TODO reduce dupe from original timeline state, anyway to actually not instantiate new timeline?
    console.log("render wave");
    const track: HTMLElement = this.trackDiv.nativeElement;
    const duration: number = buffer.duration;
    const height: number = track.getBoundingClientRect().height;
    const width: number = track.getBoundingClientRect().width;
    const pixelsPerSecond = width / duration;
    const timeline = new wavesUI.core.Timeline(pixelsPerSecond, width);
    timeline.createTrack(track, height, 'main');

    // time axis
    const timeAxis = new wavesUI.helpers.TimeAxisLayer({
      height: height,
      top: 10,
      color: 'gray'
    });

    timeline.addLayer(timeAxis, 'main', 'default', true);
    timeline.state = new wavesUI.states.CenteredZoomState(timeline);
    // TODO dispose of the existing layer?
    const waveformLayer = new wavesUI.helpers.WaveformLayer(buffer, {
      height: 600,
      color: 'darkblue'
    });
    timeline.addLayer(waveformLayer, 'main');
  }

}
