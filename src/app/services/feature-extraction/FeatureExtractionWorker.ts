/**
 * Created by lucas on 01/12/2016.
 */

import {PiperVampService, ListRequest, ListResponse, Service} from 'piper';
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

type RequireJs = (libs: string[],
                  callback: (...libs: any[]) => void,
                  errBack: (...failedLibIds: string[]) => void) => void;
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
      try {
        return reducer(response, nextResponse());
      } catch (e) {
        throw new QueuedTaskFailure(runningResponses);
      }
    });
  }, Promise.resolve([]));
}

class QueuedTaskFailure<T> extends Error {
  public previousResponses: Promise<T[]>;

  constructor(previousResponses: Promise<T[]>, message?: string) {
    super(message || 'Queued task failed.');
    this.previousResponses = previousResponses;
  }
}

function flattenListResponses(responses: ListResponse[]): ListResponse {
  return {
    available: responses.reduce(
      (flat, res) => flat.concat(res.available),
      []
    )
  };
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

  list(request: ListRequest): Promise<ListResponse> {
    const listThunks: (() => Promise<ListResponse>)[] = [
      ...this.services.values()
    ].map(createClient => () => createClient().list({}));
    return waterfall(listThunks)
      .then(flattenListResponses);
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
  private server: WebWorkerStreamingServer;
  private service: AggregateStreamingService;

  constructor(workerScope: DedicatedWorkerGlobalScope,
              private requireJs: RequireJs) {
    this.workerScope = workerScope;
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
              return this.downloadRemoteLibrary(
                libraryKey,
                available[libraryKey]
              ).then(createService => {
                this.service.addService(libraryKey,
                  () => new PiperStreamingService(
                    createService()
                  ));
              });
            };
          });
          waterfall(importThunks)
            .then(() => this.service.list({}))
            .then(response => {
              this.workerScope.postMessage({
                method: 'import',
                result: response
              });
            })
            .catch((e) => {
              console.warn(`${e.message}. Try using results so far`);
              e.previousResponses.then(responses => {
                this.workerScope.postMessage({
                  method: 'import',
                  result: flattenListResponses(responses)
                });
              });
            });
      }
    };
  }

  private downloadRemoteLibrary(key: LibraryKey,
                                uri: LibraryUri): Promise<Factory<Service>> {
    return new Promise((res, rej) => {
      this.requireJs([uri], (createModule) => {
        res(() => {
          // TODO a factory with more logic probably belongs in piper-js
          const lib: any | EmscriptenModule = createModule();
          const isEmscriptenModule = typeof lib.cwrap === 'function';
          return isEmscriptenModule ? new PiperVampService(lib) : lib; // TODO
        });
      }, (err) => {
        rej(`Failed to load ${key} remote module.`);
      });
    });
  }
}
