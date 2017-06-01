/**
 * Created by lucas on 30/05/2017.
 */
import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import {OnSeekHandler} from '../../playhead/PlayHeadHelpers';
import {VectorFeature} from 'piper/HigherLevelUtilities';

@Component({
  selector: 'ugly-curve',
  template: `<ugly-vertical-scale>
    <ugly-tracks
      [timeline]="timeline"
      [width]="width"
      [onSeek]="onSeek"
      [colour]="colour"
      [tracks]="[curve]"
    ></ugly-tracks>
  </ugly-vertical-scale>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurveComponent {
  @Input() timeline: Timeline; // TODO refactor WaveComponents to have own Timeline, sharing a TimeContext
  @Input() onSeek: OnSeekHandler;
  @Input() width: number;
  @Input() curve: VectorFeature;
  @Input() colour: string;
}
