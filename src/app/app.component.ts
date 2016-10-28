import {Component, Inject} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ugly';

  count = 0;
  audioBuffer: AudioBuffer = undefined;

  constructor(
    @Inject('piper-server-uri') private serverUri
  ) {}

  onUpdate(id, text) {
  }

  onAudioLoaded(buffer: AudioBuffer) {
    this.audioBuffer = buffer;
    this.count++;
  }

  testRef() {
    this.count++;
  }
}
