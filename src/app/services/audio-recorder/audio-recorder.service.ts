/**
 * Created by lucas on 17/03/2017.
 */
import {Injectable, Inject, NgZone} from "@angular/core";
import {Subject, Observable} from "rxjs";


// seems the TypeScript definitions are not up to date,
// introduce own types for now

export type AudioInputProvider = () => PromiseLike<MediaStream>;

export interface MediaRecorderOptions {
  mimeType?: string;
  audioBitsPerSecond?: number;
  videoBitsPerSecond?: number;
  bitsPerSecond?: number;
}

export type RecordingState = "inactive" | "recording" | "paused";

export interface BlobEvent extends Event {
  readonly data: Blob;
  readonly timecode: number;
}

export interface MediaRecorderErrorEvent extends Event {
  readonly error: DOMException;
}

export interface MediaRecorder {
  readonly mimeType: string;
  readonly state: RecordingState;
  readonly stream: MediaStream;
  ignoreMutedMedia: boolean;
  readonly videoBitsPerSecond: number;
  readonly audioBitsPerSecond: number;
  // isTypeSupported(mimeType: string): boolean;
  pause(): void;
  requestData(): void;
  resume(): void;
  start(timeslice?: number): void;
  stop(): void;
  onstart: (evt: Event) => void;
  onstop: (evt: Event) => void;
  ondataavailable: (evt: BlobEvent) => void;
  onpause: (evt: Event) => void;
  onresume: (evt: Event) => void;
  onerror: (evt: MediaRecorderErrorEvent) => void;
}

export interface MediaRecorderConstructor {
  new(stream: MediaStream,
      options?: MediaRecorderOptions): MediaRecorder;
  isTypeSupported(mimeType: string): boolean;
}

export type RecorderServiceStatus = "disabled" | "enabled" | "recording";

export class ThrowingMediaRecorder implements MediaRecorder {
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

  constructor(stream: MediaStream,
              options?: MediaRecorderOptions) {
    throw "MediaRecorder not available in this browser."
  }

  static isTypeSupported(mimeType: string): boolean {
    return false;
  }

  pause(): void {
  }

  requestData(): void {
  }

  resume(): void {
  }

  start(timeslice: number): void {
  }

  stop(): void {
  }
}

@Injectable()
export class AudioRecorderService {
  private requestProvider: AudioInputProvider;
  private recorderImpl: MediaRecorderConstructor;
  private recorder: MediaRecorder;
  private recordingStateChange: Subject<RecorderServiceStatus>;
  recordingStateChange$: Observable<RecorderServiceStatus>;
  private newRecording: Subject<Blob>;
  newRecording$: Observable<Blob>;
  private isRecordingAble: boolean;
  private isRecording: boolean;
  private chunks: Blob[];

  constructor(@Inject('AudioInputProvider') requestProvider: AudioInputProvider,
              @Inject(
                'MediaRecorderFactory'
              ) recorderImpl: MediaRecorderConstructor,
              private ngZone: NgZone) {
    this.requestProvider = requestProvider;
    this.recorderImpl = recorderImpl;
    this.recordingStateChange = new Subject<RecorderServiceStatus>();
    this.recordingStateChange$ = this.recordingStateChange.asObservable();
    this.newRecording = new Subject<Blob>();
    this.newRecording$ = this.newRecording.asObservable();
    this.isRecordingAble = false;
    this.isRecording = false;
    this.chunks = [];
    this.hasRecordingCapabilities();
  }

  private hasRecordingCapabilities(): void {
    this.requestProvider().then(stream => {
      try {
        this.recorder = new this.recorderImpl(stream);

        this.recorder.ondataavailable = e => this.chunks.push(e.data);
        this.recorder.onstop = () => {
          const blob = new Blob(this.chunks, { 'type': this.recorder.mimeType });
          this.chunks.length = 0;
          this.ngZone.run(() => {
            this.newRecording.next(
              blob
            );
          });
        };
        this.isRecordingAble = true;
        this.recordingStateChange.next("enabled");
      } catch (e) {
        this.isRecordingAble = false;
        this.recordingStateChange.next("disabled"); // don't really need to do this
        console.warn(e); // TODO emit an error message for display?
      }
    }, rejectMessage => {
      this.isRecordingAble = false;
      this.recordingStateChange.next("disabled"); // again, probably not needed
      console.warn(rejectMessage); // TODO something better
    });
  }

  toggleRecording(): void {
    if (!this.isRecordingAble) return;

    if (this.isRecording) {
      this.endRecording();
    } else {
      this.startRecording();
    }
  }

  private startRecording(): void {
    if (this.recorder) {
      this.isRecording = true;
      this.recorder.start();
      this.recordingStateChange.next("recording");
    }
  }

  private endRecording(): void {
    if (this.recorder) {
      this.isRecording = false;
      this.recorder.stop();
      this.chunks.length = 0; // empty the array
      this.recordingStateChange.next("enabled");
    }
  }
}
