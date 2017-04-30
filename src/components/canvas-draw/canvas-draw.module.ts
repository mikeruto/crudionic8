import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CanvasDraw } from './canvas-draw';
//components
import {ColorPicker} from '../color-picker/color-picker';


@NgModule({
  declarations: [
    CanvasDraw
    ,ColorPicker
  ],
  imports: [
    IonicPageModule.forChild(CanvasDraw),
  ],
  exports: [
    CanvasDraw
  ]
})
export class CanvasDrawModule {}
