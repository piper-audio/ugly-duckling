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
import {ListResponse} from 'piper-js/core';
import {Subscription} from 'rxjs/Subscription';
import {HigherLevelFeatureShape} from '../visualisations/FeatureUtilities';

export interface ExtractorOutputInfo {
  extractorKey: string;
  combinedKey: string;
  outputId: string;
  name: string;
  typeUri?: string;
}

interface ExtractorInfo {
  name: string;
  outputs: ExtractorOutputInfo[];
}

const crudeTypeUriMap: {[key: string]: HigherLevelFeatureShape} = {
  'http://purl.org/ontology/af/Beat': 'instants',
  'http://purl.org/ontology/af/Chromagram': 'matrix',
  'http://purl.org/ontology/af/Spectrogram': 'matrix',
  'http://purl.org/ontology/af/KeyChange': 'instants',
  'http://purl.org/ontology/af/OnsetDetectionFunction': 'vector',
  'http://purl.org/ontology/af/Onset': 'instants',
  'http://purl.org/ontology/af/StructuralSegment': 'instants',
  'http://purl.org/ontology/af/TonalOnset': 'instants',
  'http://purl.org/ontology/af/Note': 'notes',
  'http://purl.org/ontology/af/ChordSegment': 'instants',
  'http://purl.org/ontology/af/MusicSegment': 'instants',
  'http://purl.org/ontology/af/Pitch': 'tracks'
};

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
            const maybeTypeInfo = staticData.staticOutputInfo &&
              staticData.staticOutputInfo.get(output.identifier) &&
              staticData.staticOutputInfo.get(output.identifier).typeURI;
            return Object.assign({
                extractorKey: staticData.key,
                combinedKey: combinedKey,
                name: output.name,
                outputId: output.identifier
              },
              maybeTypeInfo ? {typeUri: maybeTypeInfo} : {}
            );
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

  getFeatureIconName(outputInfo: ExtractorOutputInfo): string {
    return {
      vector: 'show_chart',
      matrix: 'grid_on',
      tracks: 'multiline_chart',
      instants: 'view_week',
      notes: 'audiotrack',
    }[crudeTypeUriMap[outputInfo.typeUri]] || 'extension';
  }

  ngOnDestroy(): void {
    this.librariesUpdatedSubscription.unsubscribe();
  }
}
