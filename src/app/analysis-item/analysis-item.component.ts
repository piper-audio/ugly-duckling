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

export interface AnalysisItem {
  rootAudioUri: string;
  hasSharedTimeline: boolean;
  isRoot: boolean;
  extractorKey: string;
  title?: string;
  description?: string;
  id?: string;
  progress?: number;
  audioData?: AudioBuffer;
}

@Component({
  selector: 'ugly-analysis-item',
  templateUrl: './analysis-item.component.html',
  styleUrls: ['./analysis-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalysisItemComponent implements OnInit {

  @Input() timeline: Timeline;
  @Input() isActive: boolean;
  @Input() item: AnalysisItem;
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
    return this.item &&
      this.item.isRoot &&
      this.item.audioData instanceof AudioBuffer;
  }
}
