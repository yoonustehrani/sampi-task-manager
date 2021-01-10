<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Chart.js</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>
    <div class="col-md-6 float-left p-3">
        <canvas id="myChart" aria-label="Hello ARIA World" role="img"></canvas>
    </div>
    <script src="{{ asset('js/app.js') }}"></script>
    <script src="{{ asset('js/chart.js') }}"></script>
    <script>
        let ctx = document.getElementById('myChart');
        let data = [
            {
                y: 1,
                t: moment("2021-01-1")
            },
            {
                y: 1,
                t: moment("2021-01-2")
            },
            {
                y: 2,
                t: moment("2021-01-3")
            },
            {
                y: 3,
                t: moment("2021-01-4")
            },
            {
                y: 2,
                t: moment("2021-01-5")
            },
            {
                y: 2,
                t: moment("2021-01-6")
            },
            {
                y: 6,
                t: moment("2021-01-8")
            },
            {
                y: 1,
                t: moment("2021-01-9")
            }
            // {
            //     t: moment('2021-01-02'),
            //     y: 0
            // },
            // {
            //     t: moment('2021-01-03'),
            //     y: 100
            // },
            // {
            //     t: moment('2021-01-05'),
            //     y: 100
            // },
            // {
            //     t: moment('2021-01-06'),
            //     y: 100
            // },
            // {
            //     t: moment('2021-01-12'),
            //     y: 50
            // },
            // {
            //     t: moment('2021-01-14'),
            //     y: 60
            // },
            // {
            //     t: moment('2021-01-16'),
            //     y: 40
            // },
            // {
            //     t: moment('2021-01-17'),
            //     y: 100
            // },
            // {
            //     t: moment('2021-01-18'),
            //     y: 100
            // }
        ];
        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: 'وظایف',
                        // showLine: false,
                        // lineTension: 0,
                        data: data,
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
                                source: 'data',
                                fontFamily: 'Iransans'
                            },
                            distribution: 'series',
                            type: 'time',
                            time: {
                                round: true,
                                unit: 'day',
                                minUnit: 'day',
                                tooltipFormat: 'dddd، DD MMMM YYYY',
                                displayFormats: {
                                    'day': 'YYYY-MM-DD'
                                },
                            }
                        }
                    ],
                    yAxes: [{
                        stacked: false,
                        ticks: {
                            beginAtZero: true,
                            fontFamily: 'Iransans'
                        }
                    }]
                },
                elements: {
                    // point: {
                    //     pointBackgroundColor: '',
                    //     pointBorderColor: '',
                    //     pointBorderWidth: '',
                    // },
                    // lines: {
                    //     backgroundColor: 'red',
                    // }
                }
            }
        });
        // new Chart(document.getElementById("chartjs-0"),{"type":"line","data":{"labels":["January","February","March","April","May","June","July"],"datasets":[{"label":"My First Dataset","data":[65,59,80,81,56,55,40],"fill":false,"borderColor":"rgb(75, 192, 192)","lineTension":0.1}]},"options":{}});
//         var myChart = new Chart(ctx, {
//             type: 'line',
//             data: {
//                 labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//                 datasets: [{
//                     label: '# of Votes',
//                     data: [12, 19, 3, 5, 2, 3],
//                     backgroundColor: [
//                         'rgba(255, 99, 132, 0.4)',
//                         // 'rgba(255, 99, 132, 0.1)',
//                         // 'rgba(255, 99, 132, 0.1)',
//                         // 'rgba(255, 99, 132, 0.1)',
//                         // 'transparent'
//                     ],
//                     borderColor: [
//                         'rgba(255, 99, 132, 1)',
//                         'rgb(0,0,0)',
//                         'rgb(0,0,0)',
//                         'rgb(0,0,0)',
//                         'rgb(0,0,0)',
//                         'rgb(0,0,0)',
//                     ],
//                     borderWidth: 3
//                 }]
//             },
//             options: {
//                 legend: {
//                     display: true,
//                     labels: {
//                         fontColor: 'rgb(255, 99, 132)'
//                     }
//                 },
//                 title: {
//                     display: true,
//                     text: 'کردن کان'
//                 },
//                 responsiveAnimationDuration: 500,
//                 scales: {
//                     yAxes: [{
//                         ticks: {
//                             beginAtZero: true
//                         }
//                     }]
//                 },
//             }
// });
    </script>
</body>
</html>