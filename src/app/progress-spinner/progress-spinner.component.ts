/**
 * Created by lucast on 14/03/2017.
 */


import {Component, Input} from "@angular/core";
@Component({
  selector: 'ugly-progress-spinner',
  template: `
    <div class="container" [hidden]="!isVisible">
      <md-spinner
        class="spinner"
        color="primary"
      ></md-spinner>
    </div>
  `,
  styles: [`
    .container {
      height: 40px;
      width: 40px;
      position: absolute;
      top: calc(100% - 40px);
      left: calc(100% - 40px);
    }
    
    .spinner {
      width: 100%;
      height: 100%;
    }
  `]
})
export class ProgressSpinnerComponent {
  @Input() isVisible: boolean = true;
}
