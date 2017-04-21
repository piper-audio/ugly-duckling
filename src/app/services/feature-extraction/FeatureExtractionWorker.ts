/**
 * Created by lucas on 01/12/2016.
 */

import {PiperVampService, ListRequest, ListResponse} from 'piper';
import {
  SimpleRequest
} from 'piper/HigherLevelUtilities';
import { VampExamplePlugins } from 'piper/ext/VampExamplePluginsModule';
import {AvailableLibraries} from "./feature-extraction.service";
import {
  DedicatedWorkerGlobalScope,
  WebWorkerStreamingServer
} from "piper/servers/WebWorkerStreamingServer";
import {
  PiperStreamingService,
  StreamingResponse,
  StreamingService
} from "piper/StreamingService";
import {Observable} from "rxjs/Observable";


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
    return undefined;
  }

  collect(request: SimpleRequest): Observable<StreamingResponse> {
    const key = request.key.split(':')[0];
    return this.services.has(key) ?
      this.services.get(key).collect(request) : Observable.throw("Invalid key");
  }
}

export default class FeatureExtractionWorker {
  private workerScope: DedicatedWorkerGlobalScope;
  private services: Map<LibraryKey, PiperStreamingService>;
  private remoteLibraries: Map<LibraryKey, LibraryUri>;
  private server: WebWorkerStreamingServer;
  private service: AggregateStreamingService;

  constructor(workerScope: DedicatedWorkerGlobalScope,
              private requireJs: RequireJs) {
    this.workerScope = workerScope;
    this.services = new Map<LibraryKey, PiperStreamingService>();
    this.remoteLibraries = new Map<LibraryKey, LibraryUri>();
    this.service = new AggregateStreamingService();
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
              this.services.set(
                key,
                new PiperStreamingService(
                  new PiperVampService(plugin.createLibrary())
                )
              ); // TODO won't always be an emscripten module
              this.service.addService(key, this.services.get(key));
              this.service.list({}).then(sendResponse);
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
}
