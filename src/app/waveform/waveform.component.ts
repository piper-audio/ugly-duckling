import { Component, OnInit } from '@angular/core';
declare var wavesUI: any;

@Component({
  selector: 'app-waveform',
  templateUrl: './waveform.component.html',
  styleUrls: ['./waveform.component.css']
})
export class WaveformComponent implements OnInit {

  constructor() {
    console.log(wavesUI.core);
  }

  ngOnInit() {
  }
}
