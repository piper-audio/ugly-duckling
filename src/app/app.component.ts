import {Component} from '@angular/core';
import {AudioPlayerService} from "./services/audio-player/audio-player.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  audioBuffer: AudioBuffer; // TODO consider revising

  constructor(private audioService: AudioPlayerService) {}

  onFileOpened(file: File) {
    const reader: FileReader = new FileReader();
    const mimeType = file.type;
    reader.onload = (event: any) => {
      this.audioService.loadAudioFromUrl(
        URL.createObjectURL(new Blob([event.target.result], {type: mimeType}))
      );
      // TODO use a rxjs/Subject instead?
      this.audioService.decodeAudioData(event.target.result).then(audioBuffer => {
        this.audioBuffer = audioBuffer;
      });
    };
    reader.readAsArrayBuffer(file);
  }
}
