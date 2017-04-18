import {Component, NgZone} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {FileChooser} from '@ionic-native/file-chooser';
import {FilePath} from '@ionic-native/file-path';
import {File} from '@ionic-native/file';
import firebase from 'firebase'

declare var cordova:any;

@IonicPage()
@Component({
    selector: 'page-imageupload',
    templateUrl: 'imageupload.html',
})
export class Imageupload {
    nativepath: any;
    firestore = firebase.storage();
    imgsource: any;

    constructor(private file: File, private fileChooser: FileChooser, private fp: FilePath, public navCtrl: NavController, public zone: NgZone) {

    }

    async store() {
        let self = this;
        return await new Promise((resolve, reject) => {
            let permissions = cordova.plugins.permissions;
            permissions.requestPermission(permissions.READ_EXTERNAL_STORAGE, function (status: any) {
                if (status.hasPermission) {
                    resolve("Permission is now granted");
                    self.fileChooser.open().then((url: any) => {
                        self.fp.resolveNativePath(url).then((fp: String) => {
                            self.nativepath = fp;
                            self.uploadimage();
                        }).catch((err: any) => {
                            console.log(err);
                        });

                    });
                } else {
                    reject('Permission is not turned on !');
                }
            }, reject('Permission is not turned onnn'));

        });
    }


    /* addPermission() {
         return new Promise((resolve, reject) => {
             let permissions = cordova.plugins.permissions;
             permissions.requestPermission(permissions.READ_EXTERNAL_STORAGE, function (status) {
                 if (status.hasPermission) {
                     resolve("Permission is now granted");
                 } else {
                     reject('Permission is not turned on !');
                 }
             }, reject('Permission is not turned onnn'));
 
         });
     }*/

    uploadimage() {
        var fechaUnica = new Date().getTime();
        var currentUserString = window.localStorage.getItem('currentuser');
        var currenUserJSON = JSON.parse(currentUserString);
        var uniqueNumber = fechaUnica + '_' + currenUserJSON.uid;
        this.file.resolveLocalFilesystemUrl(this.nativepath).then((res: any) => {
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
    }

    /*display() {
        this.firestore.ref().child('image').getDownloadURL().then((url) => {
            this.zone.run(() => {
                this.imgsource = url;
            })
        })
    }*/

}
