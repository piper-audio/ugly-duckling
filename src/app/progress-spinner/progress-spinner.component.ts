/**
 * Created by lucast on 14/03/2017.
 */


import {Component, Input} from '@angular/core';
@Component({
  selector: 'ugly-progress-spinner',
  template: `
    <div class="container" [hidden]="!isVisible">
      <md-spinner
        class="spinner"
        [attr.color]="'primary'"
        [mode]="isDeterminate ? 'determinate' : 'indeterminate'"
        [value]="currentProcess"
      ></md-spinner>
    </div>
  `,
  styles: [`
    .container {
      height: 40px;
      width: 40px;
      position: absolute;
      top: calc(50% - 20px);
      left: calc(50% - 20px);
    }

    .spinner {
      width: 100%;
      height: 100%;
    }
  `]
})
export class ProgressSpinnerComponent {
  private currentProcess = 0;

  @Input() isVisible = true;
  @Input() isDeterminate = false;
  @Input()
  set progress(value: number) {
    if (value < 0) {
      this.currentProcess = 0;
    } else if (value > 100) {
      this.currentProcess = 100;
    } else {
      this.currentProcess = value;
    }
  }
}
