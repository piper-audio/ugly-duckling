/**
 * Created by lucas on 03/06/2017.
 */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input, OnDestroy,
  QueryList
} from '@angular/core';
import {
  LayerRemover, PlayheadRenderer,
  WavesComponent
} from '../visualisations/waves-base.component';
import Waves from 'waves-ui-piper';
import {
  RenderLoopService,
  TaskRemover
} from '../services/render-loop/render-loop.service';
import {AudioPlayerService} from '../services/audio-player/audio-player.service';

@Component({
  selector: 'ugly-waves-play-head',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WavesPlayHeadComponent implements AfterViewInit, OnDestroy {

  @ContentChildren(PlayheadRenderer) wavesChildren: QueryList<PlayheadRenderer>;
  @Input() colour: string;
  @Input() set isActive(isActive: boolean) {
    this.mIsActive = isActive;
    this.removeAllActivePlayheads();
    if (isActive) {
      this.setupAnimatedPlayheads();
    }
  }

  private removers: (TaskRemover | LayerRemover)[];
  private mIsActive: boolean;

  constructor(private renderLoop: RenderLoopService,
              private player: AudioPlayerService) {
    this.removers = [];
  }


  ngAfterViewInit(): void {
    this.removeAllActivePlayheads();
    this.setupAnimatedPlayheads();
  }

  ngOnDestroy(): void {
    this.removeAllActivePlayheads();
  }

  private removeAllActivePlayheads(): void {
    this.removers.forEach(remove => remove());
    this.removers = [];
  }

  private setupAnimatedPlayheads(): void {
    if (this.wavesChildren && this.mIsActive) {
      this.wavesChildren.forEach(component => {
        const cursor = component.renderPlayhead(
          this.player.getCurrentTime(),
          this.colour
        );
        this.removers.push(
          cursor.remove,
          this.renderLoop.addPlayingTask(cursor.update)
        );
      });
    }
  }
}
