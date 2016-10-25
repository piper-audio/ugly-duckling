import { Injectable } from '@angular/core';

@Injectable()
export class MailService {

  messages = [
    {id: 0, text: `You've got mail!`},
    {id: 1, text: `No Mail!`},
    {id: 2, text: `Spam!`}
  ];

  constructor() { }

  update(id, text) {
    this.messages = this.messages.map(message =>
      message.id === id
        ? {id, text}
        : message
    )
  }

}
