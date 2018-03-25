export class ChartConfig {
    static lineChartOptions = {
        responsive: false,
        maintainAspectRatio: false,
        legend: {
            display: false,
            labels: {
                boxWidth: 50,
                fontColor: "white",
                fontSize: 18
            }
        },
        scales: {
            yAxes: [{
                stacked: true,
                gridLines: {
                    display: true
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
                    fontColor: "transparent",
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

    static lineChartColors = [
        {
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderColor: 'yellow',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: 'white',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }

    ];

    static barChartOptions = {

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
                barThickness: 10,
                maxBarThickness: 10,
                barPercentage: 0.8,
                categoryPercentage: 0.8,
                gridLines: {
                    display: false
                },
                ticks: {
                    display: false,
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

    static barChartColors = [
        {
            backgroundColor: 'yellow',
            borderColor: "#FEB916",
        }

    ];
}