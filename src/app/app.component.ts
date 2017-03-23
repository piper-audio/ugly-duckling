import {Component, OnDestroy} from '@angular/core';
import {
  AudioPlayerService,
  AudioResourceError, AudioResource
} from "./services/audio-player/audio-player.service";
import {FeatureExtractionService} from "./services/feature-extraction/feature-extraction.service";
import {ExtractorOutputInfo} from "./feature-extraction-menu/feature-extraction-menu.component";
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  audioBuffer: AudioBuffer; // TODO consider revising
  canExtract: boolean;
  isProcessing: boolean;
  private onAudioDataSubscription: Subscription;

  constructor(private audioService: AudioPlayerService,
              private piperService: FeatureExtractionService,
              private iconRegistry: MdIconRegistry,
              private sanitizer: DomSanitizer) {
    this.canExtract = false;
    this.isProcessing = false;
    iconRegistry.addSvgIcon(
      'duck',
      sanitizer.bypassSecurityTrustResourceUrl('assets/duck.svg')
    );

    this.onAudioDataSubscription = this.audioService.audioLoaded$.subscribe(
      resource => {
        const wasError = (resource as AudioResourceError).message != null;
        if (wasError) {
          this.isProcessing = false;
          this.canExtract = false;
        } else {
          this.audioBuffer = (resource as AudioResource).samples;
          if (this.audioBuffer) {
            this.canExtract = true;
            this.isProcessing = false;
          }
        }
      }
    );
  }

  onFileOpened(file: File | Blob) {
    this.canExtract = false;
    this.isProcessing = true;
    this.audioService.loadAudio(file);
  }

  extractFeatures(outputInfo: ExtractorOutputInfo): void {
    if (!this.canExtract || !outputInfo) return;
    this.canExtract = false;
    this.isProcessing = true;
    this.piperService.collect({
      audioData: [...Array(this.audioBuffer.numberOfChannels).keys()]
        .map(i => this.audioBuffer.getChannelData(i)),
      audioFormat: {
        sampleRate: this.audioBuffer.sampleRate,
        channelCount: this.audioBuffer.numberOfChannels
      },
      key: outputInfo.extractorKey,
      outputId: outputInfo.outputId
    }).then(() => {
      this.canExtract = true;
      this.isProcessing = false;
    }).catch(err => {
      this.canExtract = true;
      this.isProcessing = false;
      console.error(err)
    });
  }

  ngOnDestroy(): void {
    this.onAudioDataSubscription.unsubscribe();
  }
}
