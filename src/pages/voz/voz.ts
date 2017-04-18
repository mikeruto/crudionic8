import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform} from 'ionic-angular';
import {TextToSpeech} from '@ionic-native/text-to-speech';
import {SpeechRecognition, SpeechRecognitionListeningOptionsAndroid, SpeechRecognitionListeningOptionsIOS} from '@ionic-native/speech-recognition';

@IonicPage()
@Component({
  selector: 'page-voz',
  templateUrl: 'voz.html',
})
export class Voz {

    text: string;
    speechList: Array<string> = [];
    androidOptions: SpeechRecognitionListeningOptionsAndroid;
    iosOptions: SpeechRecognitionListeningOptionsIOS;
    constructor(private platform: Platform, private speech: SpeechRecognition, private tts: TextToSpeech, public navCtrl: NavController, public navParams: NavParams) {}

  
    async sayText(): Promise<any> {
        try {
            await this.tts.speak(this.text);
            console.log("correcto " + this.text);
        } catch (e) {
            console.log(e);
        }
    }


    listenForSpeech(): void {
        
        this.androidOptions = {
            prompt: 'Speak into your phone!',
            language: 'es-PE'
        }
        this.iosOptions = {
           language: 'es-PE'   //imaginando que el idioma por defecto no sea ingles.
        }

        if (this.platform.is('android')) {
            this.speech.startListening(this.androidOptions).subscribe(data => this.speechList = data, error => console.log(error));
        } else {
            this.speech.startListening(this.iosOptions).subscribe(data => this.speechList = data, error => console.log(error));
        }

    }

    async hasPermisssion(): Promise<boolean> {
        try {
            const permission = await this.speech.hasPermission();
            console.log(permission);
            return permission;
        } catch (e) {
            console.error(e);
        }
    }

    async getPermission(): Promise<void> {
        try {
            const permission = await this.speech.requestPermission();
            console.log(permission);
            return permission;
        } catch (e) {
            console.log(e);
        }
    }

    async isSpeechSupported(): Promise<boolean> {
        const isAvailable = await this.speech.isRecognitionAvailable();
        console.log(isAvailable);
        return isAvailable;
    }

}
