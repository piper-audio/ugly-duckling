import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MaterialModule } from "@angular/material";
import { WaveformComponent } from './waveform/waveform.component';
import { AudioFileOpenComponent } from './audio-file-open/audio-file-open.component';
import { PlaybackControlComponent } from './playback-control/playback-control.component';
import { AudioPlayerService } from "./services/audio-player/audio-player.service";
import { FeatureExtractionService } from "./services/feature-extraction/feature-extraction.service";
import { FeatureExtractionMenuComponent } from "./feature-extraction-menu/feature-extraction-menu.component";
import { ProgressSpinnerComponent } from "./progress-spinner/progress-spinner.component";
import {
  AudioRecorderService,
  AudioInputProvider,
  MediaRecorderConstructor,
  MediaRecorder as IMediaRecorder,
  MediaRecorderOptions,
  ThrowingMediaRecorder,
} from "./services/audio-recorder/audio-recorder.service";
import {RecordingControlComponent} from "./recording-control/recording-control.component";

export function createAudioContext(): AudioContext {
  return new (
    (window as any).AudioContext
    || (window as any).webkitAudioContext
  )();
}

export function createAudioElement(): HTMLAudioElement {
  return new Audio();
}

export function createAudioInputProvider(): AudioInputProvider {
  if (navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === 'function') {
    return () => navigator.mediaDevices.getUserMedia(
      {audio: true, video: false}
    );
  } else {
    return () => Promise.reject('Recording is not supported in this browser.');
  }
}

declare const MediaRecorder: {
  prototype: IMediaRecorder;
  new(stream: MediaStream,
      options?: MediaRecorderOptions): IMediaRecorder;
  isTypeSupported(mimeType: string): boolean;
};

export function createMediaRecorderFactory(): MediaRecorderConstructor {
  if (typeof MediaRecorder !== 'undefined') {
    return MediaRecorder;
  } else {
    return ThrowingMediaRecorder;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    WaveformComponent,
    AudioFileOpenComponent,
    PlaybackControlComponent,
    RecordingControlComponent,
    FeatureExtractionMenuComponent,
    ProgressSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [
    {provide: HTMLAudioElement, useFactory: createAudioElement}, // TODO use something more generic than HTMLAudioElement
    {provide: 'AudioContext', useFactory: createAudioContext}, // use a string token, Safari doesn't seem to like AudioContext
    AudioPlayerService,
    {provide: 'AudioInputProvider', useFactory: createAudioInputProvider},
    AudioRecorderService,
    FeatureExtractionService,
    {provide: 'MediaRecorderFactory', useFactory: createMediaRecorderFactory},
    {provide: 'PiperRepoUri', useValue: 'assets/remote-plugins.json'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
