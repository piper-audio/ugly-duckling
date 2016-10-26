import {
  Component, OnInit, Input, Output, EventEmitter,
  ViewEncapsulation, ViewChild, ElementRef
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
    <pre #testPre>Hi</pre>
    <pre>{{testHi}}</pre>
    <button (click)="update.emit({text:message})">Click me!</button>
  
`,
  styleUrls: ['./simple-form.component.css']
})
export class SimpleFormComponent implements OnInit {

  @ViewChild('testPre') testPre: ElementRef;
  testHi = 'Hi';

  isMousedown;

  @Input() message;

  @Output() update = new EventEmitter();

  constructor() {
    // setInterval(() => this.message = Math.random().toString(), 1000);
  }

  ngOnInit() {
    this.testPre.nativeElement.innerHTML = Math.random().toString();
  }

}
