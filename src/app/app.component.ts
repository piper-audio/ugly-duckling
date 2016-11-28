import {Component, Inject} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ugly';

  audioBuffer: AudioBuffer = undefined;

  constructor(
    @Inject('piper-server-uri') private serverUri
  ) {}

  onAudioLoaded(buffer: AudioBuffer) {
    this.audioBuffer = buffer;
  }
}
