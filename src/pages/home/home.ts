import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';
import 'chartjs-plugin-datalabels';
import { HomeService } from './home.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // lineChart
  public lineChartData: Array<any>;

  public lineChartLabels: Array<any> = ['23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00'];
  public lineChartOptions: any = {
    responsive: true,
    legend: {
      display: false,
      labels: {
        fontColor: "white",
        fontSize: 18
      }
    },
    scales: {
      yAxes: [{
        stacked: true, 
        gridLines: {
          display: false 
        },
        ticks: {
          display: false, 
          fontColor: "white",
          fontSize: 8,
          beginAtZero: true
        }
      }],
      xAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          
          fontColor: "white",
          fontSize: 10,
          stepSize: 1,
          beginAtZero: true
        }
      }]
    }, 
    plugins: {
      datalabels: {
        align: 'bottom',
        anchor: 'bottom',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 4,
        color: 'white',
        font: {
          size: 10, 
          weight: 'bold'
        },
        formatter: function (value, context) {
          return Math.round(value) + '°';
        }, 
        
      }
    },
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderColor: 'yellow',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: 'white',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }

  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  // barChart
  public barChartData: Array<any> ;

  public barChartLabels: Array<any> = ['THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED'];
  public barChartOptions: any = {
 
    responsive: true,
    legend: {
      display: false,
      labels: {
        fontColor: "white",
        fontSize: 18
      }
    },
    scales: {
      yAxes: [{
        stacked: true,
        gridLines: {
          display: false
        },
        ticks: {
          display: false,
          fontColor: "white",
          fontSize: 8,
          beginAtZero: true
        }
      }],
      xAxes: [{
           barThickness : 10,
    maxBarThickness : 10,
    barPercentage: 0.8,
    categoryPercentage: 0.8,
        gridLines: {
          display: false
        },
        ticks: {
          fontColor: "white",
          fontSize: 10,
          stepSize: 1,
          beginAtZero: true
        }
      }]
    },
    plugins: {
      datalabels: {
        align: 'bottom',
        anchor: 'bottom',
        backgroundColor: 'rgba(0,0,0,1)',
        borderRadius: 4,
        color: 'white',
        font: {
          size: 10,
          weight: 'bold'
        },
        formatter: function (value, context) {
          return Math.round(value) + '°';
        },

      }
    },
  };
  public barChartColors: Array<any> = [
    { // grey
        backgroundColor: "yellow",
        borderColor: "#FEB916",
    }

  ];
  public barChartLegend: boolean = true;
  public barChartType: string = 'bar';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  constructor(public navCtrl: NavController, public homeService: HomeService) {

  }
  ngOnInit() {
    this.lineChartData = this.homeService.getLineData();
    this.barChartData = this.homeService.getBarData();
  }

}
