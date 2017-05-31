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
import Waves from 'waves-ui-piper';
import {MatrixFeature} from 'piper/HigherLevelUtilities';
import {iceMapper} from '../../spectrogram/ColourMap';
import {estimatePercentile} from '../../spectrogram/MatrixUtils';

@Component({
  selector: 'ugly-grid',
  templateUrl: '../waves-template.html',
  styleUrls: ['../waves-template.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent extends WavesComponent implements AfterViewInit {
  @ViewChild('track') trackDiv: ElementRef;

  private mFeature: MatrixFeature;
  private height: number; // As it stands, height is fixed. Store once onInit.

  @Input() set grid(grid: MatrixFeature) {
    this.mFeature = grid;
    this.update();
  }

  get grid(): MatrixFeature {
    return this.mFeature;
  }

  ngAfterViewInit(): void {
    this.height = this.trackDiv.nativeElement.getBoundingClientRect().height;
    this.renderTimeline(this.trackDiv);
    this.update();
  }

  update(): void {
    if (!this.waveTrack || !this.grid) { return; }
    this.clearTimeline(this.trackDiv);

    const startTime = this.grid.startTime; // !!! + make use of
    const stepDuration = this.grid.stepDuration;
    const matrixData = this.grid.data;

    if (matrixData.length === 0) {
      return;
    }

    const targetValue = estimatePercentile(matrixData, 95);
    const gain = (targetValue > 0.0 ? (1.0 / targetValue) : 1.0);
    const matrixEntity = new Waves.utils.PrefilledMatrixEntity(
      matrixData,
      0, // startTime
      stepDuration
    );

    this.addLayer(
      new Waves.helpers.MatrixLayer(
        matrixEntity,
        {
          gain: gain,
          height: this.height,
          normalise: 'none',
          mapper: iceMapper()
        }
      ),
      this.waveTrack,
      this.timeline.timeContext
    );
  }
}
