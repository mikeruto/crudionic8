import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';

declare var google: any;


@IonicPage()
@Component({
    selector: 'page-about',
    templateUrl: 'about.html',
})
export class About {
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    position: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
       /* const that = this;
        setTimeout(function () {
            that.loadMap();
        }, 2000);*/
    }

    ionViewDidLoad() {
        this.loadMap();
    }

    async loadMap() {
        await this.geolocation.getCurrentPosition().then((position) => {
            let mapa = this.map
            let directionsService = new google.maps.DirectionsService();
            let directionsDisplay: any;
            let currentLocationLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            let mikecrosoftHouseLatLng = new google.maps.LatLng(-8.128741, -79.041695);
            let mapOptions = {
                center: currentLocationLatLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            directionsDisplay = new google.maps.DirectionsRenderer();
            mapa = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
            //Wait until the map is loaded
            google.maps.event.addListenerOnce(mapa, 'idle', function () {
                let bounds = new google.maps.LatLngBounds();
                bounds.extend(currentLocationLatLng);
                bounds.extend(mikecrosoftHouseLatLng);
                mapa.fitBounds(bounds);
                let request = {
                    origin: currentLocationLatLng,
                    destination: mikecrosoftHouseLatLng,
                    travelMode: google.maps.TravelMode.DRIVING
                };
                directionsService.route(request, function (response: any, status: any) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        directionsDisplay.setMap(mapa);
                    } else {
                        alert("Directions Request from " + currentLocationLatLng.toUrlValue(6) + " to " + mikecrosoftHouseLatLng.toUrlValue(6) + " failed: " + status);
                    }
                });
            });

        }, (err) => {
            console.log(err);
        });

    }

}
