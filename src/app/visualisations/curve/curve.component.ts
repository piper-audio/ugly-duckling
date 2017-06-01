/**
 * Created by lucas on 30/05/2017.
 */
import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import {OnSeekHandler} from '../../playhead/PlayHeadHelpers';
import {TracksFeature, VectorFeature} from 'piper/HigherLevelUtilities';

@Component({
  selector: 'ugly-curve',
  template: `<ugly-cross-hair-inspector>
    <ugly-tracks
      [timeline]="timeline"
      [width]="width"
      [onSeek]="onSeek"
      [colour]="colour"
      [tracks]="tracks"
    ></ugly-tracks>
  </ugly-cross-hair-inspector>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurveComponent {
  @Input() timeline: Timeline; // TODO refactor WaveComponents to have own Timeline, sharing a TimeContext
  @Input() onSeek: OnSeekHandler;
  @Input() width: number;
  @Input() set curve(curve: VectorFeature & {unit?: string}) {
    const tempTracks: TracksFeature & {unit?: string} = [curve];
    tempTracks.unit = curve.unit;
    this.tracks = tempTracks;
  }

  private tracks: TracksFeature & {unit?: string};

  @Input() colour: string;
}
