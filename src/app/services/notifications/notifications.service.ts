/**
 * Created by lucast on 06/07/2017.
 */
import {Injectable} from '@angular/core';
import {MdSnackBar} from '@angular/material';
@Injectable()
export class NotificationService {
  constructor(private snackBar: MdSnackBar) {}

  displayError(message: string): void {
    // TODO perhaps actual distinguish this as an error?
    this.displayMessage(message);
  }

  private displayMessage(message: string): void {
    this.snackBar.open(message, 'Dismiss', {duration: 5000});
  };
}
