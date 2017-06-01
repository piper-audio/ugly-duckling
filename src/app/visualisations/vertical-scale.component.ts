/**
 * Created by lucas on 01/06/2017.
 */
import {VerticallyBounded} from "./waves-base.component";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  AfterViewInit
} from "@angular/core";

@Component({
  selector: 'ugly-vertical-scale',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalScaleComponent implements AfterViewInit {

  @ContentChildren(VerticallyBounded) bounded: QueryList<VerticallyBounded>;

  ngAfterViewInit(): void {
    this.bounded.forEach(component => {
      const range = component.range;
      if (range) {
        component.renderScale(range);
      }
    });
  }
}
