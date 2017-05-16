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
type Factory<T> = () => T;

function waterfall<T>(tasks: (() => Promise<T>)[]): Promise<T[]> {
  const reducer = (running: T[], next: Promise<T>): Promise<T[]> => {
    return next.then(response => {
      running = running.concat(response);
      return running;
    });
  };

  return tasks.reduce((runningResponses, nextResponse) => {
    return runningResponses.then(response => {
      return reducer(response, nextResponse());
    })
  }, Promise.resolve([]));
}

class AggregateStreamingService implements StreamingService {
  private services: Map<LibraryKey, Factory<PiperStreamingService>>;

  constructor() {
    this.services = new Map<LibraryKey, Factory<PiperStreamingService>>();
    this.services.set(
      'vamp-example-plugins',
      () => new PiperStreamingService(
        new PiperVampService(VampExamplePlugins())
      )
    );
  }

  addService(key: LibraryKey, service: Factory<PiperStreamingService>): void {
    this.services.set(key, service);
  }

  hasRemoteService(key: LibraryKey): boolean {
    return this.services.has(key);
  }

  list(request: ListRequest): Promise<ListResponse> {
    const listThunks: (() => Promise<ListResponse>)[] = [
      ...this.services.values()
    ].map(client => () => client().list({}));

    return waterfall(listThunks).then(responses => {
      return responses.reduce((allAvailable, res) => {
        allAvailable.available = allAvailable.available.concat(res.available);
        return allAvailable;
      }, {available: []});
    })
  }

  process(request: SimpleRequest): Observable<StreamingResponse> {
    return this.dispatch('process', request);
  }

  protected dispatch(method: 'process',
                     request: SimpleRequest): Observable<StreamingResponse> {
    const key = request.key.split(':')[0];
    return this.services.has(key) ? this.services.get(key)()[method](request) :
      Observable.throw('Invalid key');
  }
}

class ThrottledReducingAggregateService extends AggregateStreamingService {
  constructor() {
    super();
  }

  protected dispatch(method: 'process',
                     request: SimpleRequest): Observable<StreamingResponse> {
    let lastPercentagePoint = 0;
    let shouldClear = false;
    return super.dispatch(method, request)
      .scan((acc, value) => {
        if (shouldClear) {
          acc.features = [];
        }
        return streamingResponseReducer(acc, value);
      })
      .filter(val => {
        const progress = val.progress;
        const percentage =
          100 * (progress.processedBlockCount / progress.totalBlockCount) | 0;
        const pointDifference = (percentage - lastPercentagePoint);
        const shouldEmit = pointDifference === 1 || percentage === 100;
        if (shouldEmit) {
          lastPercentagePoint = percentage;
        }
        shouldClear = shouldEmit;
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
    this.service = new ThrottledReducingAggregateService();
    this.setupImportLibraryListener();
    this.server = new WebWorkerStreamingServer(
      this.workerScope,
      this.service
    );
  }

  private setupImportLibraryListener(): void {

    this.workerScope.onmessage = (ev: MessageEvent) => {
      switch (ev.data.method) {
        case 'addRemoteLibraries': // TODO rename
          const available: AvailableLibraries = ev.data.params;
          const importThunks = Object.keys(available).map(libraryKey => {
            return () => {
              this.remoteLibraries.set(libraryKey, available[libraryKey]);
              return this.import(libraryKey).then(key => {
                return key;
              });
            };
          });
          waterfall(importThunks).then(() => {
            this.service.list({}).then(response => {
              this.workerScope.postMessage({
                method: 'import',
                result: response
              });
            });
          })
      }
    };
  }

  private import(key: LibraryKey): Promise<LibraryKey> { // TODO return type?
    return new Promise((res, rej) => {
      if (this.remoteLibraries.has(key)) {
        // TODO RequireJs can fail... need to reject the promise then
        this.requireJs([this.remoteLibraries.get(key)], (plugin) => {

          const service = () => {
            // TODO a factory with more logic probably belongs in piper-js
            const lib: any | EmscriptenModule = plugin.createLibrary();
            const isEmscriptenModule = typeof lib.cwrap === 'function';
            return new PiperStreamingService(
              isEmscriptenModule ? new PiperVampService(lib) : lib // TODO
            );
          };
          this.service.addService(key, service);
          res(key);
        });
      } else {
        rej('Invalid remote library key');
      }
    });
  }
}
