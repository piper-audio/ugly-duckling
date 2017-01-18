/**
 * Created by lucas on 01/12/2016.
 */

import {EmscriptenProxy, ListRequest, ListResponse} from 'piper';
import {
  PiperSimpleClient, SimpleRequest,
  SimpleResponse
} from 'piper/HigherLevelUtilities';
import { VampExamplePlugins } from 'piper/ext/VampExamplePluginsModule';
import {AvailableLibraries} from "./feature-extraction.service";

// TODO TypeScript has a .d.ts file for webworkers, but for some reason it clashes with the typings for dom and causes compiler errors
interface WorkerGlobalScope {
  onmessage: (this: this, ev: MessageEvent) => any;
  postMessage(data: any): void;
  importScripts(uri: string): void;
}

interface MessageEvent {
  readonly data: any;
}

type LibraryUri = string;
type LibraryKey = string;

interface Message {
  method: string;
  params: any;
}

type RequireJs = (libs: string[], callback: (...libs: any[]) => void) => void;

export default class FeatureExtractionWorker {
  private workerScope: WorkerGlobalScope;
  private clients: Map<string, PiperSimpleClient>;
  private remoteLibraries: Map<LibraryKey, LibraryUri>;

  constructor(workerScope: WorkerGlobalScope, private requireJs: RequireJs) {
    this.workerScope = workerScope;
    this.clients = new Map<LibraryKey, PiperSimpleClient>();
    this.remoteLibraries = new Map<LibraryKey, LibraryUri>();
    this.clients.set(
      'vamp-example-plugins',
      new PiperSimpleClient(new EmscriptenProxy(VampExamplePlugins()))
    );

    this.workerScope.onmessage = (ev: MessageEvent) => {
      const sendResponse = (result) => {
        this.workerScope.postMessage({
          method: ev.data.method,
          result: result
        });
      };
      switch (ev.data.method) {
        case 'list':
          this.list(ev.data.params)
            .then(sendResponse)
            .catch(err => console.error(err)); // TODO handle error
          break;
        case 'process':
          this.process(ev.data.params)
            .then(sendResponse)
            .catch(err => console.error(err)); // TODO handle error
          break;
        case 'collect':
          this.collect(ev.data.params)
            .then(sendResponse)
            .catch(err => console.error(err)); // TODO handle error
          break;
        case 'import':
          // this.workerScope.importScripts(ev.data.params);
          const key: LibraryKey = ev.data.params;
          if (this.remoteLibraries.has(key)) {
            this.requireJs([this.remoteLibraries.get(key)], (plugin) => {
              this.clients.set(
                key,
                new PiperSimpleClient(new EmscriptenProxy(plugin.createLibrary()))
              ); // TODO won't always be an emscripten module
              this.list({}).then(sendResponse);
            });
          } else {
            console.error('Non registered library key.'); // TODO handle error
          }
          break;
        case 'addRemoteLibraries': // TODO rename
          const available: AvailableLibraries = ev.data.params;
          Object.keys(available).forEach(key => {
            this.remoteLibraries.set(key, available[key]);
          });
      }
    };
  }

  private list(request: ListRequest): Promise<ListResponse> {
    // TODO actually pay attention to ListRequest
    return Promise.all([...this.clients.values()].map(client => client.list({})))
      .then(allAvailable => {
        return {
          available: allAvailable.reduce(
            (all, current) => all.concat(current.available),
            []
          )
        };
      });
  }

  // TODO reduce dupe
  private process(request: SimpleRequest): Promise<SimpleResponse> {
    const key: LibraryKey = request.key.split(':')[0];
    const client: PiperSimpleClient = this.clients.get(key);
    return client ? client.process(request) : Promise.reject("Invalid plugin library key.");
  }

  private collect(request: SimpleRequest): Promise<SimpleResponse> {
    const key: LibraryKey = request.key.split(':')[0];
    const client: PiperSimpleClient = this.clients.get(key);
    return client ? client.collect(request) : Promise.reject("Invalid plugin library key.");
  }
}
