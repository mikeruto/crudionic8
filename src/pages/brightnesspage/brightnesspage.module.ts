import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Brightnesspage } from './brightnesspage';

@NgModule({
  declarations: [
    Brightnesspage,
  ],
  imports: [
    IonicPageModule.forChild(Brightnesspage),
  ],
  exports: [
    Brightnesspage
  ]
})
export class BrightnesspageModule {}
