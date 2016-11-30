import {Injectable, Inject} from '@angular/core';

@Injectable()
export class AudioPlayerService {

  constructor(@Inject(HTMLAudioElement) private audioElement: HTMLAudioElement /* TODO probably shouldn't play audio this way */,
              @Inject('AudioContext') private audioContext: AudioContext) {
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
    this.audioElement.pause();
    this.audioElement.src = url;
  }

  togglePlaying(): void {
    this.isPlaying() ? this.audioElement.pause() : this.audioElement.play();
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
