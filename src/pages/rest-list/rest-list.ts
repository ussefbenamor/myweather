import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

/**
 * Generated class for the RestListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'rest-list',
  templateUrl: 'rest-list.html'
})
export class RestListPage {

  countries: string[];
  errorMessage: string;
  descending: boolean = false;
  order: number;
  column: string = 'name';
  constructor(public navCtrl: NavController, public rest: RestApiProvider) {

  }
  sort() {
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }
  getCountries() {
    this.rest.getCountries()
      .subscribe(
        countries => this.countries = countries,
        error => this.errorMessage = <any>error);
  }

  ionViewDidLoad() {
    this.getCountries();
  }
}
