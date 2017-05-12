import {Injectable, Inject} from '@angular/core';
import {
  ListResponse
} from 'piper';
import {
  SimpleRequest,
  SimpleResponse
} from 'piper/HigherLevelUtilities';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import {
  countingIdProvider,
  WebWorkerStreamingClient
} from 'piper/client-stubs/WebWorkerStreamingClient';
import {RequestId} from 'piper/protocols/WebWorkerProtocol';
import {collect, StreamingConfiguration} from 'piper/StreamingService';

type RepoUri = string;
export interface AvailableLibraries {
  [libraryKey: string]: RepoUri;
}

export interface Progress {
  id: RequestId;
  value: number; // between 0 and 100, for material-ui
}

@Injectable()
export class FeatureExtractionService {

  private worker: Worker;
  private featuresExtracted: Subject<SimpleResponse>;
  featuresExtracted$: Observable<SimpleResponse>;
  private librariesUpdated: Subject<ListResponse>;
  librariesUpdated$: Observable<ListResponse>;
  private progressUpdated: Subject<Progress>;
  progressUpdated$: Observable<Progress>;
  private client: WebWorkerStreamingClient;

  constructor(private http: Http,
              @Inject('PiperRepoUri') private repositoryUri: RepoUri) {
    this.worker = new Worker('bootstrap-feature-extraction-worker.js');
    this.featuresExtracted = new Subject<SimpleResponse>();
    this.featuresExtracted$ = this.featuresExtracted.asObservable();
    this.librariesUpdated = new Subject<ListResponse>();
    this.librariesUpdated$ = this.librariesUpdated.asObservable();
    this.progressUpdated = new Subject<Progress>();
    this.progressUpdated$ = this.progressUpdated.asObservable();
    this.worker.addEventListener('message', (ev: MessageEvent) => {
      const isValidResponse = ev.data.method === 'import'
        && ev.data.result && ev.data.result.available ;
      if (isValidResponse) {
        (ev as Event).stopImmediatePropagation();
        this.librariesUpdated.next(ev.data.result);
      }
    }, true);

    this.client = new WebWorkerStreamingClient(
      this.worker,
      countingIdProvider(0)
    );
  }

  list(): Promise<ListResponse> {
    return this.client.list({});
  }

  extract(analysisItemId: string, request: SimpleRequest): Promise<void> {
    let config: StreamingConfiguration;
    return collect(this.client.process(request), val => {
      if (val.configuration) {
        config = val.configuration;
      }
      const progress = val.progress;
      if (progress.totalBlockCount > 0) {
        this.progressUpdated.next({
          id: analysisItemId,
          value: (progress.processedBlockCount / progress.totalBlockCount) * 100
        });
      }
    }).then(features => {
      this.featuresExtracted.next({
        features: features,
        outputDescriptor: config.outputDescriptor
      });
    });
  }

  updateAvailableLibraries(): Observable<AvailableLibraries> {
    return this.http.get(this.repositoryUri)
      .map(res => {
        const map = res.json();
        this.worker.postMessage({
          method: 'addRemoteLibraries',
          params: map
        });
        return map;
      })
      .catch((error: Response | any) => {
        console.error(error);
        return Observable.throw(error);
      });
  }

  load(libraryKey: string): void {
    this.worker.postMessage({method: 'import', params: libraryKey});
  }
}
