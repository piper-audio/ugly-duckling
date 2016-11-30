/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AudioPlayerService } from './audio-player.service';

describe('AudioPlayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AudioPlayerService]
    });
  });

  it('should ...', inject([AudioPlayerService], (service: AudioPlayerService) => {
    expect(service).toBeTruthy();
  }));
});
