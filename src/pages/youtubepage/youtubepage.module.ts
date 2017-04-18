import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Youtubepage } from './youtubepage';

// pipes
import {YoutubeModule} from '../../pipes/youtube.module';

@NgModule({
  declarations: [
    Youtubepage
  ],
  imports: [
    IonicPageModule.forChild(Youtubepage),
    YoutubeModule
  ],
  exports: [
    Youtubepage
  ]
})
export class YoutubepageModule {}
