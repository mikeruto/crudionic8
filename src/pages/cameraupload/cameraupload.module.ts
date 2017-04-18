import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Cameraupload } from './cameraupload';

@NgModule({
  declarations: [
    Cameraupload,
  ],
  imports: [
    IonicPageModule.forChild(Cameraupload),
  ],
  exports: [
    Cameraupload
  ]
})
export class CamerauploadModule {}
