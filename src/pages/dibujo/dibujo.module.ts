import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Dibujo } from './dibujo';
//components
import {CanvasDraw} from '../../components/canvas-draw/canvas-draw';

@NgModule({
  declarations: [
    Dibujo,
    CanvasDraw
  ],
  imports: [
    IonicPageModule.forChild(Dibujo),
  ],
  exports: [
    Dibujo
  ]
})
export class DibujoModule {}
