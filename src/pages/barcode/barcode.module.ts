import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Barcode } from './barcode';

@NgModule({
  declarations: [
    Barcode,
  ],
  imports: [
    IonicPageModule.forChild(Barcode),
  ],
  exports: [
    Barcode
  ]
})
export class BarcodeModule {}
