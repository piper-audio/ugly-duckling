/**
 * Created by lucas on 24/04/2017.
 */


import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
@Component({
  selector: 'ugly-progress-bar',
  template: `
    <md-progress-bar
      [attr.color]="'primary'"
      [mode]="isDeterminate ? 'determinate' : 'indeterminate'"
      [value]="progress"
    ></md-progress-bar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {
  @Input() isDeterminate: boolean = false;
  @Input() progress: number;
}
