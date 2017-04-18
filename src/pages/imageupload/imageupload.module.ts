import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Imageupload } from './imageupload';

@NgModule({
  declarations: [
    Imageupload,
  ],
  imports: [
    IonicPageModule.forChild(Imageupload),
  ],
  exports: [
    Imageupload
  ]
})
export class ImageuploadModule {}
