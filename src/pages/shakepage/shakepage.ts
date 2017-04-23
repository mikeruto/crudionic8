import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { Shake } from '@ionic-native/shake';

@IonicPage()
@Component({
  selector: 'page-shakepage',
  templateUrl: 'shakepage.html',
})
export class Shakepage {

  constructor(private platform:Platform,private shake : Shake,public navCtrl: NavController, public navParams: NavParams) {
      this.platform.ready().then(()=> {
      this.shake.startWatch().subscribe(data => {
          alert('thank you!');
          console.log('shake');
      })
    });
      
  }

}
