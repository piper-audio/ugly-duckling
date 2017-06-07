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

export interface ExtractorOutputInfo {
  extractorKey: string;
  combinedKey: string;
  outputId: string;
  name: string;
}

interface ExtractorInfo {
  name: string;
  outputs: ExtractorOutputInfo[];
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
  @Input() onRequestOutput: () => void;

  @Output() requestOutput: EventEmitter<ExtractorOutputInfo>;

  private isDisabled: boolean;
  private populateExtractors: (available: ListResponse) => void;
  extractors: Iterable<ExtractorInfo>;
  private librariesUpdatedSubscription: Subscription;
  private isLoading: boolean;

  constructor(private piperService: FeatureExtractionService) {
    this.extractors = [];
    this.requestOutput = new EventEmitter<ExtractorOutputInfo>();
    this.isDisabled = true;
    this.populateExtractors = available => {
      this.extractors = available.available.reduce((acc, staticData) => {
        const name = staticData.basic.name;
        const outputs: ExtractorOutputInfo[] =
          staticData.basicOutputInfo.map(output => {
            const combinedKey = `${staticData.key}:${output.identifier}`;
            return {
              extractorKey: staticData.key,
              combinedKey: combinedKey,
              name: output.name,
              outputId: output.identifier
            };
          });
        acc.push({name, outputs});
        return acc;
      }, [] as ExtractorInfo[]);
      this.isLoading = false;
    };
  }

  ngOnInit() {
    this.librariesUpdatedSubscription =
      this.piperService.librariesUpdated$.subscribe(this.populateExtractors);
    this.piperService.list().then(this.populateExtractors);
  }

  extract(info: ExtractorOutputInfo): void {
    if (this.onRequestOutput) {
      this.onRequestOutput();
    }
    if (info && !this.disabled) {
      this.requestOutput.emit(info);
    }
  }

  load(): void {
    this.isLoading = true;
    this.piperService.updateAvailableLibraries();
  }

  ngOnDestroy(): void {
    this.librariesUpdatedSubscription.unsubscribe();
  }
}
