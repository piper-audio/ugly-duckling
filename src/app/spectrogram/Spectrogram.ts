/**
 * Created by lucast on 16/03/2017.
 */
import {RealFft, KissRealFft} from "piper/fft/RealFft";
import {hann} from "piper/FftUtilities";
import {Framing} from "piper";
import Waves from 'waves-ui';

class SpectrogramEntity extends Waves.utils.MatrixEntity {

  private samples: Float32Array;
  private framing: Framing;
  private fft: RealFft;
  private real: Float32Array;
  private nCols: number;
  private columnHeight: number;
  private window: Float32Array;

  constructor(samples: Float32Array, options: Framing & Object) {
    super();
    this.samples = samples;
    this.framing = options;
    this.real = new Float32Array(this.framing.blockSize);
    this.nCols = Math.floor(this.samples.length / this.framing.stepSize); //!!! not correct
    this.columnHeight = Math.round(this.framing.blockSize / 2) + 1;
    this.fft = new KissRealFft(this.framing.blockSize);
    this.window = hann(this.framing.blockSize);
  }

  dispose(): void {
    this.fft.dispose();
  }

  getColumnCount(): number {
    return this.nCols;
  }

  getColumnHeight(): number {
    return this.columnHeight;
  }

  getColumn(n: number): Float32Array {

    const startSample = n * this.framing.stepSize;
    const sz = this.framing.blockSize;

    this.real.fill(0);

    let available = sz;
    if (startSample + sz >= this.samples.length) {
      available = this.samples.length - startSample;
    }

    for (let i = 0; i < available; ++i) {
      this.real[i] = this.samples[startSample + i] * this.window[i];
    }

    const complex = this.fft.forward(this.real);

    const h = this.getColumnHeight();
    const col = new Float32Array(h);

    const scale = 1.0 / Math.sqrt(sz);
    for (let i = 0; i < h; ++i) {
      const re : number = complex[i*2] * scale;
      const im : number = complex[i*2+1] * scale;
      const mag = Math.sqrt(re * re + im * im);
      col[i] = mag;
    }

    return col;
  }
}

export class WavesSpectrogramLayer extends Waves.core.Layer {
  constructor(buffer: AudioBuffer,
              options: Framing & Object) {

    const defaults = {
      normalise: 'hybrid',
      gain: 40.0,
      channel: -1,
      stepSize: 512,
      blockSize: 1024
    };

    const mergedOptions: Framing & Object & {channel: number} =
      Object.assign({}, defaults, options);

    const getSamples = ((buffer, channel) => {
      const nch = buffer.numberOfChannels;
      if (channel >= 0 || nch == 1) {
	if (channel < 0) channel = 0;
	return buffer.getChannelData(channel);
      } else {
        const before = performance.now();
	console.log("mixing down " + nch + " channels for spectrogram...");
	const mixed = Float32Array.from(buffer.getChannelData(0));
	const n = mixed.length;
	for (let ch = 1; ch < nch; ++ch) {
	  const buf = buffer.getChannelData(ch);
	  for (let i = 0; i < n; ++i) mixed[i] += buf[i];
	}
	const scale = 1.0 / nch;
	for (let i = 0; i < n; ++i) mixed[i] *= scale;
	console.log("done in " + (performance.now() - before) + "ms");
	return mixed;
      }
    });
    
    super('entity',
	  new SpectrogramEntity(getSamples(buffer, mergedOptions.channel),
				mergedOptions),
	  mergedOptions);

    this.configureShape(Waves.shapes.Matrix, {}, mergedOptions);
  }
}
