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
        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: 'my first dataset',
                        data: [
                            {
                                t: moment('2021-01-18'),
                                y: 100
                            },
                            {
                                t: moment('2021-01-16'),
                                y: 40
                            },
                            {
                                t: moment('2021-01-14'),
                                y: 60
                            },
                            {
                                t: moment('2021-01-14'),
                                y: 40
                            },
                            {
                                t: moment('2021-01-12'),
                                y: 50
                            }
                        ],
                        fill: false,
                        borderColor: 'red',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                source: 'data'
                            },
                            type: 'time',
                            time: {
                                round: true,
                                unit: 'day',
                                minUnit: 'day',
                                tooltipFormat: 'MMMM DD, YYYY',
                                displayFormats: {
                                    'day': 'MMMM DD, YYYY'
                                }
                            }
                        }
                    ],
                    yAxes: [{
                        stacked: false,
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                // elements: {
                //     // point: {
                //     //     pointBackgroundColor: '',
                //     //     pointBorderColor: '',
                //     //     pointBorderWidth: '',
                //     // },
                //     // line: {

                //     // }
                // }
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