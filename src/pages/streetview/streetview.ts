import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google:any;
@IonicPage()
@Component({
  selector: 'page-streetview',
  templateUrl: 'streetview.html',
})
export class Streetview {
  panorama:any;  
    
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      /*const that = this;
      setTimeout(function (){
          that.streetView();
      },2000);*/
  }
  
    ionViewDidLoad() {
        this.streetView();
    }
  

   async streetView(){
        this.panorama = await new google.maps.StreetViewPanorama(
            document.getElementById('street-view'),
            { position: {lat:-8.128741, lng: -79.041695},
              pov: {heading: 165, pitch: 0},
              zoom: 1
            });
        }
    }
  
  

