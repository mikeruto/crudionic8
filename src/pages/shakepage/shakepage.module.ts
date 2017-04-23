import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Shakepage } from './shakepage';

@NgModule({
  declarations: [
    Shakepage,
  ],
  imports: [
    IonicPageModule.forChild(Shakepage),
  ],
  exports: [
    Shakepage
  ]
})
export class ShakepageModule {}
