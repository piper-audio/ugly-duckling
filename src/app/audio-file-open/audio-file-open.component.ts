import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'ugly-audio-file-open',
  templateUrl: './audio-file-open.component.html',
  styleUrls: ['./audio-file-open.component.css']
})
export class AudioFileOpenComponent implements OnInit {

  @ViewChild('open') open: ElementRef;
  @Output() fileOpened: EventEmitter<File>;

  constructor() {
    this.fileOpened = new EventEmitter<File>();
  }

  ngOnInit() {
  }

  decodeAudio(files: FileList) {
    if (files.length > 0) {
      this.fileOpened.emit(files[0]);
    }
  }

  openAudioDialog() {
    this.open.nativeElement.click();
  }
}
