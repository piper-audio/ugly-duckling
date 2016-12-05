import {Component} from '@angular/core';
import {AudioPlayerService} from "./services/audio-player/audio-player.service";
import {FeatureExtractionService} from "./services/feature-extraction/feature-extraction.service";
import {ExtractorOutputInfo} from "./feature-extraction-menu/feature-extraction-menu.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  audioBuffer: AudioBuffer; // TODO consider revising

  constructor(private audioService: AudioPlayerService,
              private piperService: FeatureExtractionService) {}

  onFileOpened(file: File) {
    const reader: FileReader = new FileReader();
    const mimeType = file.type;
    reader.onload = (event: any) => {
      this.audioService.loadAudioFromUrl(
        URL.createObjectURL(new Blob([event.target.result], {type: mimeType}))
      );
      // TODO use a rxjs/Subject instead?
      this.audioService.decodeAudioData(event.target.result).then(audioBuffer => {
        this.audioBuffer = audioBuffer;
      });
    };
    reader.readAsArrayBuffer(file);
  }

  extractFeatures(outputInfo: ExtractorOutputInfo) {
    this.piperService.process({
      audioData: [...Array(this.audioBuffer.numberOfChannels).keys()]
        .map(i => this.audioBuffer.getChannelData(i)),
      audioFormat: {
        sampleRate: this.audioBuffer.sampleRate,
        channelCount: this.audioBuffer.numberOfChannels
      },
      key: outputInfo.extractorKey,
      outputId: outputInfo.outputId
    }).then(data => console.log(data)).catch(err => console.error(err));
  }
}
