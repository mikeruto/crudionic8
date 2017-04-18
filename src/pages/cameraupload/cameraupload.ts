import {Component, NgZone} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {File} from '@ionic-native/file';
import firebase from 'firebase'


@IonicPage()
@Component({
    selector: 'page-cameraupload',
    templateUrl: 'cameraupload.html',
})
export class Cameraupload {
    options: CameraOptions = {
        quality: 20, // BAJARLE LA CALIDAD PARA QUE SUBA MAS RAPIDO
        destinationType: this.camera.DestinationType.FILE_URI, //OJO FILE_URI
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    }

    firestore = firebase.storage();
    imgsource: any;
    constructor(private file: File, private camera: Camera, public navCtrl: NavController, public navParams: NavParams, public zone: NgZone) {}

    async takePicture(): Promise<any> {
        try {
            var fotoCamara = await this.camera.getPicture(this.options);
            console.log(fotoCamara);
            var fechaUnica = new Date().getTime();
            var currentUserString = window.localStorage.getItem('currentuser');
            var currenUserJSON = JSON.parse(currentUserString);
            var uniqueNumber = fechaUnica + '_' + currenUserJSON.uid;
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
                                    this.imgsource = url;
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
    }





}
