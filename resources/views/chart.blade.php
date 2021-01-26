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
        // let data = {{ $month_task->__toString() }};
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
        ];
        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                // labels: {!! $month_name->__toString() !!},
                datasets: [
                    {
                        label: 'وظایف',
                        // showLine: false,
                        lineTension: 0,
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
                                    'day': 'YYYY-MM-DD',
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
    </script>
</body>
</html>