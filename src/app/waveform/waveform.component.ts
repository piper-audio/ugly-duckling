import {
  Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, NgZone,
  OnDestroy
} from '@angular/core';
import {AudioPlayerService} from "../services/audio-player/audio-player.service";
import wavesUI from 'waves-ui';
import {FeatureList} from "piper/Feature";
import {FeatureExtractionService} from "../services/feature-extraction/feature-extraction.service";
import {Subscription} from "rxjs";
import {toSeconds} from "piper";

type Timeline = any; // TODO what type actually is it.. start a .d.ts for waves-ui?

@Component({
  selector: 'app-waveform',
  templateUrl: './waveform.component.html',
  styleUrls: ['./waveform.component.css']
})
export class WaveformComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('track') trackDiv: ElementRef;

  private _audioBuffer: AudioBuffer = undefined;
  private timeline: Timeline = undefined;
  private cursorLayer: any = undefined;

  @Input()
  set audioBuffer(buffer: AudioBuffer) {
    this._audioBuffer = buffer || undefined;
    if (this.audioBuffer)
      this.renderWaveform(this.audioBuffer);
  }

  get audioBuffer(): AudioBuffer {
    return this._audioBuffer;
  }

  private featureExtractionSubscription: Subscription;
  private playingStateSubscription: Subscription;
  private seekedSubscription: Subscription;
  private isPlaying: boolean;

  constructor(private audioService: AudioPlayerService,
              private piperService: FeatureExtractionService,
              public ngZone: NgZone) {
    this.isPlaying = false;
    this.featureExtractionSubscription = piperService.featuresExtracted$.subscribe(
      features => {
        this.renderFeatures(features);
      });
    this.playingStateSubscription = audioService.playingStateChange$.subscribe(
      isPlaying => {
        this.isPlaying = isPlaying;
        if (this.isPlaying)
          this.animate();
      });
    this.seekedSubscription = audioService.seeked$.subscribe(() => {
      if (!this.isPlaying)
        this.animate();
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.timeline = this.renderTimeline();
  }

  renderTimeline(duration: number = 1.0): Timeline {
    const track: HTMLElement = this.trackDiv.nativeElement;
    track.innerHTML = "";
    const height: number = track.getBoundingClientRect().height;
    const width: number = track.getBoundingClientRect().width;
    const pixelsPerSecond = width / duration;
    const timeline = new wavesUI.core.Timeline(pixelsPerSecond, width);
    timeline.timeContext.offset = 0.5 * timeline.timeContext.visibleDuration;
    timeline.createTrack(track, height, 'main');

    // time axis
    const timeAxis = new wavesUI.helpers.TimeAxisLayer({
      height: height,
      color: 'gray'
    });

    timeline.addLayer(timeAxis, 'main', 'default', true);
    return timeline;
  }

  renderWaveform(buffer: AudioBuffer): void {
    const height: number = this.trackDiv.nativeElement.getBoundingClientRect().height;
    this.timeline = this.renderTimeline(buffer.duration);
    const waveformLayer = new wavesUI.helpers.WaveformLayer(buffer, {
      top: 10,
      height: height * 0.9,
      color: 'darkblue'
    });
    (this.timeline as any).addLayer(waveformLayer, 'main');

    this.cursorLayer = new wavesUI.helpers.CursorLayer({
      height: height
    });
    this.timeline.addLayer(this.cursorLayer, 'main');
    this.timeline.state = new wavesUI.states.CenteredZoomState(this.timeline);
    this.animate();
  }

  // TODO refactor - this doesn't belong here
  private renderFeatures(features: FeatureList): void {
    const plotData = features.map(feature => {
      return {
        cx: toSeconds(feature.timestamp),
        cy: feature.featureValues[0]
      };
    });
    this.timeline.addLayer(
      new wavesUI.helpers.BreakpointLayer(plotData, {color: 'green'}),
      'main'
    );
  }

  private animate(): void {
    this.ngZone.runOutsideAngular(() => {
      // listen for time passing...
      const updateSeekingCursor = () => {
        const currentTime = this.audioService.getCurrentTime();
        this.cursorLayer.currentPosition = currentTime;
        this.cursorLayer.update();

        const currentOffset = this.timeline.timeContext.offset;
        const offsetTimestamp = currentOffset
          + currentTime;

        const visibleDuration = this.timeline.timeContext.visibleDuration;
        // TODO reduce duplication between directions and make more declarative
        // this kinda logic should also be tested
        const mustPageForward = offsetTimestamp > visibleDuration;
        const mustPageBackward = currentTime < -currentOffset;

        if (mustPageForward) {
          const hasSkippedMultiplePages = offsetTimestamp - visibleDuration > visibleDuration;

          this.timeline.timeContext.offset = hasSkippedMultiplePages
              ? -currentTime +  0.5 * visibleDuration
              :  currentOffset - visibleDuration;
          this.timeline.tracks.update();
        }

        if (mustPageBackward) {
          const hasSkippedMultiplePages = currentTime + visibleDuration < -currentOffset;
          this.timeline.timeContext.offset = hasSkippedMultiplePages
            ? -currentTime + 0.5 * visibleDuration
            : currentOffset + visibleDuration;
          this.timeline.tracks.update();
        }

        if (this.isPlaying)
          requestAnimationFrame(updateSeekingCursor);
      };
      updateSeekingCursor();
    });
  }

  ngOnDestroy(): void {
    this.featureExtractionSubscription.unsubscribe();
    this.playingStateSubscription.unsubscribe();
    this.seekedSubscription.unsubscribe();
  }
}
