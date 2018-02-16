import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const importExportArray = [
  CommonModule,
  BrowserAnimationsModule
];

const declarationArray = [

];

@NgModule({
  imports:      [
    ...importExportArray

  ],
  declarations: [
    ...declarationArray

  ],
  exports:      [
    ...importExportArray,
    ...declarationArray,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BridesSharedModule {

}

