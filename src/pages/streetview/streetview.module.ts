import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Streetview } from './streetview';

@NgModule({
  declarations: [
    Streetview,
  ],
  imports: [
    IonicPageModule.forChild(Streetview),
  ],
  exports: [
    Streetview
  ]
})
export class StreetviewModule {}
