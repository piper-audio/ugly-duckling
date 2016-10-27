import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';

interface AudioContextConstructor {
  new(): AudioContext
}

interface WindowAudioContext {
  AudioContext?: AudioContextConstructor;
  webkitAudioContext?: AudioContextConstructor
}

@Component({
  selector: 'app-audio-file-open',
  templateUrl: './audio-file-open.component.html',
  styleUrls: ['./audio-file-open.component.css']
})
export class AudioFileOpenComponent implements OnInit {

  @ViewChild('open') open: ElementRef;

  private audioContext: AudioContext;

  constructor() {
    // TODO make a service which provides the AudioContext?
    const factory: WindowAudioContext = (window as WindowAudioContext);
    this.audioContext = new (factory.AudioContext || factory.webkitAudioContext)();
  }

  ngOnInit() {
  }

  decodeAudio(files: FileList) {
    if (files.length > 0) {
      const reader: FileReader = new FileReader();
      reader.onload = (event: any) => {
        this.audioContext.decodeAudioData(event.target.result, buffer => {
          console.log(buffer);
        });
      };
      reader.readAsArrayBuffer(files[0]);
    }
  }

  openAudioDialog() {
    this.open.nativeElement.click();
  }
}
