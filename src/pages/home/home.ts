import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';
import 'chartjs-plugin-datalabels';
import { HomeService } from './home.service';
import { DetailsPage } from '../details/details';
import { LocalizationProvider } from '../../providers/localization/localization';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { ChartConfig } from './Chart.config';
import { Country } from '../../model/Country';
import { Weather3Hour } from '../../model/weatherHour';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  minWeather: number = 0;
  maxWeather: number = 0;
  currentWeather: Weather3Hour = new Weather3Hour();
  weather3Hours: any[];
  todaysWeather: any[];
  splash = true;
  homeElement: any;
  countries: Country[];
  errorMessage: string;
  currentTime: string;
  currentDate: string;
  title = 'loading';
  icon: string;
  // lineChart,

  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = ["01:00", "04:00", "07:00", "10:00", "13:00", "16:00", "19:00", "22:00", "05:00", "08:00", "11:00", "14:00", "17:00", "20:00", "23:00", "02:00", "05:00", "08:00", "11:00", "14:00", "17:00", "20:00", "23:00", "02:00", "05:00", "08:00", "11:00", "14:00", "17:00", "20:00", "23:00", "02:00", "05:00", "08:00", "11:00", "14:00", "17:00", "20:00", "23:00"];
  public lineChartIcons: Array<any> = [];
  public lineChartOptions: any;
  public lineChartColors: Array<any>;
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  // barChart
  public barChartData: Array<any>;

  public barChartLabels: Array<any> = ['THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED'];
  public barChartOptions: any;
  public barChartColors: Array<any>;
  public barChartLegend: boolean = true;
  public barChartType: string = 'bar';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor(public navCtrl: NavController, public homeService: HomeService, public localizationService: LocalizationProvider, public geolocation: Geolocation) {

  }

  getWeatherPer3hours(cityId: string, country: string) {
    this.localizationService.get3hours(cityId, country)
      .subscribe(
        weathers => {
          if (weathers.length > 0) {
            this.weather3Hours = weathers as Weather3Hour[];
            this.todaysWeather = [];
            this.getTodaysWeather();
            this.getCurrentWeather();
            this.updateLineCharts();
          } else {
            this.title = 'Not found'
          }
          console.log(weathers)
        },
        error => this.errorMessage = <any>error);
  }
  getCurrentWeather() {
    for (let index = 0; index < this.todaysWeather.length; index++) {
      const element = this.todaysWeather[index];
      if (this.isTheNearest(element.hourevent)) {
        this.currentWeather = element;
      }
    }
    this.maxWeather = Math.max.apply(Math, this.todaysWeather.map(function (o) { return +o.temp; }))
    this.minWeather = Math.min.apply(Math, this.todaysWeather.map(function (o) { return +o.temp; }))
    console.log("MAX" + this.maxWeather)
    console.log("MIN" + this.minWeather)
  }
  getTodaysWeather() {
    let j = 0;
    let currentDate = this.getDateAPIFormat();
    for (let index = 0; index < this.weather3Hours.length; index++) {
      const element = this.weather3Hours[index];
      if (element.dateevent == currentDate) {
        this.todaysWeather[j++] = element;
      }
    }
  }

  updateLineCharts(): any {
    this.lineChartData = this.homeService.getLineData(this.weather3Hours);
    this.lineChartIcons = this.homeService.getLineIcons(this.weather3Hours);
    this.lineChartLabels = this.homeService.getLineLabels(this.weather3Hours);
  }

  ngOnInit() {

    this.getWeatherPer3hours("102509293", "fr");
    this.lineChartData = this.homeService.getStaticLineData();
    this.lineChartOptions = ChartConfig.lineChartOptions;
    this.lineChartColors = ChartConfig.lineChartColors;
    this.barChartColors = ChartConfig.barChartColors;
    this.barChartOptions = ChartConfig.barChartOptions;

    this.showCurrentTimeAndDate();
  }

  showCurrentTimeAndDate(): any {
    let temp = this;
    setInterval(() => {
      // a cleaner way than string concatenation
      let now = new Date();
      let optionsdate = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
      let optionstime = { hour: '2-digit', minute: '2-digit' };

      // set the content of the element with the ID time to the formatted string
      temp.currentDate = now.toLocaleString('fr-FR', optionsdate);
      temp.currentTime = now.toLocaleString('fr-FR', optionstime);
    }, 1000);
  }
  ionViewDidLoad() {
    this.icon = this.makeRandomChar();
    this.geolocate();
    setTimeout(() => {
      this.splash = false;
    }, 4000);

    this.getDateAPIFormat();
    this.getTimeAPIFormat();
  }

  goDetails(dayNumber: number, dayName: string) {
    this.navCtrl.push(DetailsPage, {
      id: dayNumber,
      name: dayName
    });
  }
  isTheNearest(time: string): boolean {
    let current = this.getTimeAPIFormat();
    if (current == time) {
      return true;
    } else if (Math.abs(this.getHourInt(time) - this.getHourInt(current)) <= 2) {
      //difference in hours is less then two hours then put it as the current weather;
      return true;
    } else {
      return false;
    }
  }
  getHourInt(time: string): number {
    let date = time.split(":");
    return +date[0];
  }
  getDateAPIFormat(): string {
    let now = new Date();
    let optionsdate = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return now.toLocaleString('fr-FR', optionsdate).split("/").reverse().join("");
  }
  getTimeAPIFormat() {
    let now = new Date();
    let optionstime = { hour: '2-digit', minute: '2-digit' };
    let date = now.toLocaleString('fr-FR', optionstime).split(":");
    return date[0] + ":00";
  }

  getCities(long: string, lat: string, country: string) {
    this.localizationService.getCities(long, lat, country)
      .subscribe(
        cities => {
          if (cities.length > 0) {
            this.title = cities[0]['ville'].charAt(0).toUpperCase() + cities[0]['ville'].slice(1).toLowerCase();
          } else {
            this.title = 'Not found'
          }
          console.log(cities)
        },
        error => this.errorMessage = <any>error);
  }

  geolocate() {
    let options = {
      enableHighAccuracy: true
    };
    this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
      this.getCities(String(position.coords.longitude), String(position.coords.latitude), 'FR');
    }).catch((err) => {
      alert(err);
    })

  }

  makeRandomChar() {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return possible.charAt(Math.floor(Math.random() * possible.length));

  }
}
