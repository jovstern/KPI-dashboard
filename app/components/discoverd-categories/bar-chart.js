var Highcharts = require('highcharts');

export default function (container, data, todayTrends) {
    const max = 100;

    var dataNames = data.map(i => i.name);

    var dataValuesPrec = data.map(i => {
        if(i.value !== 0){
            return  Math.round((i.value  / todayTrends) * 100) ;
        }
            return 0;
    });


    var nData = dataValuesPrec.map((i => {
        return max - i;
    }));

    let containerOptions;

    if (container) {
        containerOptions = {
            chart: {
                type: 'bar',
                renderTo: document.getElementById(container),
                backgroundColor: 'rgba(255, 255, 255, 0)'
            },
            title: {
                text: ''
            },
            legend: {
                enabled: false
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                min: 0,
                categories: dataNames,
                labels: {
                    enabled: false
                },
                gridLineColor: 'transparent',
                lineWidth: 0,
                tickWidth: 0
            },
            yAxis: {
                max: max,
                maxPadding: 0,
                tickWidth: 0,
                title: {
                    text: null
                },
                min: 0,
                labels: {
                    enabled: false
                },
                gridLineColor: 'transparent',
                lineWidth: 0
            },
            tooltip: {
                enabled: false
            },
            plotOptions: {
                bar: {

                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return this.x + " " + this.y
                        },
                        verticalAlign: 'middle',
                        align: 'left',
                        useHTML: true
                    }
                },
                series: {
                    stacking: 'normal',
                    pointWidth: 40,
                    pointPadding: 0,
                    groupPadding: 0.1
                }
            },

            credits: {
                enabled: false
            },
            series: [
                {
                    dataLabels: {
                        enabled: false,
                        align: 'right',
                    },
                    color: '#E2E2E2',
                    data: nData,
                    formatter: function () {
                        return `${this.y}`
                    }
                },
                {
                    dataLabels: {

                        enabled: true,
                        inside: false,
                        formatter: function () {
                            return `${this.x} ${this.y}%`
                        }
                    },
                    color: "#4D648A",
                    data: dataValuesPrec
                }
            ]
        }
    }

    return {
        chart: (containerOptions ? new Highcharts.Chart(containerOptions) : null)
    }
}