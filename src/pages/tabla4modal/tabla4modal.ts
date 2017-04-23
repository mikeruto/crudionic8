import {Component, NgZone} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {File} from '@ionic-native/file';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {FilePath} from '@ionic-native/file-path';
import firebase from 'firebase'
import {DomSanitizer} from '@angular/platform-browser';

@IonicPage()
@Component({
    template: `
<ion-header>
 <ion-navbar>
   <button ion-button menuToggle><ion-icon name="menu"></ion-icon></button><ion-title>Tabla4 Form</ion-title></ion-navbar>
</ion-header>
<ion-content >
<form [formGroup]="tabla4Form" (ngSubmit)="save()" novalidate>
 <ion-item>
     <ion-label stacked>Name</ion-label>
     <ion-input formControlName="name"  type="text" placeholder="Ingresa el nombre" [class.invalid]="!tabla4Form.controls.name.valid && tabla4Form.controls.name.dirty"></ion-input>
 </ion-item>
 <ion-item class="error-message" *ngIf="!tabla4Form.controls.name.valid && tabla4Form.controls.name.dirty"><p>El nombre como maximo puede tener 20 caracteres.</p></ion-item>
 
 <ion-item>
    <ion-label stacked>Description</ion-label>
   <ion-input formControlName="description" type="text" placeholder="Ingresa la descripcion" [class.invalid]="!tabla4Form.controls.description.valid && tabla4Form.controls.description.dirty"></ion-input>
</ion-item>
<ion-item class="error-message" *ngIf="!tabla4Form.controls.description.valid && tabla4Form.controls.description.dirty"><p>La descripcion como minimo debe tener 5 caracteres.</p></ion-item>

<ion-item>
    <ion-label stacked>Imagen</ion-label>
    <ion-input  formControlName="image" type="text" placeholder="Ingresa la imagen" [class.invalid]="!tabla4Form.controls.image.valid && tabla4Form.controls.image.dirty"></ion-input>
</ion-item>
<ion-item class="error-message" *ngIf="!tabla4Form.controls.image.valid && tabla4Form.controls.image.dirty"><p>La imagen como minimo debe tener 5 caracteres.</p></ion-item>
<img alt=""  [src]="image" width="80" height="80">
<button ion-button type="button" (click)="takePicture()"><ion-icon name="camera"></ion-icon></button>

<ion-item>
    <ion-label stacked>Precio</ion-label>
    <ion-input formControlName="price" type="number" placeholder="Ingresa el precio" [class.invalid]="!tabla4Form.controls.price.valid && tabla4Form.controls.price.dirty"></ion-input></ion-item>
<ion-item class="error-message" *ngIf="!tabla4Form.controls.price.valid && tabla4Form.controls.price.dirty"><p>Ingresa el precio.</p></ion-item>  
    
<ion-item>
    <ion-label stacked>Peso</ion-label>
    <ion-input formControlName="weight"  type="number" placeholder="Ingresa el peso" [class.invalid]="!tabla4Form.controls.weight.valid && tabla4Form.controls.weight.dirty"></ion-input>
</ion-item>
<ion-item class="error-message" *ngIf="!tabla4Form.controls.weight.valid && tabla4Form.controls.weight.dirty"><p>Ingresa el peso.</p></ion-item>
   
<button ion-button type="submit" [disabled]="!tabla4Form.valid">Submit</button>
</form>
</ion-content>
  `
})
export class Tabla4modal {
    tablas4: FirebaseListObservable<any>;
    tabla4: any; //objtabla parametro editar

    private tabla4Form: FormGroup;
    image: any; //tag img
    URLimagenAnterior: string;
    options: CameraOptions = {
        quality: 20,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    }
    firestore = firebase.storage();

    constructor(private dom: DomSanitizer, private fp: FilePath, public zone: NgZone, private file: File, private camera: Camera, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, angFire: AngularFire) {
        this.tablas4 = angFire.database.list('tabla4');
        this.tabla4 = this.navParams.get('tabla4'); //objtabla parametro editar
        // console.log(this.tabla4.image);
        this.tabla4Form = this.formBuilder.group({
            name: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
            description: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            image: [{value: '', disabled: true}, Validators.required],
            price: ['', Validators.required],
            weight: ['', Validators.required]
        });

        if (this.tabla4 != "nuevo") {
            this.tabla4Form.controls['name'].setValue(this.tabla4.name);
            this.tabla4Form.controls['description'].setValue(this.tabla4.description);
            this.tabla4Form.controls['image'].setValue(this.dom.bypassSecurityTrustResourceUrl(this.tabla4.image));
            this.image = this.dom.bypassSecurityTrustResourceUrl(this.tabla4.image);  // tag img.
            this.tabla4Form.controls['price'].setValue(this.tabla4.price);
            this.tabla4Form.controls['weight'].setValue(this.tabla4.weight);
        }
    }


