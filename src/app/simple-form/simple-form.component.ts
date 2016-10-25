import {
  Component, OnInit, Input, Output, EventEmitter,
  ViewEncapsulation
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'app-simple-form',
  template: `
    <input #myInput type="text" 
      [(ngModel)]="message"
      [ngClass]="{mousedown: isMousedown}"
      (mousedown)="isMousedown = true"
      (mouseup)="isMousedown = false"
      (mouseleave)="isMousedown = false"
    />
    <button (click)="update.emit({text:message})">Click me!</button>
  `,
  styles: [`
:host {
  display: flex;
  flex-direction: column;
}

.mousedown {
  border: 2px solid green;
}

input:focus {
  font-weight: bold;
  outline: none;
}

button {
  border: none;
}
`]
})
export class SimpleFormComponent implements OnInit {

  isMousedown;

  @Input() message;

  @Output() update = new EventEmitter();

  constructor() {
    // setInterval(() => this.message = Math.random().toString(), 1000);
  }

  ngOnInit() {
  }

}
