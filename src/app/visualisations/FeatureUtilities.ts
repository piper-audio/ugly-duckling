/**
 * Created by lucast on 24/05/2017.
 */

import {FeatureList} from 'piper/Feature';
import {OutputDescriptor, toSeconds} from 'piper';
import {
  SimpleResponse,
  TracksFeature,
  VectorFeature
} from 'piper/HigherLevelUtilities';


export type NoteLikeUnit = 'midi' | 'hz' ;
export interface Note {
  time: number;
  duration: number;
  pitch: number;
  velocity?: number;
}

export interface Region {
  time: number;
  duration: number;
  value: number;
}

export function getCanonicalNoteLikeUnit(unit: string): NoteLikeUnit | null {
  const canonicalUnits: NoteLikeUnit[] = ['midi', 'hz'];
  return canonicalUnits.find(canonicalUnit => {
    return unit.toLowerCase().indexOf(canonicalUnit) >= 0;
  });
}

export function mapFeaturesToNotes(featureData: FeatureList,
                                   descriptor: OutputDescriptor): Note[] {
  const canonicalUnit = getCanonicalNoteLikeUnit(descriptor.configured.unit);
  const isHz = canonicalUnit === 'hz';
  return featureData.map(feature => ({
    time: toSeconds(feature.timestamp),
    duration: toSeconds(feature.duration),
    pitch: isHz ?
      frequencyToMidiNote(feature.featureValues[0]) : feature.featureValues[0]
  }));
}

export function mapFeaturesToRegions(featureData: FeatureList,
                                     descriptor: OutputDescriptor): Region[] {
  return featureData.map(feature => ({
    time: toSeconds(feature.timestamp),
    duration: toSeconds(feature.duration),
    value: feature.featureValues.length > 0 ? feature.featureValues[0] : null,
    label: feature.label
  }));
}

export function frequencyToMidiNote(frequency: number,
                                    concertA: number = 440.0): number {
  return 69 + 12 * Math.log2(frequency / concertA);
}

export function* createColourGenerator(colours) {
  let index = 0;
  const nColours = colours.length;
  while (true) {
    yield colours[index = ++index % nColours];
  }
}

export const defaultColourGenerator = createColourGenerator([
  '#0868ac', // "sapphire blue", our waveform / header colour
  '#c33c54', // "brick red"
  '#17bebb', // "tiffany blue"
  '#001021', // "rich black"
  '#fa8334', // "mango tango"
  '#034748' // "deep jungle green"
]);

// TODO this might belong somewhere else, or perhaps the stuff above ^^ does

export interface Instant {
  time: number;
  label: string;
}

type CollectedShape = 'vector' | 'matrix' | 'tracks';

type ShapeDeducedFromList = 'notes' | 'regions' | 'instants';
export type HigherLevelFeatureShape = CollectedShape | ShapeDeducedFromList;

export abstract class Grid {
  binNames: string[];
  startTime: number;
  stepDuration: number;
  data: Float32Array[];
}

export type ShapedFeatureData =
  VectorFeature
  | Grid
  | TracksFeature
  | Note[]
  | Region[]
  | Instant[];

// These needn't be classes (could just be interfaces), just experimenting
export abstract class ShapedFeature<Shape extends HigherLevelFeatureShape,
  Data extends ShapedFeatureData> {
  shape: Shape;
  collected: Data;
}

export class Vector extends ShapedFeature<'vector', VectorFeature> {}
export class Matrix extends ShapedFeature<'matrix', Grid> {}
export class Tracks extends ShapedFeature<'tracks', TracksFeature> {}
export class Notes extends ShapedFeature<'notes', Note[]> {}
export class Regions extends ShapedFeature<'regions', Region[]> {}
export class Instants extends ShapedFeature<'instants', Instant[]> {}
export type KnownShapedFeature = Vector
  | Matrix
  | Tracks
  | Notes
  | Regions
  | Instants;

function hasKnownShapeOtherThanList(shape: string): shape is CollectedShape {
  return ['vector', 'matrix', 'tracks'].includes(shape);
}

const rdfTypes = {
  'http://purl.org/ontology/af/Note': 'notes',
//  'http://purl.org/ontology/af/StructuralSegment': 'segments' // TODO segments
};

const throwShapeError = () => { throw new Error('No shape could be deduced'); };

function deduceHigherLevelFeatureShape(response: SimpleResponse)
: HigherLevelFeatureShape {

  const collection = response.features;
  const descriptor = response.outputDescriptor;
  if (hasKnownShapeOtherThanList(collection.shape)) {
    return collection.shape;
  }

  // TODO it's a shame that the types in piper don't make this easy for the
  // compiler to deduce
  if (collection.shape !== 'list' && collection.collected instanceof Array) {
    throwShapeError();
  }

  const featureData = collection.collected as FeatureList;
  const hasDuration = descriptor.configured.hasDuration;
  const binCount = descriptor.configured.binCount;

  const isMarker = !hasDuration
    && binCount === 0
    && (featureData.length === 0 || featureData[0].featureValues == null);

  if (isMarker) {
    return 'instants';
  }

  if (descriptor.static) {
    const typeURI = descriptor.static.typeURI;
    if (typeof typeURI === 'string' && typeof rdfTypes[typeURI] === 'string') {
      return rdfTypes[typeURI];
    }
  }

  const isRegionLike = hasDuration &&
    (featureData.length > 0 && featureData[0].timestamp != null);

  const isMaybeNote = getCanonicalNoteLikeUnit(descriptor.configured.unit)
    && [1, 2].find(nBins => nBins === binCount);

  if (isRegionLike) {
    if (isMaybeNote) {
      return 'notes';
    } else {
      return 'regions';
    }
  }

  throwShapeError();
}

export function toKnownShape(response: SimpleResponse): KnownShapedFeature {
  const deducedShape = deduceHigherLevelFeatureShape(response);
  switch (deducedShape) {
    case 'vector':
      return response.features as Vector;
    case 'matrix':
      return {
        shape: deducedShape,
        collected: Object.assign(response.features.collected, {
          binNames: response.outputDescriptor.configured.binNames || []
        })
      } as Matrix;
    case 'tracks':
      return response.features as Tracks;
    case 'notes':
      return {
        shape: deducedShape,
        collected: mapFeaturesToNotes(
          response.features.collected as FeatureList,
          response.outputDescriptor
        )
      };
    case 'regions':
      return {
        shape: deducedShape,
        collected: mapFeaturesToRegions(
          response.features.collected as FeatureList,
          response.outputDescriptor
        )
      };
    case 'instants':
      const featureData = response.features.collected as FeatureList;
      return {
        shape: deducedShape,
        collected: featureData.map(feature => ({
          time: toSeconds(feature.timestamp),
          label: feature.label
        }))
      };
  }
  throwShapeError();
}

export interface PlotDataPoint {
  cx: number;
  cy: number;
}

export interface PlotData {
  points: PlotDataPoint[];
  startTime: number;
  duration;
}

export interface PlotLayerData {
  data: PlotData[];
  yDomain: [number, number];
}

export function generatePlotData(features: VectorFeature[]): PlotLayerData {

  const winnowed = features.filter(feature => feature.data.length > 0);

  // First establish a [min,max] range across all of the features
  let [min, max] = winnowed.reduce((acc, feature) => {
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
    console.warn('WARNING: min or max is NaN');
    min = 0;
    max = 1;
  }

  return {
    data: winnowed.map(feature => {
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
        points: plotData,
        startTime: feature.startTime,
        duration: duration
      };
    }),
    yDomain: [min, max]
  };
}
