/**
 * Created by lucast on 26/04/2017.
 */
import {StreamingResponse} from 'piper/StreamingService';
import {Feature, FeatureList} from 'piper/Feature';
import {SampleType} from 'piper';
import {
  VectorFeature, MatrixFeature, TracksFeature
} from "piper/HigherLevelUtilities";

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
                                         i: number): StreamingResponse =>
  {
    if (acc.features.shape !== val.features.shape) {
      throw new Error(`Unexpected feature shape ${val.features.shape} (expected ${acc.features.shape})`);
    }

    acc.processedBlockCount = val.processedBlockCount;

    const isOneSamplePerStep = acc.outputDescriptor.configured.sampleType ===
      SampleType.OneSamplePerStep;

    let incoming, collected;

    console.log("i = " + i + ", shape = " + acc.features.shape + ", count = " + acc.processedBlockCount);
    
    switch (acc.features.shape) {

    case "vector":
      incoming = val.features.collected as VectorFeature;
      collected = acc.features.collected as VectorFeature;
      if (isOneSamplePerStep) {
	// for one sample per step vectors we know there will be
	// totalBlockCount number of samples - so pre-allocate the
	// Float32Array when we know the totalBlockCount (after
	// receiving the first feature)
	if (i === 1) {
          const newBlock = new Float32Array(acc.totalBlockCount);
          newBlock[0] = collected.data[0];
          collected.data = newBlock;
	}
	collected.data = inPlaceTypedArrayReducer(
	  collected.data,
	  incoming.data,
          i
	);
      } else {
	// if not OneSamplePerStep we have to make a new array each time
	collected.data = typedArrayReducer(
          collected.data,
	  incoming.data
	);
      }
      break;

    case "matrix":
      incoming = val.features.collected as MatrixFeature;
      collected = acc.features.collected as MatrixFeature;
      collected.data = arrayReducer<Float32Array>(
	collected.data,
	incoming.data
      );
      break;

    case "list":
      incoming = val.features.collected as FeatureList;
      collected = acc.features.collected as FeatureList;
      acc.features.collected = arrayReducer<Feature>(
	collected,
	incoming
      );
      break;
      
    case "tracks":
      incoming = val.features.collected as TracksFeature;
      collected = acc.features.collected as TracksFeature;
      acc.features.collected = arrayReducer<VectorFeature>(
	collected, incoming
      );
      break;

    default:
      throw new Error('Invalid feature output. Aborting');
    }
    
    return acc;
  };
