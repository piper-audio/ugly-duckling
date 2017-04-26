/**
 * Created by lucast on 21/03/2017.
 */
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

export interface AnalysisItem {
  rootAudioUri: string;
  hasSharedTimeline: boolean;
  isRoot: boolean;
  extractorKey: string;
  title?: string;
  description?: string;
  id?: string;
  progress?: number;
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
  private hasProgressOnInit = false;

  ngOnInit(): void {
    this.hasProgressOnInit = this.item.progress != null;
  }

  isLoading(): boolean {
    return this.hasProgressOnInit && this.item.progress < 100;
  }
}
