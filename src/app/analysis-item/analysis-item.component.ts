/**
 * Created by lucast on 21/03/2017.
 */
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import {naivePagingMapper} from '../visualisations/WavesJunk';
import {OnSeekHandler} from '../playhead/PlayHeadHelpers';
import {
  defaultColourGenerator,
  HigherLevelFeatureShape,
  KnownShapedFeature
} from '../visualisations/FeatureUtilities';
import {
  RenderLoopService,
  TaskRemover
} from '../services/render-loop/render-loop.service';
import {DomSanitizer} from '@angular/platform-browser';

export interface Item {
  id: string;
  hasSharedTimeline: boolean;
  title?: string;
  description?: string;
  progress?: number;
}

export interface PendingRootAudioItem extends Item {
  uri: string;
  mimeType?: string;
  isExportable?: boolean;
}
export interface RootAudioItem extends PendingRootAudioItem {
  audioData: AudioBuffer;
}

export interface PendingAnalysisItem extends Item {
  parent: RootAudioItem;
  extractorKey: string;
}

export type AnalysisItem = PendingAnalysisItem & KnownShapedFeature & {
  unit?: string
};

export function isItem(item: Item): item is Item {
  return item.id != null && item.hasSharedTimeline != null;
}

export function isPendingRootAudioItem(item: Item): item is PendingRootAudioItem {
  return isItem(item) && typeof (item as RootAudioItem).uri === 'string';
}

export function isRootAudioItem(item: Item): item is RootAudioItem {
  return item && isPendingRootAudioItem(item) &&
    (item as RootAudioItem).audioData instanceof AudioBuffer;
}

export function isPendingAnalysisItem(item: Item): item is AnalysisItem {
  const downcast = (item as AnalysisItem);
  return isRootAudioItem(downcast.parent)
    && typeof downcast.extractorKey === 'string';
}

export function isAnalysisItem(item: Item): item is AnalysisItem {
  const downcast = (item as AnalysisItem);
  return isPendingAnalysisItem(item) &&
    downcast.shape != null &&
    downcast.collected != null;
}

// these should probably be actual concrete types with their own getUri methods
export function getRootUri(item: Item): string {
  if (isPendingRootAudioItem(item)) {
    return item.uri;
  }
  if (isPendingAnalysisItem(item)) {
    return item.parent.uri;
  }
  throw new Error('Invalid item: No URI property set.');
}

@Component({
  selector: 'ugly-analysis-item',
  templateUrl: './analysis-item.component.html',
  styleUrls: ['./analysis-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalysisItemComponent implements OnInit, OnDestroy {

  // TODO should be TimelineTimeContext?
  @Input() set timeline(timeline: Timeline) {
    this.mTimeline = timeline;
    this.resetRemoveAnimation();
  }

  get timeline(): Timeline {
    return this.mTimeline;
  }

  @Input() set isActive(isActive: boolean) {
    this.removeAnimation();
    this.mIsActive = isActive;
    if (isActive) {
      this.resetRemoveAnimation();
    }
  }

  get isActive() {
    return this.mIsActive;
  }

  @Input() item: Item;
  @Input() contentWidth: number;
  @Input() onSeek: OnSeekHandler;
  @Output() remove: EventEmitter<Item>;
  // TODO move / re-think - naivePagingMapper feels like a big ol' bodge
  private removeAnimation: TaskRemover;
  private hasProgressOnInit = false;
  private mIsActive: boolean;
  private mTimeline: Timeline;

  constructor(private renderLoop: RenderLoopService,
              private sanitizer: DomSanitizer) {
    this.remove = new EventEmitter<Item>();
  }

  ngOnInit(): void {
    this.resetRemoveAnimation();
    this.hasProgressOnInit = this.item.progress != null;
  }

  isLoading(): boolean {
    return this.hasProgressOnInit && this.item.progress < 100;
  }

  isAudioItem(): boolean {
    return this.item && isRootAudioItem(this.item);
  }

  isPending(): boolean {
    return this.item &&
      !isRootAudioItem(this.item) && !isAnalysisItem(this.item) &&
      (isPendingAnalysisItem(this.item) || isPendingRootAudioItem(this.item));
  }

  getFeatureShape(): HigherLevelFeatureShape | null {
    return !isPendingRootAudioItem(this.item) &&
    isAnalysisItem(this.item) ? this.item.shape : null;
  }

  getDuration(): number | null {
    if (isRootAudioItem(this.item)) {
      return this.item.audioData.duration;
    }
    if (isAnalysisItem(this.item)) {
      return this.item.parent.audioData.duration;
    }
  }

  getNextColour(): string {
    return defaultColourGenerator.next().value;
  }

  ngOnDestroy(): void {
    this.removeAnimation();
  }

  private sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  private generateFilename(item: PendingRootAudioItem): string {
    // TODO this is too brittle, and will often produce the wrong result
    // i.e. audio/mpeg results in .mpeg, when .mp3 is likely desired
    const mimeParts = item.mimeType ? item.mimeType.split('/') : [];
    const extension = mimeParts.length === 2 ? mimeParts[1] : '';
    return `${item.title}.${extension}`;
  }

  private resetRemoveAnimation(): void {
    if (this.removeAnimation) {
      this.removeAnimation();
    }
    const createPagingTask = () => {
      const pagingMapper = naivePagingMapper(this.timeline);
      return this.renderLoop.addPlayingTask(currentTime => {
        pagingMapper(currentTime);
      });
    };
    // only add a pager to audio items, it can drive the feature items
    const remover = this.timeline && this.isAudioItem() ?
      createPagingTask() : () => {};
    this.removeAnimation = () => {
      remover();
      this.removeAnimation = () => {};
    };
  }
}
