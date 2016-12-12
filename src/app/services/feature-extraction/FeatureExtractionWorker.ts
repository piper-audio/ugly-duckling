/**
 * Created by lucas on 01/12/2016.
 */

import { EmscriptenProxy } from 'piper';
import { PiperSimpleClient } from 'piper/HigherLevelUtilities';
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
    this.piperClient = new PiperSimpleClient(new EmscriptenProxy(VampExamplePlugins()));
    this.workerScope.onmessage = (ev: MessageEvent) => {
      const sendResponse = (result) => {
        this.workerScope.postMessage({
          method: ev.data.method,
          result: result
        });
      };
      switch (ev.data.method) {
        case 'list':
          this.piperClient.list({}).then(sendResponse);
          break;
        case 'process':
          this.piperClient.process(ev.data.params).then(sendResponse);
          break;
        case 'collect':
          this.piperClient.collect(ev.data.params).then(sendResponse).catch(err => console.error(err));
      }
    };
  }

}
