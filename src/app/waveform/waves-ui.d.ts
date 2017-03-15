/**
 * Created by lucas on 01/12/2016.
 */
declare const AmbientInstance: WavesUserInterface;

declare module 'waves-ui' {
  export default AmbientInstance;
}

interface WavesUserInterface {
  core: any;
  helpers: any;
  states: any;
  utils: Utilities;
}

interface MatrixEntity {
  getColumnCount(): number;
  getColumnHeight(): number;
  getColumn(n: number): number[];
  getStepDuration(): number;
  getStartTime(): number;
}

interface MatrixEntityConstructor {
  new(): MatrixEntity;
}

interface PrefilledMatrixEntityConstructor {
  new(data: Float32Array[] | number[][],
      startTime: number,
      stepDuration: number): MatrixEntity;
}

interface Utilities {
  MatrixEntity: MatrixEntityConstructor;
  PrefilledMatrixEntity: PrefilledMatrixEntityConstructor;
  scales: any;
}
