import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BarcodeScanner,BarcodeScannerOptions} from '@ionic-native/barcode-scanner';

/**
 * Generated class for the Barcode page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-barcode',
  templateUrl: 'barcode.html',
})
export class Barcode {

  options: BarcodeScannerOptions; 
   results: {}; 
   
  constructor(private barcode:BarcodeScanner,public navCtrl: NavController, public navParams: NavParams) {}

   async scanBarcode(){
      this.options = {
          prompt: 'Scan a barcode to see the result!'
      }
      
      this.results = await this.barcode.scan();
      console.log(this.results);
  }
  
  async encodeData(){
      await this.barcode.encode(this.barcode.Encode.TEXT_TYPE,'http://www.tanpukipu.com');
  }

}
