/**
 * Created by lucast on 26/06/2017.
 */
import {
  BlobEvent as IBlobEvent,
  MediaRecorder,
  MediaRecorderErrorEvent,
  RecordingState
} from './audio-recorder.service';
import * as RecordRtc from 'recordrtc';

// safari doesn't implement BlobEvent... this should do
class BlobEvent extends Event implements IBlobEvent {
  data: Blob;

  constructor(data: Blob) {
    super('blob');
    this.data = data;
  }
}

export class RecordRtcMediaRecorder implements MediaRecorder {
  mimeType: string;
  state: RecordingState;
  stream: MediaStream;
  ignoreMutedMedia: boolean;
  videoBitsPerSecond: number;
  audioBitsPerSecond: number;
  onstart: (evt: Event) => void;
  onstop: (evt: Event) => void;
  ondataavailable: (evt: BlobEvent) => void;
  onpause: (evt: Event) => void;
  onresume: (evt: Event) => void;
  onerror: (evt: MediaRecorderErrorEvent) => void;

  private recorder: any; // TODO RecordRTC typings?

  static isTypeSupported(mimeType: string): boolean {
    return mimeType === 'audio/wav';
  }

  constructor(stream: MediaStream) {
    this.state = 'inactive';
    this.stream = stream;
    this.recorder = RecordRtc(stream, {
      type: 'audio',
      recorderType: RecordRtc.StereoAudioRecorder
    });
  }


  pause(): void {
    this.state = 'paused';
    this.recorder.pauseRecording();
  }

  requestData(): void {
    // could probably implement this, but it isn't actually used in the app
    throw new Error('Not implemented');
  }

  resume(): void {
    this.state = 'recording';
    this.recorder.resumeRecording();
  }

  start(timeslice?: number): void {
    this.state = 'recording';
    this.recorder.startRecording();
  }

  stop(): void {
    this.state = 'inactive';
    this.recorder.stopRecording(() => {
      if (this.ondataavailable) {
        const blob = this.recorder.getBlob();
        this.mimeType = blob.type;
        this.ondataavailable(new BlobEvent(blob));
      }
      if (this.onstop) {
        this.onstop(new Event('stop'));
      }
    });
  }
}
