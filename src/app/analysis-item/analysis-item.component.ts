/**
 * Created by lucast on 21/03/2017.
 */
import {Component, Input} from "@angular/core";
import Waves from 'waves-ui';

export interface AnalysisItem {
  rootAudioUri: string;
  hasSharedTimeline: boolean;
  isRoot: boolean;
  extractorKey: string;
  title?: string;
  description?: string;
}

@Component({
  selector: 'ugly-analysis-item',
  templateUrl: './analysis-item.component.html',
  styleUrls: ['./analysis-item.component.css']
})
export class AnalysisItemComponent {
  @Input() timeline: Timeline;
  @Input() title: string;
  @Input() description: string;
  @Input() isActive: boolean;
  @Input() isRoot: boolean;
}
