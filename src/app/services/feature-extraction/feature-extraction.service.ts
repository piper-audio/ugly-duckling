import { Injectable } from '@angular/core';
import {ListResponse} from "piper";


@Injectable()
export class FeatureExtractionService {

  private worker: Worker;


  constructor() {
    this.worker = new Worker('bootstrap-feature-extraction-worker.js');
  }

  testMessageStream() {
    this.worker.addEventListener('message', ev => console.log(ev.data));
    this.worker.postMessage('anything');
  }

  list(): Promise<ListResponse> {
    return this.request({method: 'list'}, (ev: MessageEvent) => ev.data.available !== undefined);
  }

  private request<Req, Res>(request: Req, predicate: (ev: MessageEvent) => boolean): Promise<Res> {
    return new Promise(res => {
      const listener = (ev: MessageEvent ) => {
        this.worker.removeEventListener('message', listener);
        if (predicate(ev))
          res(ev.data);
      };
      this.worker.addEventListener('message', listener);
      this.worker.postMessage(request);
    });
  }
}
