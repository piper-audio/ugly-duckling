/**
 * Created by lucas on 01/06/2017.
 */
import {
  PlayheadManager,
  PlayheadRenderer,
  VerticalScaleRenderer
} from './waves-base.component';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: PlayheadRenderer, useExisting: VerticalScaleComponent }
  ]
})
export class VerticalScaleComponent implements AfterViewInit, PlayheadRenderer {

  @ContentChildren(
    VerticalScaleRenderer
  ) bounded: QueryList<VerticalScaleRenderer<any>>;
  @ContentChildren(
    PlayheadRenderer
  ) seekable: QueryList<PlayheadRenderer>;
  protected cachedRange: any;

  ngAfterViewInit(): void {
    this.bounded.forEach(component => {
      this.cachedRange = component.range;
      if (this.cachedRange) {
        component.renderScale(this.cachedRange);
      }
    });
  }

  renderPlayhead(initialTime: number, colour: string): PlayheadManager {
    const rendered = this.seekable
      .filter(x => x !== this) // why does QueryList consider itself as a child?
      .map(component => component.renderPlayhead(initialTime, colour));
    return {
      update: (time: number) => {
        rendered.forEach(component => component.update(time));
      },
      remove: () => rendered.map(component => component.remove)
    };
  }
}
