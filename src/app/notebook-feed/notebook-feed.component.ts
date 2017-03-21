/**
 * Created by lucast on 21/03/2017.
 */
import {Component, Input} from "@angular/core";

@Component({
  selector: 'ugly-notebook-feed',
  templateUrl: './notebook-feed.component.html',
  styleUrls: ['./notebook-feed.component.css']
})
export class NotebookFeedComponent {
  private _audioBuffer: AudioBuffer;


  @Input()
  set audioBuffer(buffer: AudioBuffer) {
    this._audioBuffer = buffer || undefined;
    if (this.audioBuffer) {

    }
  }

  get audioBuffer(): AudioBuffer {
    return this._audioBuffer;
  }
}
