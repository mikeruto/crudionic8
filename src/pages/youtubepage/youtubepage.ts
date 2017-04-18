import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-youtubepage',
  templateUrl: 'youtubepage.html'
})
export class Youtubepage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  videos: any[] = [
        {
            title: 'The Beatles - Drums',
            video: 'https://www.youtube.com/embed/tTnxmn2jWjo'
        },
        {
            title: 'Millencolin - Drums',
            video: 'https://www.youtube.com/embed/KzxWAppyAds'    //OJO las URL tienen embed
        }
        ,
        {
            title: 'Lagwagon - Drums',
            video: 'https://www.youtube.com/embed/5xCX37K1bpg'    //OJO las URL tienen embed
        },
        {
            title: 'ACDC - Drums',
            video: 'https://www.youtube.com/embed/Tr37vLmvnCk'    //OJO las URL tienen embed
        }
        ,
        {
            title: 'Green day - Drums',
            video: 'https://www.youtube.com/embed/wpbjy5ScELg'    //OJO las URL tienen embed
        }
        
    ]
    

}
