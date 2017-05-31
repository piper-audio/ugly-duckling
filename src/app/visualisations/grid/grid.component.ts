/**
 * Created by lucast on 31/05/2017.
 */
import {WavesComponent} from '../waves-base.component';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
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
export class GridComponent extends WavesComponent<MatrixFeature> {

  @Input() set grid(grid: MatrixFeature) {
    this.feature = grid;
  }

  protected get featureLayers(): Layer[] {
    const startTime = this.feature.startTime; // !!! + make use of
    const stepDuration = this.feature.stepDuration;
    const matrixData = this.feature.data;

    if (matrixData.length === 0) {
      return [];
    }

    const targetValue = estimatePercentile(matrixData, 95);
    const gain = (targetValue > 0.0 ? (1.0 / targetValue) : 1.0);
    const matrixEntity = new Waves.utils.PrefilledMatrixEntity(
      matrixData,
      0, // startTime
      stepDuration
    );

    return [
      new Waves.helpers.MatrixLayer(
        matrixEntity,
        {
          gain: gain,
          height: this.height,
          normalise: 'none',
          mapper: iceMapper()
        }
      )
    ];
  }
}
