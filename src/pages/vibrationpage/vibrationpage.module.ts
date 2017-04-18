import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Vibrationpage } from './vibrationpage';

@NgModule({
  declarations: [
    Vibrationpage,
  ],
  imports: [
    IonicPageModule.forChild(Vibrationpage),
  ],
  exports: [
    Vibrationpage
  ]
})
export class VibrationpageModule {}
