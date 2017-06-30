import {Component, Inject, OnDestroy} from '@angular/core';
import {
  AudioPlayerService,
  AudioResourceError,
  AudioResource
} from './services/audio-player/audio-player.service';
import {
  ExtractionResult,
  FeatureExtractionService
} from './services/feature-extraction/feature-extraction.service';
import {ExtractorOutputInfo} from './feature-extraction-menu/feature-extraction-menu.component';
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {
  AnalysisItem,
  isPendingAnalysisItem,
  isPendingRootAudioItem,
  isLoadedRootAudioItem,
  Item,
  RootAudioItem,
  LoadedRootAudioItem
} from './analysis-item/AnalysisItem';
import {OnSeekHandler} from './playhead/PlayHeadHelpers';
import {UrlResourceLifetimeManager} from './app.module';
import {createExtractionRequest} from './analysis-item/AnalysisItem';
import {PersistentStack} from './Session';

@Component({
  selector: 'ugly-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  canExtract: boolean;
  private onAudioDataSubscription: Subscription;
  private onProgressUpdated: Subscription;
  private analyses: PersistentStack<Item>; // TODO some immutable state container describing entire session
  private nRecordings: number; // TODO user control for naming a recording
  private countingId: number; // TODO improve uniquely identifying items
  private rootAudioItem: LoadedRootAudioItem;
  private onSeek: OnSeekHandler;

  constructor(private audioService: AudioPlayerService,
              private featureService: FeatureExtractionService,
              private iconRegistry: MdIconRegistry,
              private sanitizer: DomSanitizer,
              @Inject(
                'UrlResourceLifetimeManager'
              ) private resourceManager: UrlResourceLifetimeManager) {
    this.analyses = new PersistentStack<AnalysisItem>();
    this.canExtract = false;
    this.nRecordings = 0;
    this.countingId = 0;
    this.onSeek = (time) => this.audioService.seekTo(time);
    this.rootAudioItem = {} as any; // TODO eugh

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
          this.rootAudioItem.audioData = (resource as AudioResource).samples;
          if (this.rootAudioItem.audioData) {
            this.canExtract = true;
            const currentRootIndex = this.analyses.findIndex(val => {
              return isLoadedRootAudioItem(val) && val.uri === this.rootAudioItem.uri;
            });
            if (currentRootIndex !== -1) {
              this.analyses.set(
                currentRootIndex,
                Object.assign(
                  {},
                  this.analyses.get(currentRootIndex),
                  {audioData: this.rootAudioItem.audioData}
                )
              );
            }
          }
        }
      }
    );
    this.onProgressUpdated = this.featureService.progressUpdated$.subscribe(
      progress => {
        const index = this.analyses.findIndex(val => val.id === progress.id);
        if (index === -1) {
          return;
        }

        this.analyses.set(
          index,
          Object.assign(
            {},
            this.analyses.get(index),
            {progress: progress.value}
          )
        );
      }
    );
  }

  onFileOpened(file: File | Blob, createExportableItem = false) {
    this.canExtract = false;
    const url = this.audioService.loadAudio(file);
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

    const pending = {
      uri: url,
      hasSharedTimeline: true,
      title: title,
      description: new Date().toLocaleString(),
      id: `${++this.countingId}`,
      mimeType: file.type,
      isExportable: createExportableItem
    } as RootAudioItem;
    this.rootAudioItem = pending as LoadedRootAudioItem; // TODO this is silly

    // TODO re-ordering of items for display
    // , one alternative is a Angular Pipe / Filter for use in the Template
    this.analyses.unshift(pending);
  }

  extractFeatures(outputInfo: ExtractorOutputInfo): string {
    if (!this.canExtract || !outputInfo) {
      return;
    }

    this.canExtract = false;

    const placeholderCard: AnalysisItem = {
      parent: this.rootAudioItem,
      hasSharedTimeline: true,
      extractorKey: outputInfo.extractorKey,
      outputId: outputInfo.outputId,
      title: outputInfo.name,
      description: outputInfo.outputId,
      id: `${++this.countingId}`,
      progress: 0
    };
    this.analyses.unshift(placeholderCard);
    this.sendExtractionRequest(placeholderCard);
    return placeholderCard.id;
  }

  removeItem(item: Item): void {
    const indicesToRemove: number[] = this.analyses.reduce(
      (toRemove, current, index) => {
        if (isPendingAnalysisItem(current) && current.parent.id === item.id) {
          toRemove.push(index);
        } else if (item.id === current.id) {
          toRemove.push(index);
        }
        return toRemove;
      }, []);
    this.analyses.remove(...indicesToRemove);
    if (isPendingRootAudioItem(item)) {
      if (this.rootAudioItem.uri === item.uri) {
        this.audioService.unload();
        const topItem = this.analyses.get(0);
        const nullRootAudio: LoadedRootAudioItem = {uri: ''} as any; // TODO eugh

        if (topItem) {
          if (isPendingAnalysisItem(topItem)) {
            this.rootAudioItem = topItem.parent as LoadedRootAudioItem;
          } else if (isPendingRootAudioItem(topItem)) {
            this.rootAudioItem = topItem as LoadedRootAudioItem;
          } else {
           this.rootAudioItem = nullRootAudio;
          }
        } else {
          this.rootAudioItem = nullRootAudio;
        }
        if (this.rootAudioItem) {
          this.audioService.loadAudioFromUri(this.rootAudioItem.uri);
        }
      } else {
        this.resourceManager.revokeUrlToResource(item.uri);
      }
    }
  }

  ngOnDestroy(): void {
    this.onAudioDataSubscription.unsubscribe();
    this.onProgressUpdated.unsubscribe();
  }

  private sendExtractionRequest(analysis: AnalysisItem): Promise<void> {
    const findAndUpdateItem = (result: ExtractionResult): void => {
      // TODO subscribe to the extraction service instead
      const i = this.analyses.findIndex(val => val.id === result.id);
      this.canExtract = true;
      if (i !== -1) {
        this.analyses.set(
          i,
          Object.assign(
            {},
            this.analyses.get(i),
            result.result,
            result.unit ? {unit: result.unit} : {}
          )
        );
      }  // TODO else remove the item?
    };
    return this.featureService.extract(
      analysis.id,
      createExtractionRequest(analysis))
      .then(findAndUpdateItem)
      .catch(err => {
        this.canExtract = true;
        this.analyses.shift();
        console.error(`Error whilst extracting: ${err}`);
      });
  }
}
