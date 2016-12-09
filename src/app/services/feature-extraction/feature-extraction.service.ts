import {Injectable} from '@angular/core';
import {
  ListResponse, ListRequest
} from "piper";
import {SimpleRequest, FeatureCollection} from "piper/HigherLevelUtilities";
import {FeatureList} from "piper/Feature";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs";

interface RequestMessage<RequestType> {
  method: string;
  params: RequestType;
}

interface ResponseMessage<ResponseType> {
  method: string;
  result: ResponseType;
}

export type Extracted = FeatureList | FeatureCollection;

@Injectable()
export class FeatureExtractionService {

  private worker: Worker;
  private featuresExtracted: Subject<Extracted>;
  featuresExtracted$: Observable<Extracted>;

  constructor() {
    this.worker = new Worker('bootstrap-feature-extraction-worker.js');
    this.featuresExtracted = new Subject<Extracted>();
    this.featuresExtracted$ = this.featuresExtracted.asObservable();
  }

  list(): Promise<ListResponse> {
    return this.request<ListRequest, ListResponse>(
      {method: 'list', params: {}},
      (ev: MessageEvent) => ev.data.result.available !== undefined
    ).then(msg => msg.result);
  }

  process(request: SimpleRequest): Promise<FeatureList> {
    return this.request<SimpleRequest, FeatureList>(
      {method: 'process', params: request},
      (ev: MessageEvent) => ev.data.method === 'process'
    ).then(msg => {
      this.featuresExtracted.next(msg.result);
      return msg.result;
    });
  }

  collect(request: SimpleRequest): Promise<FeatureCollection> {
    return this.request<SimpleRequest, FeatureCollection>(
      {method: 'collect', params: request},
      (ev: MessageEvent) => ev.data.method === 'collect'
    ).then(msg => {
      this.featuresExtracted.next(msg.result);
      return msg.result;
    });
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
