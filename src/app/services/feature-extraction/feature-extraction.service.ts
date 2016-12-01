import { Injectable } from '@angular/core';

@Injectable()
export class FeatureExtractionService {

  private worker: Worker;

  constructor() {
    this.worker = new Worker('bootstrap-feature-extraction-worker.js');
  }

  testMessageStream() {
    this.worker.postMessage('anything');
    this.worker.onmessage = (ev: MessageEvent) => {
      console.log(ev.data);
    };
  }

}
