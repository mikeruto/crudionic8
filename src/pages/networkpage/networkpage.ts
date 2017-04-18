import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams, ToastController } from 'ionic-angular';
import {Network } from '@ionic-native/network';
import {Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-networkpage',
  templateUrl: 'networkpage.html'
})
export class Networkpage {

    connected: Subscription;
    disconnected: Subscription;

    constructor(private toast:ToastController, private network:Network,public navCtrl: NavController, public navParams: NavParams) {}



  displayNetworkUpdate(connectionState:String){
      
      let networkType = this.network.type;
      
      this.toast.create({
          message: `You are now ${connectionState} via ${networkType}`,
          duration: 3000
      }).present();
  }

  ionViewWillLeave(){
      // esto hace que solo se muestre en esta pagina y no en las demas.
      this.connected.unsubscribe();
      this.disconnected.unsubscribe();
  }

  ionViewDidEnter() {
      this.connected = this.network.onConnect().subscribe(data => {
        console.log(data);
        this.displayNetworkUpdate(data.type);
        }, error => console.error(error));
    
      this.disconnected = this.network.onDisconnect().subscribe(data => {
        console.log(data);
        this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
  }

}
