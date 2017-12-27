let Highcharts = require('highcharts');
let moment = require('moment-timezone');

export default function (container, data, color, averege) {

    let containerOptions;

    if (container) {
        containerOptions = {
            chart: {
                type: 'area',
                renderTo: document.getElementById(container),
                backgroundColor: 'rgba(255, 255, 255, 0)',
                events: {
                    load: function () {
                        let lastPoint = this.series[0].points.length - 1;
                        let p = this.series[0].points[lastPoint];
                        this.tooltip.refresh(p);
                    }
                }
            },
            title: {
                text: ''
            },
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            xAxis: {
                labels: {
                    formatter: function () {
                        return moment(this.value).format("MMM")
                    }
                }

            },
            yAxis: {
                title: {
                    text: false
                },
                labels: {
                    style:{
                        fontSize: 13
                    }
                },
                lineWidth: 1,
                lineColor: '#cdcdcd',
                gridLineColor: 'transparent',
                plotLines: [{
                    dashStyle: "Dash",
                    color: '#9c9c9c',
                    value: averege,
                    width: '2',
                    zIndex: 1,
                    label: {
                        text: 'Daily Avg',
                        style: {color: '#9c9c9c'}
                    }
                }],
                plotBands: [{
                    color: 'orange',
                    from: 3,
                    to: 4
                }],
            },
            plotOptions: {
                area: {
                    color: color ? color : '#cdcdcd',
                    fillOpacity: 0.2,
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            tooltip: {
                useHTML: true,
                formatter: function () {
                    let date = moment(this.point.x).calendar();
                    let i = date.indexOf(' at ');
                    let s = i === -1 ? date : date.substr(0, i);

                    return (
                        ` <h4>${s}</h4>
                        <h3>
                            <b>${this.y.toLocaleString('en')}</b>
                        </h3>`
                    )
                }
            },
            series: [{
                data: data.map((i) => {
                    return {
                        x: new Date(i.date).getTime(),
                        y: i.value
                    }
                })
            }]

        }

    }
    return {
        chart: (containerOptions ? new Highcharts.Chart(containerOptions) : null)
    }
}