/**
 * Created by lucast on 31/05/2017.
 */
import {WavesComponent} from '../waves-base.component';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import {Instant} from '../FeatureUtilities';
import Waves from 'waves-ui-piper';

@Component({
  selector: 'ugly-instants',
  templateUrl: '../waves-template.html',
  styleUrls: ['../waves-template.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstantsComponent extends WavesComponent<Instant[]> {

  @ViewChild('track') trackDiv: ElementRef;

  @Input() set instants(instants: Instant[]) {
    this.feature = instants;
  }

  protected get containerHeight(): number {
    return this.trackDiv.nativeElement.getBoundingClientRect().height;
  }

  protected get trackContainer(): ElementRef {
    return this.trackDiv;
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
