let Highcharts = require('highcharts');
let moment = require('moment-timezone');

import {abbreviateNumber} from '../../filters/filters';


export default function (container, ttd, apn) {

    let containerOptions;

    if (container) {
        containerOptions = {
            chart: {
                type: 'column',
                renderTo: document.getElementById(container),
                backgroundColor: 'rgba(255, 255, 255, 0)'
            },
            title: {
                text: ''
            },
            legend: {
                useHTML: true,
                enabled: true,
                labelFormatter: function(){
                  return this.name ;
                },
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'top',
                floating: false,
                // x: 45,
                y: 0,
                itemStyle: {
                    fontSize:'13px'
                },
            },
            subtitle: {
                text: ''
            },
            xAxis: {

                min: 0,
                categories: ttd.map(item => {
                    return moment(item.date).format("MMM");
                }),
                labels: {
                    enabled: true,
                    style:{
                        fontSize: 13
                    }
                },
                gridLineColor: 'transparent',
                lineWidth: 1,
                lineColor: '#cdcdcd',
                tickWidth: 0

            },
            yAxis: {
                maxPadding: 0,
                tickWidth: 0,
                title: {
                    text: null
                },
                min: 0,
                labels: {
                    style:{
                        fontSize: 13
                    }
                },
                gridLineColor: 'transparent',
                lineWidth: 1,
                lineColor: '#cdcdcd'
            },
            tooltip: {
                enabled: false
            },
            plotOptions: {
                series: {
                    maxPointWidth: 30,
                    pointPadding: 0,
                    groupPadding: 0.1
                }
            },

            credits: {
                enabled: false
            },
            series: [
                {
                    name: 'The Trade Desk',
                    color: '#456296',
                    data: ttd.map(item => {
                        return item.impressions
                    })
                },
                {
                    name: 'AppNexus',
                    color: "#23776A",
                    data: apn.map(item => {
                        return item.impressions
                    })
                }
            ]
        }
    }

    return {
        chart: (containerOptions ? new Highcharts.Chart(containerOptions) : null)
    }
}