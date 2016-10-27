import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-audio-file-open',
  templateUrl: './audio-file-open.component.html',
  styleUrls: ['./audio-file-open.component.css']
})
export class AudioFileOpenComponent implements OnInit {

  @ViewChild('open') open: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  openAudio(files: FileList) {
    console.log(files);
    console.log("open");
  }

  openAudioDialog() {
    this.open.nativeElement.click();
  }
}
