import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {AuthProviders, AuthMethods, AngularFire} from 'angularfire2';
import {Facebook} from '@ionic-native/facebook';
import firebase from 'firebase';
import {GooglePlus} from '@ionic-native/google-plus';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class Login {
    email: any;
    password: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public angfire: AngularFire, public platform: Platform, private fb: Facebook, private gp: GooglePlus) {}

    noLogin() {
        this.navCtrl.setRoot("Tabs");
    }

   /* login() {
        this.angfire.auth.login({
            email: this.email,
            password: this.password
        },
            {
                provider: AuthProviders.Password,
                method: AuthMethods.Password
            }).then((response) => {
                console.log('Login success' + JSON.stringify(response));
                let currentuser = {
                    email: response.auth.email,
                    picture: response.auth.photoURL
                };
                window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
                //this.navCtrl.pop();
                this.navCtrl.setRoot("Tabs");
            }).catch((error) => {
                console.log(error);
            })
    }*/

    twitterlogin() {
        if (this.platform.is('cordova')) {
            let accessToken = "40940755-RYqYUfHcNY9Vm0GOGKUcD55mVOGGiB9zbRPkxu062";
            let secretKey = "6e4QdBVqpJedntkxqABd4XhW5c17b58A7ynNAyChAAcVH";
            const twitterCreds = firebase.auth.TwitterAuthProvider.credential(accessToken, secretKey);
            firebase.auth().signInWithCredential(twitterCreds).then((res) => {
                let currentuser = {
                    email: firebase.auth().currentUser.displayName,
                    picture: firebase.auth().currentUser.photoURL,
                    uid: firebase.auth().currentUser.uid
                };
                window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
                // alert(currentuser.displayName);
                //this.navCtrl.pop();
                this.navCtrl.setRoot("Tabs");
            }, (err) => {
                alert('Login not succesful ' + err);
            });

        } else {
            this.angfire.auth.login({
                provider: AuthProviders.Twitter,
                method: AuthMethods.Popup
            }).then((response) => {
                console.log('Login success with twitter' + JSON.stringify(response));
                let currentuser = {
                    email: response.auth.displayName,
                    picture: response.auth.photoURL,
                    uid: response.auth.uid
                };
                window.localStorage.setItem('currentuserDisplayName', JSON.stringify(currentuser));
                //this.navCtrl.pop();
                this.navCtrl.setRoot("Tabs");
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    fblogin() {
        if (this.platform.is('cordova')) {
            this.fb.login(['email', 'public_profile']).then((res) => {
                const facebookCreds = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
                firebase.auth().signInWithCredential(facebookCreds).then((res) => {
                    let currentuser = {
                        email: firebase.auth().currentUser.displayName,
                        picture: firebase.auth().currentUser.photoURL,
                        uid: firebase.auth().currentUser.uid
                    };
                    window.localStorage.setItem('currentuser', JSON.stringify(currentuser));

                    this.navCtrl.setRoot("Tabs");
                }, (err) => {
                    alert('Login not succesful ' + err);
                });
            });
        } else {
            this.angfire.auth.login({
                provider: AuthProviders.Facebook,
                method: AuthMethods.Popup
            }).then((response) => {
                console.log('Login success with facebook' + JSON.stringify(response));
                let currentuser = {
                    email: response.auth.displayName,
                    picture: response.auth.photoURL,
                    uid: response.auth.uid
                };
                window.localStorage.setItem('currentuserDisplayName', JSON.stringify(currentuser));
                this.navCtrl.setRoot("Tabs");
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    googlelogin() {
        if (this.platform.is('cordova')) {
            this.gp.login({
                'webClientId': '100887066112-a0sof2pb5pegg1ondek06eq5vvf4mie7.apps.googleusercontent.com' //your Android reverse client id (este ID lo obtenemos del google-services.json que hemos descargado desde la consola de firebase y lo pegamos en la carpeta android)
            }).then(userData => {
                var token = userData.idToken;
                const googleCreds = firebase.auth.GoogleAuthProvider.credential(token, null);
                firebase.auth().signInWithCredential(googleCreds).then((res) => {
                    let currentuser = {
                        email: firebase.auth().currentUser.displayName,
                        picture: firebase.auth().currentUser.photoURL,
                        uid: firebase.auth().currentUser.uid
                    };
                    window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
                    this.navCtrl.setRoot("Tabs");
                }).catch(error => {
                    console.log(error);
                });
            });
        } else {
            this.angfire.auth.login({
                provider: AuthProviders.Google,
                method: AuthMethods.Popup
            }).then((response) => {
                console.log('Login success with google' + JSON.stringify(response));
                let currentuser = {
                    email: response.auth.displayName,
                    picture: response.auth.photoURL,
                    uid: response.auth.uid
                };
                window.localStorage.setItem('currentuserDisplayName', JSON.stringify(currentuser));
                this.navCtrl.setRoot("Tabs");
            }).catch((error) => {
                console.log(error);
            })
        }
    }

}
