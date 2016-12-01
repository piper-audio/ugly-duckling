import {
  Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, NgZone
} from '@angular/core';
import {AudioPlayerService} from "../services/audio-player.service";
import wavesUI from 'waves-ui';

type Timeline = any; // TODO what type actually is it.. start a .d.ts for waves-ui?

@Component({
  selector: 'app-waveform',
  templateUrl: './waveform.component.html',
  styleUrls: ['./waveform.component.css']
})
export class WaveformComponent implements OnInit, AfterViewInit {

  @ViewChild('track') trackDiv: ElementRef;

  private _audioBuffer: AudioBuffer = undefined;

  @Input()
  set audioBuffer(buffer: AudioBuffer) {
    this._audioBuffer = buffer || undefined;
    if (this.audioBuffer)
      this.renderWaveform(this.audioBuffer);
  }

  get audioBuffer(): AudioBuffer {
    return this._audioBuffer;
  }

  constructor(private audioService: AudioPlayerService,
              public ngZone: NgZone) {}
  ngOnInit() {}

  ngAfterViewInit(): void {
    this.renderTimeline();
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
    const timeline: Timeline = this.renderTimeline(buffer.duration);
    const waveformLayer = new wavesUI.helpers.WaveformLayer(buffer, {
      top: 10,
      height: height * 0.9,
      color: 'darkblue'
    });
    (timeline as any).addLayer(waveformLayer, 'main');

    const cursorLayer = new wavesUI.helpers.CursorLayer({
      height: height
    });
    timeline.addLayer(cursorLayer, 'main');
    timeline.state = new wavesUI.states.CenteredZoomState(timeline);
    this.ngZone.runOutsideAngular(() => {
      // listen for time passing...
      // TODO this gets the fans going on large files... worth fixing? or waiting to write a better component?
      // or, can this be updated in a more efficient manner?
      const updateSeekingCursor = () => {
        cursorLayer.currentPosition = this.audioService.getCurrentTime();
        cursorLayer.update();
        if (timeline.timeContext.offset + this.audioService.getCurrentTime() >= timeline.timeContext.visibleDuration) {
          timeline.timeContext.offset -= timeline.timeContext.visibleDuration;
          timeline.tracks.update();
        }
        if (-this.audioService.getCurrentTime() > timeline.timeContext.offset) {
          timeline.timeContext.offset += timeline.timeContext.visibleDuration;
          timeline.tracks.update();
        }
        requestAnimationFrame(updateSeekingCursor);
      };
      updateSeekingCursor();
    });
  }

}
