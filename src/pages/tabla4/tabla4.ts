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
        this.navCtrl.push("Tabla4modal", {
            tabla4: tabla4
        });
    }

    delete(tabla4): void {
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
                    //borrado de imagenes del firestore
                    var imagen = tabla4.image;  
                    var arrayURLimagenAnterior = imagen.split("https://firebasestorage.googleapis.com/v0/b/firebase-crudionic.appspot.com/o/images%2F");
                    var arrayNombreArchivoImagen = arrayURLimagenAnterior[1].split("?");
                    var nombreArchivoImagen = arrayNombreArchivoImagen[0];
                    var imagenParaBorrar = this.firestore.ref().child("images/" + nombreArchivoImagen);
                    var thumbnailParaBorrar = this.firestore.ref().child("images/thumb_" + nombreArchivoImagen);
                    imagenParaBorrar.delete();
                    thumbnailParaBorrar.delete();
                    //borrado de registro de la base de datos.
                    this.tablas4.remove(tabla4.$key);
                    }
                }
            ]
        });
        prompt.present();
    }

}