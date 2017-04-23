import {Component, ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';



@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: string = "Login";
    @ViewChild(Nav) nav: Nav;
    pages: Array<{title: string, component: any, icon: any}>;
    userName: any;
    photoURL: any;
    constructor( platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });

        this.pages = [
            {title: 'Tabla3', component: "Tabla3", icon: 'list'},
            {title: 'Tabla4', component: "Tabla4", icon: 'list'},
            {title: 'Voz', component: "Voz", icon: 'mic'},
            {title: 'Subir imagenes', component: "Imageupload", icon: 'cloud-upload'},
            {title: 'Linterna', component: "Flashlightpage", icon: 'bulb'},
            {title: 'Camara', component: "Camerapage", icon: 'camera'},
            {title: 'Youtube', component: "Youtubepage", icon: 'logo-youtube'},
            {title: 'Telefono', component: "Phone", icon: 'phone-portrait'},
            {title: 'Red', component: "Networkpage", icon: 'wifi'},
            {title: 'Brillo', component: "Brightnesspage", icon: 'sunny'},
            {title: 'Vibracion', component: "Vibrationpage", icon: 'pulse'},
            {title: 'QR', component: "Barcode", icon: 'qr-scanner'},
            {title: 'Camera upload firebase', component: "Cameraupload", icon: 'photos'},
            {title: 'Street view', component: "Streetview", icon: 'move'},
            {title: 'Shake', component: "Shakepage", icon: 'resize'}
        ];
    }

    menuOpened() {
        var currentUserString = window.localStorage.getItem('currentuser');
        var currenUserJSON = JSON.parse(currentUserString);
        this.userName = currenUserJSON.email;
        this.photoURL = currenUserJSON.picture;
        //console.log(this.userName);
        //console.log(this.photoURL);
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        //this.nav.setRoot(page.component);
        this.nav.push(page.component);

    }
}
