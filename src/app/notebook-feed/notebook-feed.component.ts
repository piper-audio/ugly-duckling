/**
 * Created by lucast on 21/03/2017.
 */
import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import Waves from 'waves-ui';
import {AnalysisItem} from '../analysis-item/analysis-item.component';

@Component({
  selector: 'ugly-notebook-feed',
  templateUrl: './notebook-feed.component.html',
  styleUrls: ['./notebook-feed.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotebookFeedComponent {
  @Input() analyses: AnalysisItem[];
  @Input() set rootAudioUri(uri: string) {
    this._rootAudioUri = uri;
  }

  get rootAudioUri(): string {
    return this._rootAudioUri;
  }
  private _rootAudioUri: string;
  private timelines: Map<string, Timeline>;

  constructor() {
    this.timelines = new Map();
  }

  getOrCreateTimeline(item: AnalysisItem): Timeline | void {
    if (!item.hasSharedTimeline) {
      return;
    }

    if (this.timelines.has(item.rootAudioUri)) {
      return this.timelines.get(item.rootAudioUri);
    } else {
      const timeline = new Waves.core.Timeline();
      this.timelines.set(item.rootAudioUri, timeline);
      return timeline;
    }
  }
}
