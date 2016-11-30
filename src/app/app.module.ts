import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MaterialModule } from "@angular/material";
import { WaveformComponent } from './waveform/waveform.component';
import { AudioFileOpenComponent } from './audio-file-open/audio-file-open.component';
import { PlaybackControlComponent } from './playback-control/playback-control.component';
import { AudioPlayerService } from "./services/audio-player.service";

function createAudioContext(): AudioContext {
  return new (
    (window as any).AudioContext
    || (window as any).webkitAudioContext
  )();
}

@NgModule({
  declarations: [
    AppComponent,
    WaveformComponent,
    AudioFileOpenComponent,
    PlaybackControlComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [
    {provide: HTMLAudioElement, useValue: new Audio()}, // TODO use something more generic than HTMLAudioElement
    {provide: 'AudioContext', useValue: createAudioContext()}, // use a string token, Safari doesn't seem to like AudioContext
    AudioPlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
