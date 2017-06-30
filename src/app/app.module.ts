import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WaveformComponent } from './visualisations/waveform/waveform.component';
import { AudioFileOpenComponent } from './audio-file-open/audio-file-open.component';
import { PlaybackControlComponent } from './playback-control/playback-control.component';
import {
  AudioPlayerService,
  UrlResourceLifetimeManager,
  ResourceReader
} from './services/audio-player/audio-player.service';
import { FeatureExtractionService } from './services/feature-extraction/feature-extraction.service';
import { FeatureExtractionMenuComponent } from './feature-extraction-menu/feature-extraction-menu.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import {
  AudioRecorderService,
  AudioInputProvider,
  MediaRecorderConstructor,
  MediaRecorder as IMediaRecorder,
  MediaRecorderOptions
} from './services/audio-recorder/audio-recorder.service';
import {RecordingControlComponent} from './recording-control/recording-control.component';
import {NotebookFeedComponent} from './notebook-feed/notebook-feed.component';
import {AnalysisItemComponent} from './analysis-item/analysis-item.component';
import {ProgressBarComponent} from './progress-bar/progress-bar';
import {UglyMaterialModule} from './ugly-material.module';
import {Observable} from 'rxjs/Observable';
import {PlayHeadComponent} from './playhead/playhead.component';
import {LivePlayHeadComponent} from './playhead/live-play-head.component';
import {CurveComponent} from './visualisations/curve/curve.component';
import {TracksComponent} from './visualisations/tracks/tracks.components';
import {NotesComponent} from './visualisations/notes/notes.component';
import {InstantsComponent} from './visualisations/instants/instants.component';
import {GridComponent} from './visualisations/grid/grid.component';
import {VerticalScaleComponent} from './visualisations/vertical-scale.component';
import {VerticalBinnedComponent} from './visualisations/vertical-binned.component';
import {CrossHairInspectorComponent} from './visualisations/cross-hair-inspector.component';
import {RenderLoopService} from './services/render-loop/render-loop.service';
import {WavesPlayHeadComponent} from './playhead/waves-ui-play-head.component';
import {
  ActionTrayComponent
} from './actions/action-tray.component';
import {RecordRtcMediaRecorder} from './services/audio-recorder/RecordRtcMediaRecorder';

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
    return RecordRtcMediaRecorder;
  }
}

export function createUrlResourceManager(): UrlResourceLifetimeManager {
  return {
    createUrlToResource: (resource: File | Blob): string => {
      return URL.createObjectURL(resource);
    },
    revokeUrlToResource: (url: string) => {
      URL.revokeObjectURL(url);
    }
  };
}

export function createResourceReader(): ResourceReader {
  return (resource) => {
    return new Promise((res, rej) => {
      const reader: FileReader = new FileReader();
      reader.onload = (event: any) => {
        res(event.target.result);
      };
      reader.onerror = (event) => {
        rej(event.message);
      };
      reader.readAsArrayBuffer(resource);
    });
  };
}

export interface Dimension {
  width: number;
  height: number;
}
export function createWindowDimensionObservable(): Observable<Dimension> {
  return Observable.fromEvent(window, 'resize', () => ({
    height: window.innerHeight,
    width: window.innerWidth
  })).share();
}
@NgModule({
  declarations: [
    AppComponent,
    WaveformComponent,
    AudioFileOpenComponent,
    PlaybackControlComponent,
    RecordingControlComponent,
    FeatureExtractionMenuComponent,
    ProgressSpinnerComponent,
    AnalysisItemComponent,
    NotebookFeedComponent,
    ProgressBarComponent,
    PlayHeadComponent,
    LivePlayHeadComponent,
    CurveComponent,
    TracksComponent,
    NotesComponent,
    InstantsComponent,
    GridComponent,
    VerticalScaleComponent,
    VerticalBinnedComponent,
    CrossHairInspectorComponent,
    WavesPlayHeadComponent,
    ActionTrayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    UglyMaterialModule
  ],
  providers: [
    {provide: HTMLAudioElement, useFactory: createAudioElement}, // TODO use something more generic than HTMLAudioElement
    {provide: 'AudioContext', useFactory: createAudioContext}, // use a string token, Safari doesn't seem to like AudioContext
    AudioPlayerService,
    {provide: 'AudioInputProvider', useFactory: createAudioInputProvider},
    AudioRecorderService,
    FeatureExtractionService,
    {provide: 'MediaRecorderFactory', useFactory: createMediaRecorderFactory},
    {provide: 'PiperRepoUri', useValue: 'assets/remote-extractors.json'},
    {provide: 'UrlResourceLifetimeManager', useFactory: createUrlResourceManager},
    {provide: 'ResourceReader', useFactory: createResourceReader},
    {provide: 'DimensionObservable', useFactory: createWindowDimensionObservable},
    RenderLoopService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
