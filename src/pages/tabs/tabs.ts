import { Component } from '@angular/core';
import {IonicPage, NavController, AlertController} from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class Tabs {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: string = "Home";
  tab2Root: string = "About";

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }
  
  logout(): void {
        let prompt = this.alertCtrl.create({
            title: 'Cerrar sesion',
            message: '¿ Desea cerrar sesion ?',
            buttons: [
                {
                    text: 'Cancelar',
                    handler: data => {
                        console.log("cancel clicked");
                    }

                },
                {
                    text: 'Cerrar',
                    handler: data => {
                        window.localStorage.removeItem('currentuser');
                        //this.navCtrl.pop();
                        this.navCtrl.setRoot("Login");
                    }
                }
            ]
        });

        prompt.present();
    }
  
}
