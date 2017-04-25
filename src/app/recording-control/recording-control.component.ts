/**
 * Created by lucas on 17/03/2017.
 */

import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import {
  AudioRecorderService,
  RecorderServiceStatus
} from '../services/audio-recorder/audio-recorder.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'ugly-recording-control',
  templateUrl: './recording-control.component.html'
})
export class RecordingControlComponent implements OnInit, OnDestroy {
  private recordingState: Subscription;
  private newRecording: Subscription;
  recordingStatus: RecorderServiceStatus;
  @Output() finishedRecording: EventEmitter<Blob>;

  constructor(private recordingService: AudioRecorderService) {
    this.recordingStatus = 'disabled';
    this.finishedRecording = new EventEmitter<Blob>();
  }

  ngOnInit(): void {
    this.recordingState = this.recordingService.recordingStateChange$.subscribe(
      (status: RecorderServiceStatus) => {
        this.recordingStatus = status;
      }
    );
    this.newRecording = this.recordingService.newRecording$.subscribe(
      (recordingBlob: Blob) => {
        this.finishedRecording.emit(recordingBlob);
      }
    );
  }

  ngOnDestroy(): void {
    this.recordingState.unsubscribe();
    this.newRecording.unsubscribe();
  }

   emitToggleRecording() {
     this.recordingService.toggleRecording();
   }
}
