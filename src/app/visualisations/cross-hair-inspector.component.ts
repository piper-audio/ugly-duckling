/**
 * Created by lucast on 01/06/2017.
 */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList
} from '@angular/core';
import {
  VerticalValueInspectorRenderer
} from './waves-base.component';
import {VerticalScaleComponent} from './vertical-scale.component';
import {
  RenderLoopService,
  TaskRemover
} from '../services/render-loop/render-loop.service';

@Component({
  selector: 'ugly-cross-hair-inspector',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrossHairInspectorComponent extends VerticalScaleComponent
  implements AfterViewInit {
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

  constructor(private renderLoop: RenderLoopService) {
    super();
    this.removers = [];
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.inspectorRenderers.forEach(renderer => {
      renderer.renderInspector(this.cachedRange, this.unit);
    });
    this.addTasks();
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
