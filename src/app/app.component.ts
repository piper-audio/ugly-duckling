import {Component} from '@angular/core';
import {AudioPlayerService} from "./services/audio-player/audio-player.service";
import {FeatureExtractionService} from "./services/feature-extraction/feature-extraction.service";
import {ExtractorOutputInfo} from "./feature-extraction-menu/feature-extraction-menu.component";
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  audioBuffer: AudioBuffer; // TODO consider revising
  canExtract: boolean;
  isProcessing: boolean;

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
  }

  onFileOpened(file: File) {
    this.canExtract = false;
    this.isProcessing = true;
    const reader: FileReader = new FileReader();
    const mimeType = file.type;
    reader.onload = (event: any) => {
      this.audioService.loadAudioFromUrl(
        URL.createObjectURL(new Blob([event.target.result], {type: mimeType}))
      );
      // TODO use a rxjs/Subject instead?
      this.audioService.decodeAudioData(event.target.result).then(audioBuffer => {
        this.audioBuffer = audioBuffer;
        if (this.audioBuffer) {
          this.canExtract = true;
          this.isProcessing = false;
        }
      });
    };
    reader.readAsArrayBuffer(file);
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
}
