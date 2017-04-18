import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';



//plugins
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
//import {CloudModule,CloudSettings} from '@ionic/cloud-angular';
import {AngularFireModule} from 'angularfire2';
import {Geolocation} from '@ionic-native/geolocation';
import {TextToSpeech} from '@ionic-native/text-to-speech';
import {SpeechRecognition} from '@ionic-native/speech-recognition';
import {Flashlight} from '@ionic-native/flashlight';
import {FileChooser} from '@ionic-native/file-chooser';
import {FilePath} from '@ionic-native/file-path';
import {File} from '@ionic-native/file';
import {Camera} from '@ionic-native/camera';
import {CallNumber} from '@ionic-native/call-number';
import {Network} from '@ionic-native/network';
import {Brightness} from '@ionic-native/brightness';
import {Vibration} from '@ionic-native/vibration';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {Facebook} from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';



/*const cloudSettings: CloudSettings = {
    'core': {
        'app_id':'248d769e'
    },
    'auth':{
        'facebook': {
            'scope': []
        }
    }
}*/

// Initialize Firebase
export const firebaseConfig = {
    apiKey: "AIzaSyDikNaDK5lCHDT2tAe22bu2HKcgg3hF69k",
    authDomain: "fir-crudionic.firebaseapp.com",
    databaseURL: "https://fir-crudionic.firebaseio.com",
    storageBucket: "firebase-crudionic.appspot.com",
    messagingSenderId: "100887066112"
};

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
       // CloudModule.forRoot(cloudSettings),
        AngularFireModule.initializeApp(firebaseConfig)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        Geolocation,
        TextToSpeech,
        SpeechRecognition,
        Flashlight,
        FileChooser,
        FilePath,
        File,
        Camera,
        CallNumber,
        Network,
        Brightness,
        Vibration,
        BarcodeScanner,
        Facebook,
        GooglePlus
    ]
})
export class AppModule {}
