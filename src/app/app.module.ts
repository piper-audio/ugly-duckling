import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {MailService} from "./mail.service";
import {MaterialModule} from "@angular/material";
import { WaveformComponent } from './waveform/waveform.component';

@NgModule({
  declarations: [
    AppComponent,
    WaveformComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [
    MailService,
    {provide: 'piper-server-uri', useValue: 'ws://not/a/real/path'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
