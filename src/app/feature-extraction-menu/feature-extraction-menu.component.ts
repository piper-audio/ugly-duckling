import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnDestroy
} from '@angular/core';
import {
  FeatureExtractionService
} from '../services/feature-extraction/feature-extraction.service';
import {ListResponse} from 'piper';
import {Subscription} from 'rxjs/Subscription';
import {MdSelect} from '@angular/material';

export interface ExtractorOutputInfo {
  extractorKey: string;
  combinedKey: string;
  outputId: string;
  name: string;
}

@Component({
  selector: 'ugly-feature-extraction-menu',
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

  private getFirstSelectedItemOrEmpty(select: MdSelect): string {
    const selected = select.selected;
    if (selected) {
      return selected instanceof Array ? selected[0].value : selected.value;
    }
    return '';
  }

  ngOnInit() {
    this.librariesUpdatedSubscription =
      this.piperService.librariesUpdated$.subscribe(this.populateExtractors);
    this.piperService.list().then(this.populateExtractors);
  }

  extract(combinedKey: string): void {
    const info: ExtractorOutputInfo =
      this.extractorsMap.get(combinedKey);
    if (info) {
      this.requestOutput.emit(info);
    }
  }

  load(): void {
    this.piperService.updateAvailableLibraries();
  }

  ngOnDestroy(): void {
    this.librariesUpdatedSubscription.unsubscribe();
  }
}
