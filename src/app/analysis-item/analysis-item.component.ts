/**
 * Created by lucast on 21/03/2017.
 */
import {Component, Input} from "@angular/core";

export interface Analysis {
  audioUri: string;
  combinedKey: string;
}

@Component({
  selector: 'ugly-analysis-item',
  templateUrl: './analysis-item.component.html',
  styleUrls: ['./analysis-item.component.css']
})
export class AnalysisItemComponent {
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
