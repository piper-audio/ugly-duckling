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
type Layer = any;
type Track = any;

@Component({
  selector: 'app-waveform',
  templateUrl: './waveform.component.html',
  styleUrls: ['./waveform.component.css']
})
export class WaveformComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('track') trackDiv: ElementRef;

  private _audioBuffer: AudioBuffer;
  private timeline: Timeline;
  private cursorLayer: any;
  private disposableLayers: Layer[];

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
    this.disposableLayers = [];
    this._audioBuffer = undefined;
    this.timeline = undefined;
    this.cursorLayer = undefined;
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
    return timeline;
  }

  renderWaveform(buffer: AudioBuffer): void {
    const height: number = this.trackDiv.nativeElement.getBoundingClientRect().height;
    const mainTrack = this.timeline.getTrackById('main');
    if (this.timeline) {
      // resize
      const width = this.trackDiv.nativeElement.getBoundingClientRect().width;
      // loop through layers and remove them, waves-ui provides methods for this but it seems to not work properly
      for (let i = 0; i < this.disposableLayers.length; ++i) {
        let layer = this.disposableLayers.pop();
        mainTrack.remove(layer);
        layer.destroy();
      }
      this.timeline.visibleWidth = width;
      this.timeline.pixelsPerSecond = width / buffer.duration;
      mainTrack.height = height;
    } else {
      this.timeline = this.renderTimeline(buffer.duration)
    }
    // time axis
    const timeAxis = new wavesUI.helpers.TimeAxisLayer({
      height: height,
      color: 'gray'
    });
    this.addLayer(timeAxis, mainTrack, this.timeline.timeContext, true);

    const waveformLayer = new wavesUI.helpers.WaveformLayer(buffer, {
      top: 10,
      height: height * 0.9,
      color: 'darkblue'
    });
    this.addLayer(waveformLayer, mainTrack, this.timeline.timeContext);

    this.cursorLayer = new wavesUI.helpers.CursorLayer({
      height: height
    });
    this.addLayer(this.cursorLayer, mainTrack, this.timeline.timeContext);
    this.timeline.state = new wavesUI.states.CenteredZoomState(this.timeline);
    mainTrack.render();
    mainTrack.update();
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
    this.addLayer(
      new wavesUI.helpers.BreakpointLayer(plotData, {color: 'green'}),
      this.timeline.getTrackById('main'),
      this.timeline.timeContext
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

  private addLayer(layer: Layer, track: Track, timeContext: any, isAxis: boolean = false): void {
    timeContext.zoom = 1.0;
    if (!layer.timeContext) {
      layer.setTimeContext(isAxis ?
        timeContext : new wavesUI.core.LayerTimeContext(timeContext));
    }
    this.disposableLayers.push(layer);
    track.add(layer);
    layer.render();
    layer.update();
  }

  ngOnDestroy(): void {
    this.featureExtractionSubscription.unsubscribe();
    this.playingStateSubscription.unsubscribe();
    this.seekedSubscription.unsubscribe();
  }
}
