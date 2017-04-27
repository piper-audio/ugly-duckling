/**
 * Created by lucas on 01/12/2016.
 */

import {PiperVampService, ListRequest, ListResponse} from 'piper';
import {
  SimpleRequest
} from 'piper/HigherLevelUtilities';
import { VampExamplePlugins } from 'piper/ext/VampExamplePluginsModule';
import {
  AvailableLibraries
} from './feature-extraction.service';
import {
  DedicatedWorkerGlobalScope,
  WebWorkerStreamingServer
} from 'piper/servers/WebWorkerStreamingServer';
import {
  PiperStreamingService,
  StreamingResponse,
  StreamingService
} from 'piper/StreamingService';
import {Observable} from 'rxjs/Observable';
import {EmscriptenModule} from 'piper/PiperVampService';
import {streamingResponseReducer} from './FeatureReducers';

interface MessageEvent {
  readonly data: any;
}

type LibraryUri = string;
type LibraryKey = string;

type RequireJs = (libs: string[], callback: (...libs: any[]) => void) => void;

class AggregateStreamingService implements StreamingService {
  private services: Map<LibraryKey, PiperStreamingService>;

  constructor() {
    this.services = new Map<LibraryKey, PiperStreamingService>();
    this.services.set(
      'vamp-example-plugins',
      new PiperStreamingService(new PiperVampService(VampExamplePlugins()))
    );
  }

  addService(key: LibraryKey, service: PiperStreamingService): void {
    this.services.set(key, service);
  }

  list(request: ListRequest): Promise<ListResponse> {
    return Promise.all(
      [...this.services.values()].map(client => client.list({}))
    ).then(allAvailable => ({
        available: allAvailable.reduce(
          (all, current) => all.concat(current.available),
          []
        )
      })
    );
  }

  process(request: SimpleRequest): Observable<StreamingResponse> {
    return this.dispatch('process', request);
  }

  collect(request: SimpleRequest): Observable<StreamingResponse> {
    return this.dispatch('collect', request);
  }

  protected dispatch(method: 'process' | 'collect',
                     request: SimpleRequest): Observable<StreamingResponse> {
    const key = request.key.split(':')[0];
    return this.services.has(key) ?
      this.services.get(key)[method](request) : Observable.throw('Invalid key');
  }
}

class ReducingAggregateService extends AggregateStreamingService {
  constructor() {
    super();
  }

  protected dispatch(method: 'process' | 'collect',
                     request: SimpleRequest): Observable<StreamingResponse> {
    let lastPercentagePoint = 0;
    return super.dispatch(method, request)
      .scan(streamingResponseReducer)
      .filter(val => {
        const percentage =
          100 * (val.processedBlockCount / val.totalBlockCount) | 0;
        const pointDifference = (percentage - lastPercentagePoint);
        const shouldEmit = pointDifference === 1 || percentage === 100;
        if (shouldEmit) {
          lastPercentagePoint = percentage;
        }
        return shouldEmit;
      });
  }
}

export default class FeatureExtractionWorker {
  private workerScope: DedicatedWorkerGlobalScope;
  private remoteLibraries: Map<LibraryKey, LibraryUri>;
  private server: WebWorkerStreamingServer;
  private service: AggregateStreamingService;

  constructor(workerScope: DedicatedWorkerGlobalScope,
              private requireJs: RequireJs) {
    this.workerScope = workerScope;
    this.remoteLibraries = new Map<LibraryKey, LibraryUri>();
    this.service = new ReducingAggregateService();
    this.setupImportLibraryListener();
    this.server = new WebWorkerStreamingServer(
      this.workerScope,
      this.service
    );
  }

  private setupImportLibraryListener(): void {

    this.workerScope.onmessage = (ev: MessageEvent) => {
      const sendResponse = (result) => {
        this.workerScope.postMessage({
          method: ev.data.method,
          result: result
        });
      };
      switch (ev.data.method) {
        case 'import':
          const key: LibraryKey = ev.data.params;
          if (this.remoteLibraries.has(key)) {
            this.requireJs([this.remoteLibraries.get(key)], (plugin) => {
              // TODO a factory with more logic probably belongs in piper-js
              const lib: any | EmscriptenModule = plugin.createLibrary();
              const isEmscriptenModule = typeof lib.cwrap === 'function';
              const service = new PiperStreamingService(
                isEmscriptenModule ? new PiperVampService(lib) : lib // TODO
              );
              this.service.addService(key, service);
              this.service.list({}).then(sendResponse);
            });
          } else {
            console.error('Non registered library key.'); // TODO handle error
          }
          break;
        case 'addRemoteLibraries': // TODO rename
          const available: AvailableLibraries = ev.data.params;
          Object.keys(available).forEach(libraryKey => {
            this.remoteLibraries.set(libraryKey, available[libraryKey]);
          });
      }
    };
  }
}
