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
        {{-- let data = {{ $month_task->__toString() }}; --}}
        let data = [
            @foreach($task_days as $task_day)
            {
                y: {{ $task_day->percentage }},
                t: moment("{{ $task_day->date->format('Y-m-d') }}").format("jYYYY-jMM-jDD")
            },
            @endforeach
        ];
        // var startDate = moment('2020-12-21').format('jYYYY-jMM-jDD');
        // var endDate = moment('2021-01-20').format('jYYYY-jMM-jDD');
        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                {{-- // labels: {!! $month_name->__toString() !!}, --}}
                // labels: [startDate, endDate],
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
                                source: 'auto',
                                fontFamily: 'Iransans'
                            },
                            distribution: 'series',
                            type: 'time',
                            time: {
                                round: true,
                                unit: 'day',
                                minUnit: 'day',
                                tooltipFormat: 'dddd، DD MMMM jYYYY',
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
                            fontFamily: 'Iransans',
                            suggestedMin: 0,
                            suggestedMax: 100,
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