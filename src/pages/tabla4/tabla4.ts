import {Component, NgZone} from '@angular/core';
import {IonicPage, NavController, AlertController} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import firebase from 'firebase'


@IonicPage(
)
@Component({
    selector: 'page-tabla4',
    templateUrl: 'tabla4.html'
})
export class Tabla4 {
    tablas4: FirebaseListObservable<any>;
    firestore = firebase.storage();
    constructor(public zone: NgZone, public navCtrl: NavController, public alertCtrl: AlertController, angFire: AngularFire) {
      this.tablas4 = angFire.database.list('tabla4');
    }

    add(): void {
        this.navCtrl.push("Tabla4modal", {
            tabla4: "nuevo"
        });
    }
    edit(tabla4): void {
       /* console.log(this.dom.bypassSecurityTrustResourceUrl(tabla4));
        console.log(this.dom.bypassSecurityTrustHtml(tabla4));
        console.log(this.dom.bypassSecurityTrustStyle(tabla4));
        console.log(this.dom.bypassSecurityTrustScript(tabla4));
        console.log(this.dom.bypassSecurityTrustUrl(tabla4));*/
        
        this.navCtrl.push("Tabla4modal", {
            tabla4: tabla4
        });
    }

    delete(tabla4Id): void {
        let prompt = this.alertCtrl.create({
            title: 'Eliminar registro',
            message: '¿ Desea eliminar este registro ?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log("cancel clicked");
                    }
                },
                {
                    text: 'Delete',
                    handler: data => {
                        this.tablas4.remove(tabla4Id);
                    }
                }
            ]
        });

        prompt.present();
    }

}