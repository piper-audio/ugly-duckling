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
      height: 100%;
      width: 100%;
      position: absolute;
      z-index: 100;
      overflow-y: hidden;
    }`
  ],
  animations: [
    trigger('visibility', [
      state('show', style({
        height: '100%',
        'overflow-y': 'scroll'
      })),
      state('hide', style({
        height: 0,
        'overflow-y': 'hidden',
      })),
      transition('hide => show', [
        animate(300, keyframes([
          style({height: 0, offset: 0}),
          style({height: '100%',  offset: 1.0}),
        ]))
      ]),
      transition('show => hide', [
        animate(300, keyframes([
          style({height: '100%', offset: 0.0}),
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
