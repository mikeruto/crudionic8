import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Flashlight} from '@ionic-native/flashlight';

/**
 * Generated class for the Flashlight page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-flashlightpage',
  templateUrl: 'flashlightpage.html',
})
export class Flashlightpage {

  isOn: boolean = false;
    constructor(private flashlight: Flashlight, public navCtrl: NavController, public navParams: NavParams) {}

    async isAvailable(): Promise<boolean> {
        try {
            return await this.flashlight.available();
        } catch (e) {
            console.log(e);

        }
    }

    /**  
     * Toggle the flashlight to an on or off state 
     * Get whether the flashlight is isAvailable
     *  If it is available:
     *   Toggle the flashlight
     *   Toggle the 'isOn' variable
     *   If it isn't available:
     *   Log out to the console
     *      **/

    async toggleFlash(): Promise<void> {
        try {
            let available = await this.isAvailable();
            if (available){
                await this.flashlight.toggle();
                this.isOn = !this.isOn;
            }else{
                console.log('is not available');
            }
        } catch (e) {
        console.log(e);
        }
    }
    
    async turnOnFlash():Promise<void>{
        await this.flashlight.switchOff();
    }
    
    async turnOffFlash():Promise<void>{
        await this.flashlight.switchOff();
    }
    
    async isFlashOn():Promise<boolean>{
        return await this.flashlight.isSwitchedOn();
    }

}
