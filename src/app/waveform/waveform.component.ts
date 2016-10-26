import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';

declare var wavesUI: any;

@Component({
  selector: 'app-waveform',
  templateUrl: './waveform.component.html',
  styleUrls: ['./waveform.component.css']
})
export class WaveformComponent implements OnInit {
  @ViewChild('track') trackDiv: ElementRef;

  constructor() {
    console.log(wavesUI.core);
  }

  ngOnInit() {
    console.log(this.trackDiv.nativeElement.getBoundingClientRect().width);
  }
}
