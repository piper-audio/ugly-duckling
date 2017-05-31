/**
 * Created by lucas on 30/05/2017.
 */
import {
  ChangeDetectionStrategy,
  Component,
  Input
} from "@angular/core";
import {OnSeekHandler} from "../../playhead/PlayHeadHelpers";
import {VectorFeature} from "piper/HigherLevelUtilities";

@Component({
  selector: 'ugly-curve',
  template: `<ugly-tracks
    [timeline]="timeline"
    [trackIdPrefix]="id"
    [width]="width"
    [onSeek]="onSeek"
    [colour]="colour"
    [tracks]="[curve]"
  ></ugly-tracks>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurveComponent {
  @Input() id: string; // TODO refactor WaveComponents to have own Timeline, sharing a TimeContext
  @Input() timeline: Timeline; // TODO as above
  @Input() onSeek: OnSeekHandler;
  @Input() width: number;
  @Input() curve: VectorFeature;
  @Input() colour: string;
}
