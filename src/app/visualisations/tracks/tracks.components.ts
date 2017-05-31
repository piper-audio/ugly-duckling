/**
 * Created by lucas on 30/05/2017.
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
import {TracksFeature} from 'piper/HigherLevelUtilities';
import Waves from 'waves-ui-piper';
import {generatePlotData, PlotLayerData} from '../FeatureUtilities';

@Component({
  selector: 'ugly-tracks',
  templateUrl: '../waves-template.html',
  styleUrls: ['../waves-template.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TracksComponent extends WavesComponent<TracksFeature> {

  @ViewChild('track') trackDiv: ElementRef;

  private currentState: PlotLayerData[];

  @Input() set tracks(input: TracksFeature) {
    this.feature = input;
  }

  protected get containerHeight(): number {
    return this.trackDiv.nativeElement.getBoundingClientRect().height;
  }

  protected get trackContainer(): ElementRef {
    return this.trackDiv;
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
