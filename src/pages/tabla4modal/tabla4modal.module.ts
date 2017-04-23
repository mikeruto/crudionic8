import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Tabla4modal } from './tabla4modal';

@NgModule({
  declarations: [
    Tabla4modal,
  ],
  imports: [
    IonicPageModule.forChild(Tabla4modal),
  ],
  exports: [
    Tabla4modal
  ]
})
export class Tabla4modalModule {}
