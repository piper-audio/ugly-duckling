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
import {AnalysisItem} from "./analysis-item/analysis-item.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  audioBuffer: AudioBuffer; // TODO consider revising
  canExtract: boolean;
  private onAudioDataSubscription: Subscription;
  private analyses: AnalysisItem[]; // TODO some immutable state container describing entire session
  private nRecordings: number; // TODO user control for naming a recording
  private countingId: number; // TODO improve uniquely identifying items
  private rootAudioUri: string;

  constructor(private audioService: AudioPlayerService,
              private piperService: FeatureExtractionService,
              private iconRegistry: MdIconRegistry,
              private sanitizer: DomSanitizer) {
    this.analyses = [];
    this.canExtract = false;
    this.nRecordings = 0;
    this.countingId = 1;

    iconRegistry.addSvgIcon(
      'duck',
      sanitizer.bypassSecurityTrustResourceUrl('assets/duck.svg')
    );

    this.onAudioDataSubscription = this.audioService.audioLoaded$.subscribe(
      resource => {
        const wasError = (resource as AudioResourceError).message != null;
        if (wasError) {
          this.analyses.shift();
          this.canExtract = false;
        } else {
          this.audioBuffer = (resource as AudioResource).samples;
          if (this.audioBuffer) {
            this.canExtract = true;
          }
        }
      }
    );
  }

  onFileOpened(file: File | Blob) {
    this.canExtract = false;
    const url = this.audioService.loadAudio(file);
    this.rootAudioUri = url; // TODO this isn't going to work to id previously loaded files

    // TODO is it safe to assume it is a recording?
    const title = (file instanceof File) ?
      (file as File).name : `Recording ${this.nRecordings++}`;

    if (this.analyses.filter(item => item.title === title).length > 0) {
      // TODO this reveals how brittle the current name / uri based id is
      // need something more robust, and also need to notify the user
      // in a suitable way in the actual event of a duplicate file
      console.warn('There is already a notebook based on this audio file.');
      return;
    }

    // TODO re-ordering of items for display
    // , one alternative is a Angular Pipe / Filter for use in the Template
    this.analyses.unshift({
      rootAudioUri: url,
      hasSharedTimeline: true,
      extractorKey: 'not:real',
      isRoot: true,
      title: title,
      description: new Date().toLocaleString(),
      id: `${this.countingId++}`
    });
  }

  extractFeatures(outputInfo: ExtractorOutputInfo): void {
    if (!this.canExtract || !outputInfo) return;
    this.canExtract = false;

    this.analyses.unshift({
      rootAudioUri: this.rootAudioUri,
      hasSharedTimeline: true,
      extractorKey: outputInfo.combinedKey,
      isRoot: false,
      title: outputInfo.name,
      description: outputInfo.outputId,
      id: `${this.countingId++}`
    });

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
    }).catch(err => {
      this.canExtract = true;
      console.error(err)
    });
  }

  ngOnDestroy(): void {
    this.onAudioDataSubscription.unsubscribe();
  }
}
