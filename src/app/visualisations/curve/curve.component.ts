/**
 * Created by lucas on 30/05/2017.
 */
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild
} from '@angular/core';
import {OnSeekHandler} from '../../playhead/PlayHeadHelpers';
import {VectorFeature} from 'piper/HigherLevelUtilities';
import {
  VerticallyBounded,
  VerticalScaleRenderer,
  VerticalValueInspectorRenderer
} from '../waves-base.component';
import {TracksComponent} from '../tracks/tracks.components';

@Component({
  selector: 'ugly-curve',
  template: `
    <ugly-tracks
      [timeline]="timeline"
      [width]="width"
      [onSeek]="onSeek"
      [colour]="colour"
      [tracks]="[curve]"
    ></ugly-tracks>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: VerticallyBounded, useExisting: CurveComponent },
    {provide: VerticalScaleRenderer, useExisting: CurveComponent},
    {provide: VerticalValueInspectorRenderer, useExisting: CurveComponent}
  ]
})
export class CurveComponent implements VerticalValueInspectorRenderer {
  @Input() timeline: Timeline; // TODO refactor WaveComponents to have own Timeline, sharing a TimeContext
  @Input() onSeek: OnSeekHandler;
  @Input() width: number;
  @Input() curve: VectorFeature;
  @Input() colour: string;
  @ViewChild(TracksComponent) tracksComponent: TracksComponent;

  renderInspector(range: [number, number], unit?: string): void {
    this.tracksComponent.renderInspector(range, unit);
  }

  get updatePosition(): OnSeekHandler {
    return this.tracksComponent.updatePosition;
  }

  renderScale(range: [number, number]): void {
    this.tracksComponent.renderScale(range);
  }

  get range(): [number, number] {
    return this.tracksComponent.range;
  }
}
