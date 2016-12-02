/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FeatureExtractionService } from './feature-extraction.service';

describe('FeatureExtractionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeatureExtractionService]
    });
  });

  it('should ...', inject([FeatureExtractionService], (service: FeatureExtractionService) => {
    expect(service).toBeTruthy();
  }));
});
