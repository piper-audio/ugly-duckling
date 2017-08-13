import {Injectable, Inject} from '@angular/core';
import {
  ListResponse
} from 'piper-js/core';
import {
  OneShotExtractionRequest as SimpleRequest,
} from 'piper-js/one-shot';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {
  countingIdProvider,
  WebWorkerStreamingClient,
  RequestId
} from 'piper-js/web-worker';
import {collect, StreamingConfiguration} from 'piper-js/streaming';
import {
  KnownShapedFeature,
  toKnownShape
} from '../../visualisations/FeatureUtilities';
import {NotificationService} from '../notifications/notifications.service';

type RepoUri = string;
export interface AvailableLibraries {
  [libraryKey: string]: RepoUri;
}

export interface Progress {
  id: RequestId;
  value: number; // between 0 and 100, for material-ui
}

export interface ExtractionResult {
  id: RequestId;
  result: KnownShapedFeature;
  unit?: string;
}

@Injectable()
export class FeatureExtractionService {

  private worker: Worker;
  private featuresExtracted: Subject<ExtractionResult>;
  featuresExtracted$: Observable<ExtractionResult>;
  private librariesUpdated: Subject<ListResponse>;
  librariesUpdated$: Observable<ListResponse>;
  private progressUpdated: Subject<Progress>;
  progressUpdated$: Observable<Progress>;
  private client: WebWorkerStreamingClient;

  constructor(private http: Http,
              @Inject('PiperRepoUri') private repositoryUri: RepoUri,
              private notifier: NotificationService) {
    this.worker = new Worker('bootstrap-feature-extraction-worker.js');
    this.featuresExtracted = new Subject<ExtractionResult>();
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

  extract(analysisItemId: string,
          request: SimpleRequest): Promise<ExtractionResult> {
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
      const shaped = toKnownShape({
        features: features,
        outputDescriptor: config.outputDescriptor
      });
      const result = config.outputDescriptor.configured.unit ? {
        id: analysisItemId,
        result: shaped,
        unit: shaped.shape === 'notes' ?
          'MIDI note' : config.outputDescriptor.configured.unit
      } : {
        id: analysisItemId,
        result: shaped
      };
      this.featuresExtracted.next(result);
      return result;
    });
  }

  updateAvailableLibraries(): void {
    this.http.get(this.repositoryUri)
      .toPromise() // just turn into a promise for now to subscribe / execute
      .then(res => {
        this.worker.postMessage({
          method: 'addRemoteLibraries',
          params: res.json()
        });
      })
      .catch(err => this.notifier.displayError(err));
  }

  load(libraryKey: string): void {
    this.worker.postMessage({method: 'import', params: libraryKey});
  }
}
