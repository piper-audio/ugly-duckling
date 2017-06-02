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
import {RenderLoopService} from '../services/render-loop/render-loop.service';

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

  constructor(private renderLoop: RenderLoopService) {
    super();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.inspectorRenderers.forEach(renderer => {
      this.renderLoop.addPlayingTask(renderer.updatePosition);
      renderer.renderInspector(this.cachedRanged, this.unit);
    });
  }
}
