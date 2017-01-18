import {Injectable, Inject} from '@angular/core';
import {
  ListResponse, ListRequest
} from "piper";
import {
  SimpleRequest, SimpleResponse
} from "piper/HigherLevelUtilities";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs";
import {Http, Response} from "@angular/http";

interface RequestMessage<RequestType> {
  method: string;
  params: RequestType;
}

interface ResponseMessage<ResponseType> {
  method: string;
  result: ResponseType;
}

type RepoUri = string;
export interface AvailableLibraries {
  [libraryKey: string]: RepoUri;
}

@Injectable()
export class FeatureExtractionService {

  private worker: Worker;
  private featuresExtracted: Subject<SimpleResponse>;
  featuresExtracted$: Observable<SimpleResponse>;
  private librariesUpdated: Subject<ListResponse>;
  librariesUpdated$: Observable<ListResponse>;

  constructor(private http: Http, @Inject('PiperRepoUri') private repositoryUri: RepoUri) {
    this.worker = new Worker('bootstrap-feature-extraction-worker.js');
    this.featuresExtracted = new Subject<SimpleResponse>();
    this.featuresExtracted$ = this.featuresExtracted.asObservable();
    this.librariesUpdated = new Subject<ListResponse>();
    this.librariesUpdated$ = this.librariesUpdated.asObservable();
    this.worker.addEventListener('message', (ev: MessageEvent) => {
      const isValidResponse = ev.data.method === 'import'
        && ev.data.result.available !== undefined;
      if (isValidResponse) {
        this.librariesUpdated.next(ev.data.result);
      }
    });
  }

  list(): Promise<ListResponse> {
    return this.request<ListRequest, ListResponse>(
      {method: 'list', params: {}},
      (ev: MessageEvent) => ev.data.result.available !== undefined
    ).then(msg => msg.result);
  }

  process(request: SimpleRequest): Promise<SimpleResponse> {
    return this.request<SimpleRequest, SimpleResponse>(
      {method: 'process', params: request},
      (ev: MessageEvent) => ev.data.method === 'process'
    ).then(msg => {
      this.featuresExtracted.next(msg.result);
      return msg.result;
    });
  }

  collect(request: SimpleRequest): Promise<SimpleResponse> {
    return this.request<SimpleRequest, SimpleResponse>(
      {method: 'collect', params: request},
      (ev: MessageEvent) => ev.data.method === 'collect'
    ).then(msg => {
      this.featuresExtracted.next(msg.result);
      return msg.result;
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

  private request<Req, Res>(request: RequestMessage<Req>,
                            predicate: (ev: MessageEvent) => boolean)
  : Promise<ResponseMessage<Res>> {
    return new Promise(res => {
      const listener = (ev: MessageEvent) => {
        this.worker.removeEventListener('message', listener);
        if (predicate(ev))
          res(ev.data);
      };
      this.worker.addEventListener('message', listener);
      this.worker.postMessage(request);
    }).catch(err => console.error(err));
  }
}
