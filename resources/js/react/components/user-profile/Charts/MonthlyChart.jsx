import React, { Component } from 'react';
import moment from 'moment-jalaali';
moment.locale('fa');
import Chart from 'chart.js';

class MonthlyChart extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        var ctx = document.getElementById(`chart-js-react-${this.props.id}`);
        if (this.props.Data) {
            let labels = [];
            let targetdata = Object.entries(this.props.Data).map(([date, values]) => {
                let {percentage} = values;
                labels.push(moment(date).format('jYYYY/jM/jD'))
                return percentage;
                // return {
                //     y: percentage,
                //     t: moment(date).format('jYYYY/jM/jD')
                // }
            })
            console.log(targetdata);
            var myLineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: this.props.Title,
                            // showLine: false,
                            lineTension: 0,
                            data: targetdata,
                            // fill: false,
                            borderColor: 'red',
                            borderWidth: 1,
                            backgroundColor: 'rgba(255,0,0,0.2)',
                        }
                    ]
                },
                options: {
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                        titleFontFamily: 'Iransans',
                        bodyFontFamily: 'Iransans'
                    },
                    legend: {
                        labels: {
                            fontFamily: 'Iransans'
                        }
                    },
                    scales: {
                        xAxes: [
                            {
                                ticks: {
                                    source: 'labels',
                                    fontFamily: 'Iransans'
                                },
                                distribution: 'series',
                                // type: 'time',
                                // time: {
                                //     round: true,
                                //     unit: 'day',
                                //     minUnit: 'day',
                                //     tooltipFormat: 'dddd، YYYY/M/D',
                                //     displayFormats: {
                                //         'day': 'jYYYY-jM-jD',
                                //     },
                                // }
                            }
                        ],
                        yAxes: [{
                            stacked: false,
                            ticks: {
                                beginAtZero: true,
                                fontFamily: 'Iransans',
                                    suggestedMin: 0,
                                    suggestedMax: 100,
                            }
                        }]
                    },
                }
            });
        }
        return (
            <canvas id={`chart-js-react-${this.props.id}`} aria-label="Hello ARIA World" role="img"></canvas>
        );
    }
}

export default MonthlyChart;