/**
 * Created by lucas on 01/06/2017.
 */
import {VerticalBinNameRenderer} from './waves-base.component';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'ugly-vertical-binned',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalBinnedComponent implements AfterViewInit {

  @ContentChildren(
    VerticalBinNameRenderer
  ) bounded: QueryList<VerticalBinNameRenderer>;
  protected cachedBinNames: string[];

  ngAfterViewInit(): void {
    this.bounded.forEach(component => {
      this.cachedBinNames = component.binNames;
      if (this.cachedBinNames) {
        component.renderNames(this.cachedBinNames);
      }
    });
  }
}
