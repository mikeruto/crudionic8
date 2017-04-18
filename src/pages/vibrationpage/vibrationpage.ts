import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Vibration} from '@ionic-native/vibration';
/**
 * Generated class for the Vibration page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-vibrationpage',
  templateUrl: 'vibrationpage.html',
})
export class Vibrationpage {

  constructor(private vibration:Vibration,public navCtrl: NavController, public navParams: NavParams) {}

  vibrate(){
      //this.vibration.vibrate(5000);   //vibrar por 5 segundos.
      this.vibration.vibrate([1000,500,1000,500,1000]);  // vibrar con pausas de medio segundo
  }

}
