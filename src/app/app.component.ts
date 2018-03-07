import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RestListPage } from '../pages/rest-list/rest-list';
import { PositionPage } from '../pages/position/position';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, icon: string,  component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Accueil', icon: 'home', component: HomePage },
      { title: 'Liste', icon: 'search', component: ListPage }, 
      { title: 'Gérer l\'emplacement', icon: 'locate', component: PositionPage }, 
      { title: 'Ecron vérouillé', icon: 'lock', component: ListPage }, 
      { title: 'Notification', icon: 'notifications', component: ListPage }, 
      { title: 'Liste des pays', icon: 'search', component: RestListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
