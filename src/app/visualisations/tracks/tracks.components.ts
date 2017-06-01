/**
 * Created by lucas on 30/05/2017.
 */
import {
  InspectableVerticallyBoundedComponent,
  VerticallyBounded,
  VerticalScaleRenderer,
  VerticalValueInspectorRenderer,
} from '../waves-base.component';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import {TracksFeature} from 'piper/HigherLevelUtilities';
import Waves from 'waves-ui-piper';
import {generatePlotData, PlotLayerData} from '../FeatureUtilities';

@Component({
  selector: 'ugly-tracks',
  templateUrl: '../waves-template.html',
  styleUrls: ['../waves-template.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: VerticallyBounded, useExisting: TracksComponent },
    {provide: VerticalScaleRenderer, useExisting: TracksComponent},
    {provide: VerticalValueInspectorRenderer, useExisting: TracksComponent},
  ],
})
export class TracksComponent
  extends InspectableVerticallyBoundedComponent<TracksFeature> {

  private currentState: PlotLayerData[];

  @Input() set tracks(input: TracksFeature) {
    this.feature = input;
  }

  get range(): [number, number] {
    return this.currentState && this.currentState.length > 0 ?
      this.currentState[0].yDomain : null;
  }

  protected get featureLayers(): Layer[] {
    this.currentState = generatePlotData(this.feature);
    return this.currentState.map(feature => new Waves.helpers.LineLayer(
      feature.data, {
        color: this.colour,
        height: this.height,
        yDomain: feature.yDomain
      })
    );
  }

  protected get postAddMap() {
    return (layer, index) => {
      layer.start = this.currentState[index].startTime;
      layer.duration = this.currentState[index].duration;
      layer.update();
    };
  }
}
