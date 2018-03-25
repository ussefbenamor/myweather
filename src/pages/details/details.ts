import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { LocalizationProvider } from '../../providers/localization/localization';
import { Weather3Hour } from '../../model/weatherHour';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  public idParam: number;
  public nameParam: string;
  weather3Hours: Weather3Hour[];
  errorMessage: string;
  public title: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public localizationService: LocalizationProvider, public geolocation: Geolocation) {
    this.idParam = navParams.get('id');
    this.nameParam = navParams.get('name');
    this.title = "Details " + this.nameParam;
    console.log(this.idParam)
  }
  getWeatherPer3hours(cityId: string, country: string) {
    this.localizationService.get3hours(cityId, country)
      .subscribe(
        weathers => {
          if (weathers.length > 0) {
            this.weather3Hours = weathers as Weather3Hour[];
          } else {
            this.title = 'Not found'
          }
          console.log(weathers)
        },
        error => this.errorMessage = <any>error);
  }
  ionViewDidLoad() {
    this.title = "Details Day " + this.nameParam;
    this.getWeatherPer3hours("102509293", "fr");
    console.log('ionViewDidLoad DetailsPage');
  }
  formatDate(date: string){
    return date.substr(0, 4).concat("/").concat(date.substr(4, 2)).concat("/").concat(date.substr(6, 2));
  }
}
