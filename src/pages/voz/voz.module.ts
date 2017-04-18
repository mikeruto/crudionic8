import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Voz } from './voz';

@NgModule({
  declarations: [
    Voz,
  ],
  imports: [
    IonicPageModule.forChild(Voz),
  ],
  exports: [
    Voz
  ]
})
export class VozModule {}
