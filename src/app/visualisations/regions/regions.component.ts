/**
 * Created by lucast on 31/05/2017.
 */
import {
  InspectableVerticallyBoundedComponent,
  VerticallyBounded,
  VerticalScaleRenderer,
  VerticalValueInspectorRenderer,
  WavesComponent
} from '../waves-base.component';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import {Region} from '../FeatureUtilities';
import Waves from 'waves-ui-piper';

@Component({
  selector: 'ugly-regions',
  templateUrl: '../waves-template.html',
  styleUrls: ['../waves-template.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: VerticallyBounded, useExisting: RegionsComponent },
    { provide: VerticalScaleRenderer, useExisting: RegionsComponent },
    {provide: VerticalValueInspectorRenderer, useExisting: RegionsComponent },
    {provide: WavesComponent, useExisting: RegionsComponent}
  ]
})
export class RegionsComponent extends InspectableVerticallyBoundedComponent<Region[]> {
  private currentVerticalRange: [number, number];

  get range(): [number, number] {
    return this.currentVerticalRange;
  }

  @Input() set regions(regions: Region[]) {
    this.feature = regions;
  }

  protected get featureLayers(): Layer[] {
    this.currentVerticalRange = findVerticalRange(this.feature);
    return [
      new Waves.helpers.PianoRollLayer(
        this.feature,
        {
          height: this.height,
          color: this.colour,
          yDomain: this.currentVerticalRange
        }
      )
    ];
  }
}

// TODO there might be scope to create a generic utility function like this
function findVerticalRange(regions: Region[]): [number, number] {
  let [min, max] = regions.reduce((acc, region) => {
    const [min, max] = acc;
    return [Math.min (min, region.value), Math.max (max, region.value)];
  }, [Infinity, -Infinity]);
  if (min === Infinity) {
    min = 0;
    max = 1;
  }
  return [ min, max ];
}
