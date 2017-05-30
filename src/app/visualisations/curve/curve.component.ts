/**
 * Created by lucas on 30/05/2017.
 */
import {WavesComponent} from "../waves-base.component";
import {ChangeDetectionStrategy, Component} from "@angular/core";

@Component({
  selector: 'ugly-curve',
  // templateUrl: '../waves-template.html',
  template: `<div #track class="track"><span>Curve</span></div>`,
  styleUrls: ['../waves-template.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurveComponent extends WavesComponent {

}
