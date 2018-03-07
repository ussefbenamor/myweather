import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListCityProviderData } from '../../providers/list-city/list-city';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  searchTerm: string = '';
  searchControl: FormControl;
  items: any;
  searching: any = false;

  constructor(public navCtrl: NavController, public dataService: ListCityProviderData) {
    this.searchControl = new FormControl();
  }

  ionViewDidLoad() {

    this.setFilteredItems();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.setFilteredItems();

    });
  }
  onSearchInput() {
    this.searching = true;
  }

  setFilteredItems() {

    this.items = this.dataService.filterItems(this.searchTerm);

  }
}
