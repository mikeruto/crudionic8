import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';


@IonicPage()
@Component({
  selector: 'page-tabla3',
  templateUrl: 'tabla3.html',
})
export class Tabla3 {
tablas3: FirebaseListObservable<any>;

    constructor(public navCtrl: NavController, public alertCtrl: AlertController, angFire: AngularFire) {
        this.tablas3 = angFire.database.list('tabla3');
    }
    
    add(): void {
        
        let prompt = this.alertCtrl.create({
            title: 'Registro de tabla3',
            message: 'Ingrese todos los datos.',
            cssClass : 'dialogos',
            inputs: [
                {
                    name: 'name',
                    placeholder: 'ingrese el nombre'
                },
                {
                    name: 'description',
                    placeholder: 'ingrese la descripcion'
                },
                {
                    name: 'image',
                    placeholder: 'ingrese la URL de la imagen'
                },
                {
                    name: 'price',
                    placeholder: 'ingrese el precio'
                },
                {
                    name: 'weight',
                    placeholder: 'ingrese el peso'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log("cancel clicked");
                    }

                },
                {
                    text: 'Save',
                    handler: data => {
                        this.tablas3.push({
                            name: data.name,
                            description: data.description,
                            image: data.image,
                            price: data.price,
                            weight: data.weight
                        })
                    }
                }
            ]
        });
        
        prompt.present();

    }
   edit(tabla3): void {
        let prompt = this.alertCtrl.create({
            title: 'Editar tabla3',
            message: 'Editar tabla3.',
            cssClass : 'dialogos',
            inputs: [
                {
                    name: 'name',
                    placeholder: tabla3.name
                },
                {
                    name: 'description',
                    placeholder: tabla3.description
                },
                {
                    name: 'image',
                    placeholder: tabla3.image
                },
                {
                    name: 'price',
                    placeholder: tabla3.price
                },
                {
                    name: 'weight',
                    placeholder: tabla3.weight
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log("cancel clicked");
                    }

                },
                {
                    text: 'Save',
                    handler: data => {
                        let newName:String = tabla3.name;
                        let newDescription:String = tabla3.description;
                        let newImage:String = tabla3.image;
                        let newPrice:String = tabla3.price;
                        let newWeight:String = tabla3.weight;
                        
                        if(data.name != ''){
                            newName = data.name;
                        }
                        if(data.description != ''){
                            newDescription = data.description;
                        }
                        if(data.image != ''){
                            newImage = data.image;
                        }
                        if(data.price != ''){
                            newPrice = data.price;
                        }
                        if(data.weight != ''){
                            newWeight = data.weight;
                        }
                        this.tablas3.update(tabla3.$key,{
                            name: newName,
                            description: newDescription,
                            image: newImage,
                            price: newPrice,
                            weight: newWeight
                        })
                    }
                }
            ]
        });

        prompt.present();
    }
    
    delete(tabla3Id): void {
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
                        this.tablas3.remove(tabla3Id);
                    }
                }
            ]
        });

        prompt.present();
    }

}