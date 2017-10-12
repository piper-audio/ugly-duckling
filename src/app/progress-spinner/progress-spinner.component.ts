/**
 * Created by lucast on 14/03/2017.
 */


import {Component, Input} from '@angular/core';
@Component({
  selector: 'ugly-progress-spinner',
  template: `
    <div class="container" [hidden]="!isVisible">
      <mat-spinner
        class="spinner"
        [attr.color]="'primary'"
        [mode]="isDeterminate ? 'determinate' : 'indeterminate'"
        [value]="currentProcess"
        [diameter]="40"
        [strokeWidth]="3"
      ></mat-spinner>
    </div>
  `,
  styles: [`
    .container {
      height: 50px;
      width: 50px;
      position: absolute;
      left: calc(50% - 25px);
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
