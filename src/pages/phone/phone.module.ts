import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Phone } from './phone';

@NgModule({
  declarations: [
    Phone,
  ],
  imports: [
    IonicPageModule.forChild(Phone),
  ],
  exports: [
    Phone
  ]
})
export class PhoneModule {}
