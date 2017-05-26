/**
 * Created by lucast on 21/03/2017.
 */
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import {naivePagingMapper} from '../visualisations/WavesJunk';
import {OnSeekHandler, TimePixelMapper} from '../playhead/PlayHeadHelpers';
import {HigherLevelFeatureShape} from '../visualisations/FeatureUtilities';

export interface Item {
  id: string;
  hasSharedTimeline: boolean;
  title?: string;
  description?: string;
  progress?: number;
}

export interface PendingRootAudioItem extends Item {
  uri: string;
}
export interface RootAudioItem extends PendingRootAudioItem{
  audioData: AudioBuffer;
}

export interface PendingAnalysisItem extends Item {
  parent: RootAudioItem;
  extractorKey: string;
}

export interface AnalysisItem extends PendingAnalysisItem {
  kind: HigherLevelFeatureShape;
}

export function isPendingRootAudioItem(item: Item): item is PendingRootAudioItem {
  return typeof (item as RootAudioItem).uri === 'string';
}

export function isRootAudioItem(item: Item): item is RootAudioItem {
  return isPendingRootAudioItem(item) &&
    (item as RootAudioItem).audioData instanceof AudioBuffer;
}

export function isPendingAnalysisItem(item: Item): item is AnalysisItem {
  const downcast = (item as AnalysisItem);
  return isRootAudioItem(downcast.parent)
    && typeof downcast.extractorKey === 'string';
}

export function isAnalysisItem(item: Item): item is AnalysisItem {
  const downcast = (item as AnalysisItem);
  return isPendingAnalysisItem(item) && downcast.kind != null;
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
export class AnalysisItemComponent implements OnInit {

  @Input() timeline: Timeline; // TODO should be TimelineTimeContext?
  @Input() isActive: boolean;
  @Input() item: Item;
  @Input() contentWidth: number;
  @Input() onSeek: OnSeekHandler;
  private hasProgressOnInit = false;


  // TODO move
  private DOES_NOT_BELONG_HERE: TimePixelMapper;

  ngOnInit(): void {
    this.hasProgressOnInit = this.item.progress != null;
    this.DOES_NOT_BELONG_HERE = naivePagingMapper(this.timeline);
  }

  isLoading(): boolean {
    return this.hasProgressOnInit && this.item.progress < 100;
  }

  isAudioItem(): boolean {
    return isRootAudioItem(this.item);
  }
}
