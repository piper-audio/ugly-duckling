/**
 * Created by lucas on 30/05/2017.
 */
import {WavesComponent} from "../waves-base.component";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild
} from "@angular/core";
import {VectorFeature} from "piper/HigherLevelUtilities";
import Waves from 'waves-ui-piper';

interface PlotData {
  cx: number;
  cy: number;
}

interface PlotLayerData {
  data: PlotData[];
  color: string;
  height: number;
  yDomain: [number, number];
  startTime: number;
  duration: number;
}

@Component({
  selector: 'ugly-curve',
  templateUrl: '../waves-template.html',
  styleUrls: ['../waves-template.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurveComponent extends WavesComponent implements AfterViewInit {

  @ViewChild('track') trackDiv: ElementRef;

  private mFeature: VectorFeature;
  private currentState: PlotLayerData[];

  @Input() set feature(input: VectorFeature) {
    this.mFeature = input;
    this.currentState = this.generatePlotData([input], '', 'black');
    this.update();
  }

  get feature(): VectorFeature {
    return this.mFeature;
  }

  ngAfterViewInit(): void {
    this.renderTimeline(this.trackDiv);
    this.update();
  }

  update(): void {
    if (this.waveTrack) {
      for (const feature of this.currentState) {
        const lineLayer = new Waves.helpers.LineLayer(feature.data, {
          color: feature.color,
          height: feature.height,
          yDomain: feature.yDomain
        });
        this.addLayer(
          lineLayer,
          this.waveTrack,
          this.timeline.timeContext
        );

        // Set start and duration so that the highlight layer can use
        // them to determine which line to draw values from
        lineLayer.start = feature.startTime;
        lineLayer.duration = feature.duration;
      }
    }
  }

  private generatePlotData(features: VectorFeature[],
                           unit: string,
                           colour: string): PlotLayerData[] {

    // Winnow out empty features
    features = features.filter(feature => (feature.data.length > 0));

    // First establish a [min,max] range across all of the features
    let [min, max] = features.reduce((acc, feature) => {
      return feature.data.reduce((acc, val) => {
        const [min, max] = acc;
        return [Math.min(min, val), Math.max(max, val)];
      }, acc);
    }, [Infinity, -Infinity]);

    if (min === Infinity) {
      min = 0;
      max = 1;
    }

    if (min !== min || max !== max) {
      console.log('WARNING: min or max is NaN');
      min = 0;
      max = 1;
    }

    const height = this.trackDiv.nativeElement.getBoundingClientRect().height;
    return features.map(feature => {
      let duration = 0;

      // Give the plot items positions relative to the start of the
      // line, rather than relative to absolute time 0. This is
      // because we'll be setting the layer timeline start property
      // later on and these will be positioned relative to that

      const plotData = [...feature.data].map((val, i) => {
        const t = i * feature.stepDuration;
        duration = t + feature.stepDuration;
        return {
          cx: t,
          cy: val
        };
      });

      return {
        data: plotData,
        color: colour,
        height: height,
        yDomain: [min, max] as [number, number],
        startTime: feature.startTime,
        duration: duration
      };
    });
  }
}
