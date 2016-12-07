import {Injectable, Inject} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs";

@Injectable()
export class AudioPlayerService {

  private currentObjectUrl: string;
  private playingStateChange: Subject<boolean>;
  playingStateChange$: Observable<boolean>;
  private seeked: Subject<number>;
  seeked$: Observable<number>;

  constructor(@Inject(HTMLAudioElement) private audioElement: HTMLAudioElement /* TODO probably shouldn't play audio this way */,
              @Inject('AudioContext') private audioContext: AudioContext) {
    this.currentObjectUrl = '';
    this.playingStateChange = new Subject<boolean>();
    this.playingStateChange$ = this.playingStateChange.asObservable();
    this.seeked = new Subject<number>();
    this.seeked$ = this.seeked.asObservable();
    this.audioElement.addEventListener('ended', () => {
      this.playingStateChange.next(this.isPlaying());
    });
    this.audioElement.addEventListener('seeked', () => {
      this.seeked.next(this.audioElement.currentTime);
    });
  }

  getCurrentTime(): number {
    return this.audioElement.currentTime;
  }

  isPlaying(): boolean {
    return !this.audioElement.paused;
  }

  decodeAudioData(buffer: ArrayBuffer): Promise<AudioBuffer> {
    return new Promise((res, rej) => this.audioContext.decodeAudioData(buffer, res, rej));
  }

  loadAudioFromUrl(url: string): void {
    if (this.currentObjectUrl)
      URL.revokeObjectURL(this.currentObjectUrl);
    this.currentObjectUrl = url;
    this.audioElement.pause();
    this.audioElement.src = url;
  }

  togglePlaying(): void {
    this.isPlaying() ? this.audioElement.pause() : this.audioElement.play();
    this.playingStateChange.next(this.isPlaying());
  }

  setVolume(value: number): void {
    this.audioElement.volume = value; // TODO check bounds?
  }

  seekBy(seconds: number): void {
    // TODO some kind of error handling?
    this.audioElement.currentTime += seconds;
  }

  seekToStart(): void {
    this.audioElement.currentTime = 0;
  }

  seekToEnd(): void {
    this.audioElement.currentTime = this.getDuration();
  }

  getDuration(): number {
    return this.audioElement.duration;
  }
}
