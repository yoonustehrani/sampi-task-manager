@extends('theme.panel')

@section('page-content')
    <div class="analysis-boxes analysis-container">
        <div class="float-left col-md-3 col-12 projects">
            <a href="#" class="item-link">
                <i class="float-right dashboard-item fas fa-project-diagram fa-3x"></i>
                <div>
                    <span class="float-right dashboard-item">۶</span>
                    <span class="float-right dashboard-item">پروژه های من</span>
                </div>
            </a>
        </div>
        <div class="float-left col-md-3 col-12 finished-tasks">
            <a href="#" class="item-link">
                <i class="float-right dashboard-item fas fa-check-double fa-3x"></i>
                <div>
                    <span class="float-right dashboard-item">۲۰</span>
                    <span class="float-right dashboard-item">وظایف انجام شده</span>
                </div>
            </a>
        </div>
        <div class="float-left col-md-3 col-12 tickets finished-demands">
            <a href="#" class="item-link">
                <i class="float-right dashboard-item fas fa-check fa-3x"></i>
                <div>
                    <span class="float-right dashboard-item">۱۵</span>
                    <span class="float-right dashboard-item">خواسته های انجام شده</span>
                </div>
            </a>
        </div>
        <div class="float-left col-md-3 col-12 tickets delayed-tasks">
            <a href="#" class="item-link">
                <i class="float-right dashboard-item fas fa-hourglass-end fa-3x"></i>
                <div>
                    <span class="float-right dashboard-item">3</span>
                    <span class="float-right dashboard-item">وظایف عقب افتاده</span>
                </div>
            </a>
        </div>
        <div class="float-left col-md-3 col-12 tickets current-tasks">
            <a href="#" class="item-link">
                <i class="float-right dashboard-item fas fa-tasks fa-3x"></i>
                <div>
                    <span class="float-right dashboard-item">5</span>
                    <span class="float-right dashboard-item">وظایف جاری</span>
                </div>
            </a>
        </div>
        <div class="float-left col-md-3 col-12 tickets current-demands">
            <a href="#" class="item-link">
                <i class="float-right dashboard-item fas fa-list-alt fa-3x"></i>
                <div>
                    <span class="float-right dashboard-item">3</span>
                    <span class="float-right dashboard-item">خواسته های جاری</span>
                </div>
            </a>
        </div>
    </div>
    <div id="react-dashboard"></div>
    <script src="{{ asset('/js/dashboard.js') }}"></script>
@endsection