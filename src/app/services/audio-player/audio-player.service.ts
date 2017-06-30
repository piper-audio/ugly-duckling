import {Injectable, Inject} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {UrlResourceLifetimeManager} from '../../app.module';

export type ResourceReader = (resource: File | Blob) => Promise<ArrayBuffer>;

export interface AudioResource {
  samples: AudioBuffer;
  url: string;
  mimeType: string;
}

export interface AudioResourceError {
  message: string;
}

export type AudioLoadResponse = AudioResource | AudioResourceError;

@Injectable()
export class AudioPlayerService {

  private currentObjectUrl: string;
  private playingStateChange: Subject<boolean>;
  playingStateChange$: Observable<boolean>;
  private seeked: Subject<number>;
  seeked$: Observable<number>;
  private audioLoaded: Subject<AudioLoadResponse>;
  audioLoaded$: Observable<AudioLoadResponse>;

  constructor(@Inject(HTMLAudioElement) private audioElement: HTMLAudioElement /* TODO probably shouldn't play audio this way */,
              @Inject('AudioContext') private audioContext: AudioContext,
              @Inject('ResourceReader') private readResource: ResourceReader,
              @Inject(
                'UrlResourceLifetimeManager'
              ) private resourceManager: UrlResourceLifetimeManager) {
    this.currentObjectUrl = '';
    this.playingStateChange = new ReplaySubject<boolean>(1);
    this.playingStateChange$ = this.playingStateChange
      .asObservable();

    this.seeked = new Subject<number>();
    this.seeked$ = this.seeked.asObservable();
    this.audioElement.addEventListener('ended', () => {
      this.playingStateChange.next(this.isPlaying());
    });
    this.audioElement.addEventListener('seeked', () => {
      this.seeked.next(this.audioElement.currentTime);
    });
    this.audioLoaded = new Subject<AudioLoadResponse>();
    this.audioLoaded$ = this.audioLoaded.asObservable();
  }

  getCurrentTime(): number {
    return this.audioElement.currentTime;
  }

  isPlaying(): boolean {
    return !this.audioElement.paused;
  }

  loadAudioFromUri(uri: string): void {
    this.currentObjectUrl = uri;
    this.audioElement.pause();
    this.audioElement.src = uri;
    this.audioElement.load();
  }

  loadAudio(resource: File | Blob): string {
    const url: string = this.resourceManager.createUrlToResource(resource);
    this.loadAudioFromUri(url);

    const decode: (buffer: ArrayBuffer) => Promise<AudioBuffer> = buffer => {
      try {
        return this.audioContext.decodeAudioData(buffer) as Promise<AudioBuffer>;
      } catch (e) {
        console.warn('Falling back to callback style decodeAudioData');
        return new Promise(
          (res, rej) => this.audioContext.decodeAudioData(buffer, res, rej)
        );
      }
    };

    this.readResource(resource)
      .then(decode)
      .then(val => {
        this.audioLoaded.next({
          samples: val,
          url: url,
          mimeType: resource.type
        });
      })
      .catch(err => {
        const message = err && err.message ? err.message : 'Read error';
        this.audioLoaded.next({
          message: message
        });
      });
    return url;
  }

  unload(): void {
    this.loadAudioFromUri('');
  }

  togglePlaying(): void {
    if (this.audioElement.readyState >= 2) {
      this.isPlaying() ? this.audioElement.pause() : this.audioElement.play();
      this.playingStateChange.next(this.isPlaying());
    }
  }

  setVolume(value: number): void {
    this.audioElement.volume = value; // TODO check bounds?
  }

  seekTo(seconds: number): void {
    if (seconds < 0) {
      this.audioElement.currentTime = 0;
    } else if (seconds < this.getDuration()) {
      this.audioElement.currentTime = seconds;
    } else {
      this.audioElement.currentTime = this.getDuration();
    }
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
    return this.audioElement.duration || 0;
  }
}
