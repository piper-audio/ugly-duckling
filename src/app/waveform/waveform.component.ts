import {
  Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, NgZone,
  OnDestroy
} from '@angular/core';
import {AudioPlayerService} from "../services/audio-player/audio-player.service";
import wavesUI from 'waves-ui';
import {FeatureList} from "piper/Feature";
import {FeatureExtractionService} from "../services/feature-extraction/feature-extraction.service";
import {Subscription} from "rxjs";

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

  constructor(private audioService: AudioPlayerService,
              private piperService: FeatureExtractionService,
              public ngZone: NgZone) {
    this.featureExtractionSubscription = piperService.featuresExtracted$.subscribe(
      features => {
        this.renderFeatures(features);
      });
  }

  ngOnInit() {}

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

    const cursorLayer = new wavesUI.helpers.CursorLayer({
      height: height
    });
    this.timeline.addLayer(cursorLayer, 'main');
    this.timeline.state = new wavesUI.states.CenteredZoomState(this.timeline);
    this.ngZone.runOutsideAngular(() => {
      // listen for time passing...
      // TODO this gets the fans going on large files... worth fixing? or waiting to write a better component?
      // or, can this be updated in a more efficient manner?
      const updateSeekingCursor = () => {
        cursorLayer.currentPosition = this.audioService.getCurrentTime();
        cursorLayer.update();
        if (this.timeline.timeContext.offset + this.audioService.getCurrentTime() >= this.timeline.timeContext.visibleDuration) {
          this.timeline.timeContext.offset -= this.timeline.timeContext.visibleDuration;
          this.timeline.tracks.update();
        }
        if (-this.audioService.getCurrentTime() > this.timeline.timeContext.offset) {
          this.timeline.timeContext.offset += this.timeline.timeContext.visibleDuration;
          this.timeline.tracks.update();
        }
        requestAnimationFrame(updateSeekingCursor);
      };
      updateSeekingCursor();
    });
  }

  // TODO refactor - this doesn't belong here
  private renderFeatures(features: FeatureList): void {
    console.log(features);
  }

  ngOnDestroy(): void {
    this.featureExtractionSubscription.unsubscribe();
  }
}
