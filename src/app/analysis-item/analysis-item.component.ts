/**
 * Created by lucast on 21/03/2017.
 */
import {Component, Input, OnInit} from "@angular/core";
import Waves from 'waves-ui';

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
  styleUrls: ['./analysis-item.component.css']
})
export class AnalysisItemComponent implements OnInit {

  @Input() timeline: Timeline;
  @Input() title: string;
  @Input() description: string;
  @Input() isActive: boolean;
  @Input() isRoot: boolean;
  @Input() id: string;
  @Input() progress: number;
  private hasProgressOnInit = false;

  ngOnInit(): void {
    this.hasProgressOnInit = this.progress != null;
  }

  isLoading(): boolean {
    return this.hasProgressOnInit && this.progress < 100;
  }
}
