import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ColorPicker} from './color-picker';

@NgModule({
  declarations: [
    ColorPicker,
  ],
  imports: [
    IonicPageModule.forChild(ColorPicker),
  ],
  exports: [
    ColorPicker
  ]
})
export class ColorPickerModule {}
