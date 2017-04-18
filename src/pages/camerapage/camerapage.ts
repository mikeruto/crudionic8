import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';


@IonicPage()
@Component({
    selector: 'page-camerapage',
    templateUrl: 'camerapage.html',
})
export class Camerapage {

    image: string;
    options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    }
    constructor(private camera: Camera, public navCtrl: NavController, public navParams: NavParams) {}

    async takePicture(): Promise<any> {
        try {
            this.image = "data:image/jpeg;base64," + await this.camera.getPicture(this.options);
            // setTimeout(console.log(this.image),6000);
        } catch (e) {
            console.error(e);

        }
    }

}
