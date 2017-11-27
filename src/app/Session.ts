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
  private historyOffset: number;

  constructor() {
    this.stack = [];
    this.history = [[]];
    this.historyOffset = 0;
  }

  shiftMutating(): T {
    const item = this.stack[0];
    this.stack = this.stack.slice(1);
    return item;
  }

  shift(): T {
    const item = this.shiftMutating();
    this.updateHistory();
    return item;
  }

  unshiftMutating(item: T): number {
    this.stack = [item, ...this.stack];
    return this.stack.length;
  }

  unshift(item: T): number {
    const newLength = this.unshiftMutating(item);
    this.updateHistory();
    return newLength;
  }

  findIndex(predicate: (value: T,
                        index: number,
                        array: T[]) => boolean): number {
    return this.stack.findIndex(predicate);
  }

  findIndexAndUse(predicate: (value: T,
                              index: number,
                              array: T[]) => boolean,
                  use: (index: number) => void): boolean {
    const index = this.stack.findIndex(predicate);
    const didFind = index !== -1;
    if (didFind) {
      use(index);
    }
    return didFind;
  }

  filter(predicate: (value: T, index: number, array: T[]) => boolean): T[] {
    return this.stack.filter(predicate);
  }

  get(index: number): T {
    return this.stack[index];
  }

  set(index: number, value: T) {
    this.setMutating(index, value);
    this.updateHistory();
  }

  setMutating(index: number, value: T) {
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
    this.stack = this.stack.reduce((acc, item, i) => {
      if (!indices.includes(i)) {
        acc.push(item);
      }
      return acc;
    }, [] as T[]);
    this.updateHistory();
  }

  stepBack(): void {
    const latest = this.history.length - 1;
    if (++this.historyOffset <= latest) {
      this.stack = this.history[latest - this.historyOffset];
    } else {
      this.historyOffset = latest;
    }
  }

  stepForward(): void {
    const latest = this.history.length - 1;
    if (--this.historyOffset >= 0) {
      this.stack = this.history[latest - this.historyOffset];
    } else {
      this.historyOffset = 0;
    }
  }

  toIterable(): Iterable<T> {
    return this.stack;
  }

  private updateHistory(): void {
    if (this.historyOffset !== 0) {
      this.history = this.history.slice(
        0,
        this.history.length - this.historyOffset
      );
      this.historyOffset = 0;
    }
    this.history.push([...this.stack]);
  }
}
