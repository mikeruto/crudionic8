import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {CallNumber} from '@ionic-native/call-number';

/**
 * Generated class for the Phone page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-phone',
    templateUrl: 'phone.html',
})
export class Phone {
    phoneNumber: number;
    constructor(private call: CallNumber) {}

    async callNumber(): Promise<any> {
        try {
            await this.call.callNumber(String(this.phoneNumber), true);
        } catch (e) {
            console.error(e);
        }
    }

}
