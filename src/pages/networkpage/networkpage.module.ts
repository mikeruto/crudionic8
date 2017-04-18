import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Networkpage } from './networkpage';

@NgModule({
  declarations: [
    Networkpage,
  ],
  imports: [
    IonicPageModule.forChild(Networkpage),
  ],
  exports: [
    Networkpage
  ]
})
export class NetworkpageModule {}
