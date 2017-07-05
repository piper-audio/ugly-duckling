/**
 * Created by lucast on 01/06/2017.
 */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  QueryList
} from '@angular/core';
import {
  PlayheadRenderer,
  VerticalValueInspectorRenderer
} from './waves-base.component';
import {VerticalScaleComponent} from './vertical-scale.component';
import {
  RenderLoopService,
  TaskRemover
} from '../services/render-loop/render-loop.service';
import {AudioPlayerService} from '../services/audio-player/audio-player.service';

@Component({
  selector: 'ugly-cross-hair-inspector',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: PlayheadRenderer, useExisting: CrossHairInspectorComponent }
  ]
})
export class CrossHairInspectorComponent extends VerticalScaleComponent
  implements AfterViewInit, OnDestroy {
  @ContentChildren(
    VerticalValueInspectorRenderer
  ) inspectorRenderers: QueryList<VerticalValueInspectorRenderer>;
  @Input() unit: string;
  @Input() set isAnimated(isAnimated: boolean) {
    this.mIsAnimated = isAnimated;
    if (this.removers.length) {
      this.removers.forEach(remove => remove());
      this.removers = [];
    }
    if (isAnimated) {
      this.addTasks();
    }
  }

  private removers: TaskRemover[];
  private mIsAnimated: boolean;

  constructor(private renderLoop: RenderLoopService,
              private player: AudioPlayerService) {
    super();
    this.removers = [];
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.inspectorRenderers.forEach(renderer => {
      renderer.renderInspector(this.cachedRange, this.unit);
      renderer.updatePosition(this.player.getCurrentTime());
    });
    this.addTasks();
  }

  ngOnDestroy(): void {
    this.removers.forEach(remove => remove());
  }

  private addTasks(): void {
    if (this.inspectorRenderers && this.mIsAnimated) {
      this.inspectorRenderers.forEach(renderer => {
        this.removers.push(
          this.renderLoop.addPlayingTask(renderer.updatePosition)
        );
      });
    }
  }
}
