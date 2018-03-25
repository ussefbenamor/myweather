import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RestListPage } from '../pages/rest-list/rest-list';
import { DetailsPage } from '../pages/details/details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { HomeService } from '../pages/home/home.service';
import { ListCityProviderData } from '../providers/list-city/list-city';
import { SearchPipe } from '../pipes/search/search';
import { SortPipe } from '../pipes/sort/sort';
import { RestApiProvider } from '../providers/rest-api/rest-api';
import { PositionPage } from '../pages/position/position';
import { LocalizationProvider } from '../providers/localization/localization';
import { GlobalService } from '../shared/global.service';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RestListPage, 
    SearchPipe,
    SortPipe,
    PositionPage,
    DetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartsModule, 
    HttpClientModule, 
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage, 
    RestListPage, 
    PositionPage, 
    DetailsPage
  ],
  providers: [
    HomeService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    ListCityProviderData, 
    RestApiProvider,
    LocalizationProvider,
    GlobalService, 
    Geolocation
  ], exports:[
    HomePage
  ]
})
export class AppModule {}
