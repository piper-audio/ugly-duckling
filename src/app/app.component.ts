import {Component, Inject} from '@angular/core';
import {MailService} from "./mail.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ugly';

  constructor(
    private mail: MailService,
    @Inject('piper-server-uri') private serverUri
  ) {}

  onUpdate(id, text) {
    this.mail.update(id, text);
  }
}
