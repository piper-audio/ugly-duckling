/**
 * Created by lucast on 23/05/2017.
 */
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';
import {
  AudioPlayerService
} from '../services/audio-player/audio-player.service';
import {TimePixelMapper} from './PlayHeadHelpers';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'ugly-live-play-head',
  template: `<ugly-play-head
    [currentTime]="currentTime"
    [timeToPixel]="timeToPixel"
    [colour]="colour"></ugly-play-head>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LivePlayHeadComponent implements AfterViewInit, OnDestroy {
  @Input() timeToPixel: TimePixelMapper;
  @Input() colour: string;
  private playingStateSubscription: Subscription;
  private seekedSubscription: Subscription;
  private currentTime = 0;

  constructor(private player: AudioPlayerService,
              private ref: ChangeDetectorRef,
              private zone: NgZone) {}

  ngAfterViewInit(): void {
    this.seekedSubscription = this.player.seeked$.subscribe(() => {
      if (!this.player.isPlaying()) {
        this.animate();
      }
    });
    this.playingStateSubscription = this.player.playingStateChange$.subscribe(
      isPlaying => {
        if (isPlaying) {
          this.animate();
        }
      });
  }

  animate(): void {
    this.zone.runOutsideAngular(() => {
      const animateNextFrame = () => {
        this.currentTime = this.player.getCurrentTime();
        this.ref.markForCheck();
        if (this.player.isPlaying()) {
          requestAnimationFrame(animateNextFrame);
        }
      };
      requestAnimationFrame(animateNextFrame);
    });
  }

  ngOnDestroy(): void {
    this.playingStateSubscription.unsubscribe();
    this.seekedSubscription.unsubscribe();
  }
}
