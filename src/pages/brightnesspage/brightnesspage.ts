import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Brightness} from '@ionic-native/brightness';

/**
 * Generated class for the Brightness page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-brightnesspage',
    templateUrl: 'brightnesspage.html',
})
export class Brightnesspage {

    brightness: number;
    screenSleep: boolean = false;

    constructor(private bright: Brightness, public navCtrl: NavController, public navParams: NavParams) {}

    setBrightness() {
        let newBrightness = this.brightness / 10;
        this.bright.setBrightness(newBrightness);
    }

    async getBrightness() {
        let currentBrightness = this.bright.getBrightness();
        console.log(currentBrightness);
    }

    toggleScreenSleep() {
        this.screenSleep = !this.screenSleep;
        this.bright.setKeepScreenOn(this.screenSleep);
    }

}
