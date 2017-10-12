/**
 * Created by lucast on 25/04/2017.
 */
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const importExports = [
  BrowserAnimationsModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatCardModule,
  MatListModule,
  MatSnackBarModule
];

@NgModule({
  imports: importExports,
  exports: importExports,
})
export class UglyMaterialModule { }
