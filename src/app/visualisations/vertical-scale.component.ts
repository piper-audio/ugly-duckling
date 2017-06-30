/**
 * Created by lucas on 01/06/2017.
 */
import {VerticalScaleRenderer} from './waves-base.component';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'ugly-vertical-scale',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalScaleComponent implements AfterViewInit {

  @ContentChildren(
    VerticalScaleRenderer
  ) bounded: QueryList<VerticalScaleRenderer>;
  protected cachedRange: [number, number];

  ngAfterViewInit(): void {
    this.bounded.forEach(component => {
      this.cachedRange = component.range;
      if (this.cachedRange) {
        component.renderScale(this.cachedRange);
      }
    });
  }
}
