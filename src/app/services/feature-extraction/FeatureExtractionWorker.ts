/**
 * Created by lucas on 01/12/2016.
 */

// TODO TypeScript has a .d.ts file for webworkers, but for some reason it clashes with the typings for dom and causes compiler errors
interface WorkerGlobalScope {
  onmessage: (this: this, ev: MessageEvent) => any;
  postMessage(data: any): void;
}

interface MessageEvent {
  readonly data: any;
}

export default class FeatureExtractionWorker {
  private workerScope: WorkerGlobalScope;

  constructor(workerScope: WorkerGlobalScope) {
    console.log('ctor');
    this.workerScope = workerScope;
    this.workerScope.onmessage = (ev: MessageEvent) => {
      console.log(ev.data);
    };
    let counter = 0;
    setInterval(() => this.workerScope.postMessage(counter++), 1000);
  }
}
