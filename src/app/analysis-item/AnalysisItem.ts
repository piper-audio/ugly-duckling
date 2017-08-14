/**
 * Created by lucast on 08/06/2017.
 */
import {KnownShapedFeature} from '../visualisations/FeatureUtilities';
import {OneShotExtractionRequest as SimpleRequest} from 'piper-js/one-shot';
export abstract class Item {
  id: string;
  hasSharedTimeline: boolean;
  title?: string;
  description?: string;
  progress?: number;
}

export interface RootAudioItem extends Item {
  uri: string;
  mimeType?: string;
  isExportable?: boolean;
}
export interface LoadedRootAudioItem extends RootAudioItem {
  audioData: AudioBuffer;
}

export interface AnalysisItem extends Item {
  parent: LoadedRootAudioItem;
  extractorKey: string;
  outputId: string;
}

export type ExtractedAnalysisItem = AnalysisItem & KnownShapedFeature & {
  unit?: string
};

export function isItem(item: Item): item is Item {
  return item.id != null && item.hasSharedTimeline != null;
}

export function isPendingRootAudioItem(item: Item): item is RootAudioItem {
  return isItem(item) && typeof (item as RootAudioItem).uri === 'string';
}

export function isLoadedRootAudioItem(item: Item): item is LoadedRootAudioItem {
  return item && isPendingRootAudioItem(item) &&
    (item as LoadedRootAudioItem).audioData instanceof AudioBuffer;
}

export function isPendingAnalysisItem(item: Item): item is AnalysisItem {
  const downcast = (item as ExtractedAnalysisItem);
  return isLoadedRootAudioItem(downcast.parent)
    && typeof downcast.extractorKey === 'string';
}

export function isExtractedAnalysisItem(it: Item): it is ExtractedAnalysisItem {
  const downcast = (it as ExtractedAnalysisItem);
  return isPendingAnalysisItem(it) &&
    downcast.shape != null &&
    downcast.collected != null;
}

export function getRootAudioItem(item: Item): RootAudioItem {
  if (isPendingRootAudioItem(item)) {
    return item;
  }
  if (isPendingAnalysisItem(item)) {
    return item.parent;
  }
  throw new Error('Invalid item.');
}

// these should probably be actual concrete types with their own getUri methods
export function getRootUri(item: Item): string {
  return getRootAudioItem(item).uri;
}

export function createExtractionRequest(item: AnalysisItem): SimpleRequest {
  return {
    audioData: [...Array(item.parent.audioData.numberOfChannels).keys()]
      .map(i => item.parent.audioData.getChannelData(i)),
    audioFormat: {
      sampleRate: item.parent.audioData.sampleRate,
      channelCount: item.parent.audioData.numberOfChannels,
      length: item.parent.audioData.length
    },
    key: item.extractorKey,
    outputId: item.outputId
  };
}
