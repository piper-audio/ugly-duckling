/**
 * Created by lucast on 26/04/2017.
 */
import {StreamingResponse} from 'piper/StreamingService';
import {Feature} from 'piper/Feature';
import {SampleType} from 'piper';

export const arrayReducer = <T>(acc: T[], val: T[]): T[] => {
  acc.push.apply(acc, val);
  return acc;
};

export const typedArrayReducer = (acc: Float32Array,
                                  val: Float32Array): Float32Array => {
  return Float32Array.of(...acc, ...val);
};

const inPlaceTypedArrayReducer = (acc: Float32Array,
                                  val: Float32Array,
                                  i: number): Float32Array => {
  acc.set(val, i);
  return acc;
};

export const streamingResponseReducer = (acc: StreamingResponse,
                                         val: StreamingResponse,
                                         i: number): StreamingResponse => {
  acc.processedBlockCount = val.processedBlockCount;
  if (acc.features.data instanceof Array &&
    val.features.data instanceof Array) {
    acc.features.data = arrayReducer<Feature>(
      acc.features.data,
      val.features.data
    );
  } else if (acc.features.data instanceof Float32Array &&
    val.features.data instanceof Float32Array) {
    const isOneSamplePerStep = acc.outputDescriptor.configured.sampleType ===
      SampleType.OneSamplePerStep;
    if (isOneSamplePerStep) {
      // for one sample per step vectors we know there will be totalBlockCount
      // number of samples - so pre-allocate the Float32Array when we know
      // the totalBlockCount (after receiving the first feature)
      if ( i === 1  ) {
        const newBlock = new Float32Array(acc.totalBlockCount);
        newBlock[0] = acc.features.data[0];
        acc.features.data = newBlock;
      }
      acc.features.data = inPlaceTypedArrayReducer(
        acc.features.data,
        val.features.data,
        i
      );
    } else { // if not OneSamplePerStep we have to make a new array each time
      acc.features.data = typedArrayReducer(
        acc.features.data,
        val.features.data
      );
    }
  } else {
    throw new Error('Invalid feature output. Aborting');
  }
  return acc;
};
