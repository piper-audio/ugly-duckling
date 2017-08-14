import {Component, Inject, OnDestroy} from '@angular/core';
import {
  AudioPlayerService,
  AudioResourceError,
  AudioResource,
  AudioLoadResponse
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
  getRootAudioItem
} from './analysis-item/AnalysisItem';
import {OnSeekHandler} from './playhead/PlayHeadHelpers';
import {UrlResourceLifetimeManager} from './services/File';
import {createExtractionRequest} from './analysis-item/AnalysisItem';
import {PersistentStack} from './Session';
import {NotificationService} from './services/notifications/notifications.service';

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
  private onSeek: OnSeekHandler;

  constructor(private audioService: AudioPlayerService,
              private featureService: FeatureExtractionService,
              private iconRegistry: MdIconRegistry,
              private sanitizer: DomSanitizer,
              @Inject(
                'UrlResourceLifetimeManager'
              ) private resourceManager: UrlResourceLifetimeManager,
              private notifier: NotificationService) {
    this.analyses = new PersistentStack<AnalysisItem>();
    this.canExtract = false;
    this.nRecordings = 0;
    this.countingId = 0;
    this.onSeek = (time) => this.audioService.seekTo(time);

    iconRegistry.addSvgIcon(
      'duck',
      sanitizer.bypassSecurityTrustResourceUrl('assets/duck.svg')
    );

    this.onAudioDataSubscription = this.audioService.audioLoaded$.subscribe(
      resource => {
        const findCurrentAudio =
          val => isPendingRootAudioItem(val) && val.uri === getRootAudioItem(
            this.analyses.get(0)
          ).uri;
        const wasError = (res: AudioLoadResponse):
          res is AudioResourceError => (res as any).message != null;
        if (wasError(resource)) {
          this.notifier.displayError(resource.message);
          this.analyses.findIndexAndUse(
            findCurrentAudio,
            index => this.analyses.remove(index)
          );
          this.canExtract = false;
        } else {
          const audioData = (resource as AudioResource).samples;
          if (audioData) {
            this.canExtract = true;
            this.analyses.findIndexAndUse(
              findCurrentAudio,
              currentRootIndex => this.analyses.set(
                currentRootIndex,
                Object.assign(
                  {},
                  this.analyses.get(currentRootIndex),
                  {audioData}
                )
              ));
          }
        }
      }
    );
    this.onProgressUpdated = this.featureService.progressUpdated$.subscribe(
      progress => {
        this.analyses.findIndexAndUse(
          val => val.id === progress.id,
          index => this.analyses.setMutating(
            index,
            Object.assign(
              {},
              this.analyses.get(index),
              {progress: progress.value}
            )
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

    // TODO re-ordering of items for display
    // , one alternative is a Angular Pipe / Filter for use in the Template
    this.analyses.unshiftMutating(pending);
  }

  extractFeatures(outputInfo: ExtractorOutputInfo): string {
    if (!this.canExtract || !outputInfo) {
      return;
    }

    this.canExtract = false;

    const rootAudio = getRootAudioItem(this.analyses.get(0));

    if (isLoadedRootAudioItem(rootAudio)) {
      const placeholderCard: AnalysisItem = {
        parent: rootAudio,
        hasSharedTimeline: true,
        extractorKey: outputInfo.extractorKey,
        outputId: outputInfo.outputId,
        title: outputInfo.name,
        description: outputInfo.outputId,
        id: `${++this.countingId}`,
        progress: 0
      };
      this.analyses.unshiftMutating(placeholderCard);
      this.sendExtractionRequest(placeholderCard);
      return placeholderCard.id;
    }
    throw new Error('Cannot extract. No audio loaded');
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
  }

  ngOnDestroy(): void {
    this.onAudioDataSubscription.unsubscribe();
    this.onProgressUpdated.unsubscribe();
  }

  private sendExtractionRequest(analysis: AnalysisItem): Promise<void> {
    const findAndUpdateItem = (result: ExtractionResult): void => {
      // TODO subscribe to the extraction service instead
      this.analyses.findIndexAndUse(
        val => val.id === result.id,
        (index) => this.analyses.set(
          index,
          Object.assign(
            {},
            this.analyses.get(index),
            result.result,
            result.unit ? {unit: result.unit} : {}
          )
        )
      );
      this.canExtract = true;
    };
    return this.featureService.extract(
      analysis.id,
      createExtractionRequest(analysis))
      .then(findAndUpdateItem)
      .catch(err => {
        this.canExtract = true;
        this.analyses.findIndexAndUse(
          val => val.id === analysis.id,
          index => this.analyses.remove(index)
        );
        this.notifier.displayError(`Error whilst extracting: ${err}`);
      });
  }
}
