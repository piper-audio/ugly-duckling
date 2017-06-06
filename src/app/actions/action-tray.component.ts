/**
 * Created by lucast on 06/06/2017.
 */
import {Component, Input} from '@angular/core';
import {
  animate, keyframes, state, style, transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'ugly-action-tray',
  template: `<div
    class="tray"
    [@visibility]="visibility"
  ><ng-content></ng-content></div>`,
  styles: [
    `.tray {
      background: white;
      height: calc(100vh - 64px);
      width: 100%;
      position: absolute;
      z-index: 100;
      overflow: hidden;
    }`
  ],
  animations: [
    trigger('visibility', [
      state('show', style({
        height: 'calc(100vh - 64px)',
        overflow: 'scroll'
      })),
      state('hide', style({
        height: 0,
        overflow: 'hidden',
      })),
      transition('hide => show', [
        animate(300, keyframes([
          style({height: 0, offset: 0}),
          style({height: 'calc(100vh - 64px)',  offset: 1.0}),
        ]))
      ]),
      transition('show => hide', [
        animate(300, keyframes([
          style({height: 'calc(100vh - 64px)', offset: 0.0}),
          style({height: 0, offset: 1.0}),
        ]))
      ]),
    ])
  ]
})
export class ActionTrayComponent {
  @Input() visibility: 'show' | 'hide' = 'hide';

  toggle() {
    this.visibility = this.visibility === 'show' ? 'hide' : 'show';
  }
}
