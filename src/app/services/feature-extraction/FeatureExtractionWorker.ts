/**
 * Created by lucas on 01/12/2016.
 */

import {ListResponse, EmscriptenProxy} from 'piper';
import {PiperSimpleClient} from 'piper/HigherLevelUtilities';
import { VampExamplePlugins } from 'piper/ext/VampExamplePluginsModule';


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
  private piperClient: PiperSimpleClient;

  constructor(workerScope: WorkerGlobalScope) {
    this.workerScope = workerScope;
    let counter = 0;
    setInterval(() => this.workerScope.postMessage(counter++), 1000);
    this.piperClient = new PiperSimpleClient(new EmscriptenProxy(VampExamplePlugins()));
    this.workerScope.onmessage = (ev: MessageEvent) => {
      switch (ev.data.method) {
        case 'list':
          this.piperClient.list({}).then(this.workerScope.postMessage);
      }
    };
  }


}
