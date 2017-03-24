/**
 * Created by lucast on 21/03/2017.
 */
import {Component, Input} from "@angular/core";
import Waves from 'waves-ui';
import {AnalysisItem} from "../analysis-item/analysis-item.component";

@Component({
  selector: 'ugly-notebook-feed',
  templateUrl: './notebook-feed.component.html',
  styleUrls: ['./notebook-feed.component.css']
})
export class NotebookFeedComponent {
  sharedTimeline: Timeline;
  @Input() analyses: AnalysisItem[];
  @Input() set rootAudioUri(uri: string) {
    this._rootAudioUri = uri;

    // TODO is this safe? will the fact references are held elsewhere
    // keep the previous instance alive? Or will it get garbage collected in
    // screw previous layers up?
    this.sharedTimeline = new Waves.core.Timeline();
  }

  get rootAudioUri(): string {
    return this._rootAudioUri;
  }
  private _rootAudioUri: string;

  constructor() {
    this.sharedTimeline = new Waves.core.Timeline();
    this.analyses = [];
  }
}
