import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FeatureExtractionService} from "../services/feature-extraction/feature-extraction.service";

export interface ExtractorOutputInfo {
  extractorKey: string;
  combinedKey: string;
  outputId: string;
  name: string;
}

@Component({
  selector: 'app-feature-extraction-menu',
  templateUrl: './feature-extraction-menu.component.html',
  styleUrls: ['./feature-extraction-menu.component.css']
})
export class FeatureExtractionMenuComponent implements OnInit {

  @Output() requestOutput: EventEmitter<ExtractorOutputInfo>;

  private extractorsMap: Map<string, ExtractorOutputInfo>;
  extractors: Iterable<ExtractorOutputInfo>;

  constructor(private piperService: FeatureExtractionService) {
    this.extractorsMap = new Map();
    this.extractors = [];
    this.requestOutput = new EventEmitter();
  }

  ngOnInit() {
    this.piperService.list().then(available => {
      const maxCharacterLimit = 50;
      available.available.forEach(staticData => {
        const isSingleOutputExtractor = staticData.basicOutputInfo.length === 1;
        staticData.basicOutputInfo.forEach(output => {
          const combinedKey = `${staticData.key}:${output.identifier}`;
          this.extractorsMap.set(combinedKey, {
            extractorKey: staticData.key,
            combinedKey: combinedKey,
            name: (
              isSingleOutputExtractor
                ? staticData.basic.name
                : `${staticData.basic.name}: ${output.name}`
            ).substr(0, maxCharacterLimit) + '...',
            outputId: output.identifier
          });
        });
      });
      this.extractors = [...this.extractorsMap.values()];
    });
  }

  extract(combinedKey: string): void {
    this.requestOutput.emit(this.extractorsMap.get(combinedKey));
  }

}
