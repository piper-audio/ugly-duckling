import {
  Component, OnInit, ViewChild, ElementRef,
  AfterViewInit
} from '@angular/core';

declare var wavesUI: any;

@Component({
  selector: 'app-waveform',
  templateUrl: './waveform.component.html',
  styleUrls: ['./waveform.component.css']
})
export class WaveformComponent implements OnInit, AfterViewInit {
  @ViewChild('track') trackDiv: ElementRef;

  constructor() {
    console.log(wavesUI.core);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    const track: HTMLElement = this.trackDiv.nativeElement;
    const duration: number = 1.0;
    const height: number = track.getBoundingClientRect().height;
    const width: number = track.getBoundingClientRect().width;
    const pixelsPerSecond = width / duration;
    const timeline: any = new wavesUI.core.Timeline(pixelsPerSecond, width);
    timeline.createTrack(track, height, 'main');
    // time axis
    const timeAxis = new wavesUI.helpers.TimeAxisLayer({
      height: height,
      top: 10,
      color: 'gray'
    });
    timeline.addLayer(timeAxis, 'main', 'default', true);
    timeline.state = new wavesUI.states.CenteredZoomState(timeline);
  }
}
