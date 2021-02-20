@extends('theme.panel')

@section('title')
حساب کاربری {{ auth()->user()->id == $user->id ? 'من' : $user->fullname }}
@endsection

@section('page-content')
    <div
        id = "user-profile-react"
        workspaces = "{{ route('api.task-manager.workspaces.index', ['api_token' => auth()->user()->api_token]) }}"
        data-mixed-tasks = "{{ route('api.task-manager.tasks.mixed', ['api_token' => auth()->user()->api_token]) }}"
        data-mixed-demands = "{{ route('api.task-manager.demands.mixed', ['api_token' => auth()->user()->api_token]) }}"
        data-chart-completed="{{ route('api.task-manager.chart.tasks', ['type' => 'completed', 'api_token' => auth()->user()->api_token]) }}"
        data-chart-ontime="{{ route('api.task-manager.chart.tasks', ['type' => 'ontime', 'api_token' => auth()->user()->api_token]) }}"
        data-chart-yearly="{{ route('api.task-manager.chart.tasks', ['type' => 'yearly', 'api_token' => auth()->user()->api_token]) }}"
        task-counter = "{{ route('api.task-manager.counter.tasks', ['api_token' => auth()->user()->api_token]) }}"
    ></div>
@endsection

@push('scripts')
    <script>
        const TargetUser = {!! json_encode($user->only(['id', 'fullname', 'avatar_pic', 'name', 'roles'])) !!};
    </script>
    <script src="{{ asset("js/user-profile.js") }}"></script>
    <script src="{{ asset('js/select2.js') }}"></script>
    <script src="{{ asset('js/chart.js') }}"></script>
    <script>
        // let ctx = document.getElementById('myChart');
        // let chart2 = document.getElementById('myChart2')
        // let chart3 = document.getElementById('myChart3')
        // let data = [
        //     {
        //         y: 1,
        //         t: moment("2021-01-1")
        //     },
        //     {
        //         y: 1,
        //         t: moment("2021-01-2")
        //     },
        //     {
        //         y: 2,
        //         t: moment("2021-01-3")
        //     },
        //     {
        //         y: 3,
        //         t: moment("2021-01-4")
        //     },
        //     {
        //         y: 2,
        //         t: moment("2021-01-5")
        //     },
        //     {
        //         y: 2,
        //         t: moment("2021-01-6")
        //     },
        //     {
        //         y: 6,
        //         t: moment("2021-01-8")
        //     },
        //     {
        //         y: 1,
        //         t: moment("2021-01-9")
        //     }
        // ];
        // var startDate = moment('2020-12-21').format('jYYYY-jMM-jDD');
        // var endDate = moment('2021-01-20').format('jYYYY-jMM-jDD');
        // var myLineChart = new Chart(ctx, {
        //     type: 'line',
        //     data: {
        //         labels: [startDate, endDate],
        //         datasets: [
        //             {
        //                 label: 'وظایف',
        //                 // showLine: false,
        //                 lineTension: 0,
        //                 data: data,
        //                 // fill: false,
        //                 borderColor: 'red',
        //                 borderWidth: 1,
        //                 backgroundColor: 'rgba(255,0,0,0.2)',
        //             }
        //         ]
        //     },
        //     options: {
        //         tooltips: {
        //             mode: 'index',
        //             intersect: false,
        //             titleFontFamily: 'Iransans',
        //             bodyFontFamily: 'Iransans'
        //         },
        //         legend: {
        //             labels: {
        //                 fontFamily: 'Iransans'
        //             }
        //         },
        //         scales: {
        //             xAxes: [
        //                 {
        //                     ticks: {
        //                         source: 'labels',
        //                         fontFamily: 'Iransans'
        //                     },
        //                     distribution: 'series',
        //                     type: 'time',
        //                     time: {
        //                         round: true,
        //                         unit: 'day',
        //                         minUnit: 'day',
        //                         tooltipFormat: 'dddd، DD MMMM jYYYY',
        //                         displayFormats: {
        //                             'day': 'YYYY-MM-DD',
        //                         },
        //                     }
        //                 }
        //             ],
        //             yAxes: [{
        //                 stacked: false,
        //                 ticks: {
        //                     beginAtZero: true,
        //                     fontFamily: 'Iransans'
        //                 }
        //             }]
        //         },
        //         elements: {
        //             // point: {
        //             //     pointBackgroundColor: '',
        //             //     pointBorderColor: '',
        //             //     pointBorderWidth: '',
        //             // },
        //             // lines: {
        //             //     backgroundColor: 'red',
        //             // }
        //         }
        //     }
        // });
        // var myLineChart = new Chart(chart2, {
        //     type: 'line',
        //     data: {
        //         {{-- // labels: {!! $month_name->__toString() !!}, --}}
        //         labels: [startDate, endDate],
        //         datasets: [
        //             {
        //                 label: 'وظایف',
        //                 // showLine: false,
        //                 lineTension: 0,
        //                 data: data,
        //                 // fill: false,
        //                 borderColor: 'red',
        //                 borderWidth: 1,
        //                 backgroundColor: 'rgba(255,0,0,0.2)',
        //             }
        //         ]
        //     },
        //     options: {
        //         tooltips: {
        //             mode: 'index',
        //             intersect: false,
        //             titleFontFamily: 'Iransans',
        //             bodyFontFamily: 'Iransans'
        //         },
        //         legend: {
        //             labels: {
        //                 fontFamily: 'Iransans'
        //             }
        //         },
        //         scales: {
        //             xAxes: [
        //                 {
        //                     ticks: {
        //                         source: 'labels',
        //                         fontFamily: 'Iransans'
        //                     },
        //                     distribution: 'series',
        //                     type: 'time',
        //                     time: {
        //                         round: true,
        //                         unit: 'day',
        //                         minUnit: 'day',
        //                         tooltipFormat: 'dddd، DD MMMM jYYYY',
        //                         displayFormats: {
        //                             'day': 'YYYY-MM-DD',
        //                         },
        //                     }
        //                 }
        //             ],
        //             yAxes: [{
        //                 stacked: false,
        //                 ticks: {
        //                     beginAtZero: true,
        //                     fontFamily: 'Iransans'
        //                 }
        //             }]
        //         },
        //         elements: {
        //             // point: {
        //             //     pointBackgroundColor: '',
        //             //     pointBorderColor: '',
        //             //     pointBorderWidth: '',
        //             // },
        //             // lines: {
        //             //     backgroundColor: 'red',
        //             // }
        //         }
        //     }
        // });
        // var myLineChart = new Chart(chart3, {
        //     type: 'line',
        //     data: {
        //         {{-- // labels: {!! $month_name->__toString() !!}, --}}
        //         labels: [startDate, endDate],
        //         datasets: [
        //             {
        //                 label: 'وظایف',
        //                 // showLine: false,
        //                 lineTension: 0,
        //                 data: data,
        //                 // fill: false,
        //                 borderColor: 'red',
        //                 borderWidth: 1,
        //                 backgroundColor: 'rgba(255,0,0,0.2)',
        //             }
        //         ]
        //     },
        //     options: {
        //         tooltips: {
        //             mode: 'index',
        //             intersect: false,
        //             titleFontFamily: 'Iransans',
        //             bodyFontFamily: 'Iransans'
        //         },
        //         legend: {
        //             labels: {
        //                 fontFamily: 'Iransans'
        //             }
        //         },
        //         scales: {
        //             xAxes: [
        //                 {
        //                     ticks: {
        //                         source: 'labels',
        //                         fontFamily: 'Iransans'
        //                     },
        //                     distribution: 'series',
        //                     type: 'time',
        //                     time: {
        //                         round: true,
        //                         unit: 'day',
        //                         minUnit: 'day',
        //                         tooltipFormat: 'dddd، DD MMMM jYYYY',
        //                         displayFormats: {
        //                             'day': 'YYYY-MM-DD',
        //                         },
        //                     }
        //                 }
        //             ],
        //             yAxes: [{
        //                 stacked: false,
        //                 ticks: {
        //                     beginAtZero: true,
        //                     fontFamily: 'Iransans'
        //                 }
        //             }]
        //         },
        //         elements: {
        //             // point: {
        //             //     pointBackgroundColor: '',
        //             //     pointBorderColor: '',
        //             //     pointBorderWidth: '',
        //             // },
        //             // lines: {
        //             //     backgroundColor: 'red',
        //             // }
        //         }
        //     }
        // });
    </script>
@endpush