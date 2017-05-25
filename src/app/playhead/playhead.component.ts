/**
 * Created by lucast on 23/05/2017.
 */
import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import {TimePixelMapper} from './PlayHeadHelpers';

const defaultColour = '#000';

@Component({
  selector: 'ugly-play-head',
  template: `<div [ngStyle]="currentStyle"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayHeadComponent {
  @Input() timeToPixel: TimePixelMapper;
  @Input() set currentTime(x: number) {
    const position = this.timeToPixel(x);
    this.currentStyle.transform = `translateX(${position}px)`;
  }
  @Input() set colour(hex: string) {
    this.currentStyle.background = hex || defaultColour;
  }

  private currentStyle = {
    background: defaultColour,
    height: '100%',
    width: '2px',
    transform: null
  };
}
