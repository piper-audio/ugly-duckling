/**
 * Created by lucast on 21/03/2017.
 */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy
} from '@angular/core';
import Waves from 'waves-ui-piper';
import {AnalysisItem} from '../analysis-item/analysis-item.component';
import {Observable} from 'rxjs/Observable';
import {Dimension} from '../app.module';
import {Subscription} from 'rxjs/Subscription';
import {OnSeekHandler} from '../playhead/PlayHeadHelpers';

@Component({
  selector: 'ugly-notebook-feed',
  templateUrl: './notebook-feed.component.html',
  styleUrls: ['./notebook-feed.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotebookFeedComponent implements OnDestroy {
  @Input() analyses: AnalysisItem[];
  @Input() set rootAudioUri(uri: string) {
    this._rootAudioUri = uri;
  }
  @Input() onSeek: OnSeekHandler;

  get rootAudioUri(): string {
    return this._rootAudioUri;
  }
  private _rootAudioUri: string;
  private resizeSubscription: Subscription;
  private width: number;
  private lastWidth: number;
  private timelines: Map<string, Timeline>;

  constructor(
    private ref: ChangeDetectorRef,
    @Inject('DimensionObservable') private onResize: Observable<Dimension>
  ) {
    this.timelines = new Map();
    this.onResize.subscribe(dim => {
      this.lastWidth = this.width;
      this.width = dim.width;
    });

    // the use of requestAnimationFrame here is to leave the dom updates
    // to a time convenient for the browser, and avoid a cascade / waterfall
    // of DOM changes for rapid resize events in the event handler above.
    // ..I'm not convinced this is particularly beneficial here // TODO
    const triggerChangeDetectionOnResize = () => {
      requestAnimationFrame(triggerChangeDetectionOnResize);
      if (this.width !== this.lastWidth) {
        ref.markForCheck(); // only trigger change detection if width changed
      }
    };
    requestAnimationFrame(triggerChangeDetectionOnResize);
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

  isActiveItem(item: AnalysisItem): boolean {
    return this.rootAudioUri === item.rootAudioUri;
  }

  getOnSeekForItem(item: AnalysisItem): (timeSecounds: number) => any {
    return this.isActiveItem(item) ? this.onSeek : () => {};
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
}