    async save() {
        let self = this;
        if (!this.tabla4Form.valid) {
            console.log("nice try!");
        } else {
            if (this.tabla4 == "nuevo") {
                let pushId = await this.tablas4.push({
                    name: this.tabla4Form.value.name,
                    description: this.tabla4Form.value.description,
                    image: "Foto_camara.jpg",
                    price: this.tabla4Form.value.price,
                    weight: this.tabla4Form.value.weight
                });
                try {
                    var fotoCamara = this.image;
                    //console.log(fotoCamara);
                    var fechaUnica = new Date().getTime();
                    var currentUserString = window.localStorage.getItem('currentuser');
                    var currenUserJSON = JSON.parse(currentUserString);
                    var uniqueNumber = pushId.getKey() + '_' + fechaUnica + '_' + currenUserJSON.uid;
                    this.file.resolveLocalFilesystemUrl(fotoCamara).then((res: any) => {
                        res.file((resFile: any) => {
                            var reader = new FileReader();
                            reader.readAsArrayBuffer(resFile);
                            reader.onloadend = (evt: any) => {
                                var imgBlob: any = new Blob([evt.target.result], {type: 'image/jpeg'});
                                var imageStore = this.firestore.ref().child(String(uniqueNumber));
                                imageStore.put(imgBlob).then((result) => {
                                    console.log('Upload Success');
                                    this.firestore.ref().child(String(uniqueNumber)).getDownloadURL().then((url) => {
                                        this.zone.run(() => {
                                            self.tablas4.update(pushId.getKey(), {  // ACTUALIZAR EL NOMBRE DE LA IMAGEN DE LA TABLA POR SU URL DE DESCARGA.
                                                image: url
                                            });
                                        })
                                    })
                                }).catch((err) => {
                                    console.log('Upload Failed' + err);
                                })
                            }
                        })
                    })
                } catch (e) {
                    console.error(e);
                }
            } else {
                //comprobar si la imagen es la misma sino borrarle del storage y subir la nueva
                self.tabla4Form.get("image").enable(); // se habilita para poder tomar su valor porque este campo es disabled
                if (self.tabla4.image != self.tabla4Form.value.image) { //esto quiere decir que lo que haya en la propiedad image del objeto tabla es diferente al valor de la caja FotoCamara.jpg
                    self.tabla4Form.get("image").disable();  // aqui se deshabilita
                    var URLimagenAnterior = self.URLimagenAnterior;
                    var arrayURLimagenAnterior = URLimagenAnterior.split("https://firebasestorage.googleapis.com/v0/b/firebase-crudionic.appspot.com/o/");
                    var arrayNombreArchivoImagen = arrayURLimagenAnterior[1].split("?");
                    var nombreArchivoImagen = arrayNombreArchivoImagen[0];
                    // Delete the file
                    var imagenParaBorrar = self.firestore.ref().child(nombreArchivoImagen);
                    imagenParaBorrar.delete().then(function () {
                        // File deleted successfully
                        try {
                            var fotoCamara = self.image;
                            //console.log(fotoCamara);
                            var fechaUnica = new Date().getTime();
                            var currentUserString = window.localStorage.getItem('currentuser');
                            var currenUserJSON = JSON.parse(currentUserString);
                            var uniqueNumber = self.tabla4.$key + '_' + fechaUnica + '_' + currenUserJSON.uid;
                            self.file.resolveLocalFilesystemUrl(fotoCamara).then((res: any) => {
                                res.file((resFile: any) => {
                                    var reader = new FileReader();
                                    reader.readAsArrayBuffer(resFile);
                                    reader.onloadend = (evt: any) => {
                                        var imgBlob: any = new Blob([evt.target.result], {type: 'image/jpeg'});
                                        var imageStore = self.firestore.ref().child(String(uniqueNumber));
                                        imageStore.put(imgBlob).then((result) => {
                                            console.log('Upload Success');
                                            self.firestore.ref().child(String(uniqueNumber)).getDownloadURL().then((url) => {
                                                self.zone.run(() => {
                                                    self.tablas4.update(self.tabla4.$key, {  // ACTUALIZAR EL NOMBRE DE LA IMAGEN DE LA TABLA POR SU URL DE DESCARGA.
                                                        name: self.tabla4Form.value.name,
                                                        description: self.tabla4Form.value.description,
                                                        image: url,
                                                        price: self.tabla4Form.value.price,
                                                        weight: self.tabla4Form.value.weight
                                                    });
                                                })
                                            })
                                        }).catch((err) => {
                                            console.log('Upload Failed' + err);
                                        })
                                    }
                                })
                            })
                        } catch (e) {
                            console.error(e);
                        }
                    }).catch(function (error) {
                        // Uh-oh, an error occurred!
                        console.log(error);
                    });
                } else {
                    await this.tablas4.update(this.tabla4.$key, {
                        name: this.tabla4Form.value.name,
                        description: this.tabla4Form.value.description,
                        price: this.tabla4Form.value.price,
                        weight: this.tabla4Form.value.weight
                    });
                }
            }
            this.navCtrl.push("Tabla4");
        }
    }

    async takePicture(): Promise<any> {
        try {
            let foto = await this.camera.getPicture(this.options);
            let self = this;
            self.fp.resolveNativePath(foto).then((fp: String) => {
                self.URLimagenAnterior = self.tabla4.image;  //guardamos la imagen que estaba guardada anteriormente en una variable.
                //console.log(self.tabla4.image);
                self.image = fp;
                self.tabla4Form.controls['image'].setValue("Foto_camara.jpg");
            }).catch((err: any) => {
                console.log(err);
            });
        } catch (e) {
            console.error(e);
        }
    }


}
