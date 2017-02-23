import {
  Component, OnInit, Output, EventEmitter, Input,
  OnDestroy
} from '@angular/core';
import {FeatureExtractionService} from "../services/feature-extraction/feature-extraction.service";
import {ListResponse} from "piper";
import {Subscription} from "rxjs";

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
export class FeatureExtractionMenuComponent implements OnInit, OnDestroy {

  @Input()
  set disabled(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  get disabled() {
    return this.isDisabled;
  }

  @Output() requestOutput: EventEmitter<ExtractorOutputInfo>;

  private isDisabled: boolean;
  private extractorsMap: Map<string, ExtractorOutputInfo>;
  private populateExtractors: (available: ListResponse) => void;
  extractors: Iterable<ExtractorOutputInfo>;
  private librariesUpdatedSubscription: Subscription;

  constructor(private piperService: FeatureExtractionService) {
    this.extractorsMap = new Map();
    this.extractors = [];
    this.requestOutput = new EventEmitter<ExtractorOutputInfo>();
    this.isDisabled = true;
    this.populateExtractors = available => {
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
    };
  }

  ngOnInit() {
    this.piperService.list().then(this.populateExtractors);
    this.librariesUpdatedSubscription = this.piperService.librariesUpdated$.subscribe(this.populateExtractors);
  }

  extract(combinedKey: string): void {
    this.requestOutput.emit(this.extractorsMap.get(combinedKey));
  }

  load(): void {
    this.piperService.updateAvailableLibraries().subscribe(res => {
      Object.keys(res).forEach(key => this.piperService.load(key));
    });
  }

  ngOnDestroy(): void {
    this.librariesUpdatedSubscription.unsubscribe();
  }
}