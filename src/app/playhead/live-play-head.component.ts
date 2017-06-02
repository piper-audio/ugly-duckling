/**
 * Created by lucast on 23/05/2017.
 */
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import {TimePixelMapper} from './PlayHeadHelpers';
import {RenderLoopService} from '../services/render-loop/render-loop.service';

@Component({
  selector: 'ugly-live-play-head',
  template: `<ugly-play-head
    [currentTime]="currentTime"
    [timeToPixel]="timeToPixel"
    [colour]="colour"></ugly-play-head>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LivePlayHeadComponent implements AfterViewInit {
  @Input() timeToPixel: TimePixelMapper;
  @Input() colour: string;
  private currentTime = 0;

  constructor(private renderLoop: RenderLoopService,
              private ref: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.renderLoop.addPlayingTask((currentTime) => {
      this.currentTime = currentTime;
      this.ref.markForCheck();
    });
  }
}
