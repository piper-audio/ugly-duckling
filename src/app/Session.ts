/**
 * Created by lucast on 08/06/2017.
 */
import {
  Item,
  RootAudioItem
} from './analysis-item/AnalysisItem';

export const exampleSession: SerialisedNotebook = {
  root: {
    id: '1',
    hasSharedTimeline: true,
    title: 'Drum Loop',
    description: 'Remotely hosted audio file',
    uri: 'https://piper-audio.github.io/waves-ui-piper/examples/assets/drum-loop.wav'
  },
  analyses: [
    {
      id: '2',
      hasSharedTimeline: true,
      extractorKey: 'vamp-example-plugins:amplitudefollower',
      outputId: 'amplitude',
      title: 'Amplitude',
      description: 'amplitude'
    },
    {
      id: '3',
      hasSharedTimeline: true,
      extractorKey: 'vamp-example-plugins:powerspectrum',
      outputId: 'powerspectrum',
      title: 'Simple Power Spectrum',
      description: 'powerspectrum'
    },

  ]
};

export interface SerialisedAnalysisItem extends Item {
  extractorKey: string;
  outputId: string;
}

export interface SerialisedNotebook {
  root: RootAudioItem;
  analyses: SerialisedAnalysisItem[];
}

export type ResourceRetriever = (url: string) => Promise<Blob>;

export const downloadResource: ResourceRetriever = async (url) => {
  const response = await fetch(url);
  const mimeType = response.headers.get('content-type');
  // Safari's fetch.blob implementation doesn't populate the type property
  // causing the audio player to fail due to an unsupported type.
  // Manually create a blob from an array buffer and the content type in
  // the response object
  const arrayBufferToBlob = async () => {
    const arrayBuffer = await response.arrayBuffer();
    return new Blob([arrayBuffer], {type: mimeType});
  };
  return mimeType ? arrayBufferToBlob() : response.blob();
};

export class PersistentStack<T> {
  private stack: T[];
  private history: T[][];

  constructor() {
    this.stack = [];
    this.history = [];
  }

  shift(): T {
    this.history.push([...this.stack]);
    const item = this.stack[0];
    this.stack = this.stack.slice(1);
    return item;
  }

  unshift(item: T): number {
    this.history.push([...this.stack]);
    this.stack = [item, ...this.stack];
    return this.stack.length;
  }

  findIndex(predicate: (value: T,
                        index: number,
                        array: T[]) => boolean): number {
    return this.stack.findIndex(predicate);
  }

  filter(predicate: (value: T, index: number, array: T[]) => boolean): T[] {
    return this.stack.filter(predicate);
  }

  get(index: number): T {
    return this.stack[index];
  }

  set(index: number, value: T) {
    this.history.push([...this.stack]);
    this.stack = [
      ...this.stack.slice(0, index),
      value,
      ...this.stack.slice(index + 1)
    ];
  }

  map<U>(transform: (value: T, index: number, array: T[]) => U): U[] {
    return this.stack.map(transform);
  }

  reduce<U>(reducer: (previousValue: U,
                      currentValue: T,
                      currentIndex: number,
                      array: T[]) => U,
            initialValue: U): U {
    return this.stack.reduce(reducer, initialValue);
  }

  remove(...indices: number[]) {
    this.history.push([...this.stack]);
    this.stack = this.stack.reduce((acc, item, i) => {
      if (!indices.includes(i)) {
        acc.push(item);
      }
      return acc;
    }, [] as T[]);
  }

  toIterable(): Iterable<T> {
    return this.stack;
  }
}
