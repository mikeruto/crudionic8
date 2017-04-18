import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Flashlightpage } from './flashlightpage';

@NgModule({
  declarations: [
    Flashlightpage,
  ],
  imports: [
    IonicPageModule.forChild(Flashlightpage),
  ],
  exports: [
    Flashlightpage
  ]
})
export class FlashlightpageModule {}
