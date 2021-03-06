/**
 * Created by lucast on 31/05/2017.
 */
import {PlayheadRenderer, WavesComponent} from '../waves-base.component';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import {Instant} from '../FeatureUtilities';
import Waves from 'waves-ui-piper';

@Component({
  selector: 'ugly-instants',
  templateUrl: '../waves-template.html',
  styleUrls: ['../waves-template.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: PlayheadRenderer, useExisting: InstantsComponent},
    {provide: WavesComponent, useExisting: InstantsComponent}
  ]
})
export class InstantsComponent extends WavesComponent<Instant[]> {
  @Input() set instants(instants: Instant[]) {
    this.feature = instants;
  }

  protected get featureLayers(): Layer[] {
    return [
      new Waves.helpers.TickLayer(
        this.feature,
        {
          height: this.height,
          color: this.colour,
          labelPosition: 'bottom',
          shadeSegments: true
        }
      )
    ];
  }
}
