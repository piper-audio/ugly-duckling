/**
 * Created by lucast on 25/04/2017.
 */
import {
  MdButtonModule, MdCardModule,
  MdIconModule, MdProgressBarModule, MdProgressSpinnerModule,
  MdSelectModule,
  MdSidenavModule,
  MdToolbarModule
} from '@angular/material';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const importExports = [
  BrowserAnimationsModule,
  MdIconModule,
  MdSidenavModule,
  MdToolbarModule,
  MdButtonModule,
  MdSelectModule,
  MdProgressSpinnerModule,
  MdProgressBarModule,
  MdCardModule
];

@NgModule({
  imports: importExports,
  exports: importExports,
})
export class UglyMaterialModule { }
