/**
 * Created by lucast on 26/04/2017.
 */
import {StreamingResponse} from "piper/StreamingService";

export const arrayReducer = <T>(acc: T[], val: T[]): T[] => {
  for (let i = 0, len = val.length; i < len; ++i) {
    acc.push(val[i]);
  }
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
                                         val: StreamingResponse):
  StreamingResponse => {
  acc.progress = val.progress;
  if (val.configuration) {
    acc.configuration = val.configuration;
  }
  arrayReducer(acc.features, val.features);
  return acc;
};
