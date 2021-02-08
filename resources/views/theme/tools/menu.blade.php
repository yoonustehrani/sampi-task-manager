<nav>
    <ul class="horizental-menu col-12">
        <li>
            <a href="{{ route('task-manager.') }}">داشبورد <i class="fas fa-tachometer-alt"></i></a>
        </li>
        <li>
            <a href="{{ route('task-manager.workspaces.index') }}">پروژه ها <i class="fas fa-project-diagram"></i></a>
        </li>
        <li>
            <a href="{{ route('task-manager.tasks.index') }}">مسئولیت ها <i class="fas fa-briefcase"></i></a>
        </li>
        <li>
            <a href="{{ route('task-manager.demands.mixed', ['tab' => 'asked_demands']) }}">درخواست ها <i class="fas fa-arrow-down"></i><i class="fas fa-list"></i></a>
        </li>
        <li>
            <a href="{{ route('task-manager.demands.mixed', ['tab' => 'demand']) }}">نیازها <i class="fas fa-arrow-up"></i><i class="fas fa-list"></i></a>
        </li>
        @if (auth()->user()->hasPermission('can_manage_system'))
        <li class="has_sub">
            <p>
                <a href="#demands">
                    مدیریت سیستمی <i class="fas fa-desktop"></i>
                </a>
                <i class="opener fa fa-angle-left"></i>
            </p>
            <ul>
                @can('viewAny', \App\User::class)
                <li class="sub">
                    <a href="{{ route('task-manager.users.index') }}">کاربران <i class="fas fa-users"></i></a>
                </li>
                @endcan
                @can('viewAny', \App\Role::class)
                <li class="sub">
                    <a href="{{ route('task-manager.roles.index') }}">سمت ها <i class="fas fa-user-tag"></i></a>
                </li>
                @endcan
                @can('viewAny', \App\Permission::class)
                <li class="sub">
                    <a href="{{ route('task-manager.permissions.index') }}">مجوز ها <i class="far fa-address-card"></i></a>
                </li>
                @endcan
                @if (auth()->user()->hasRole('developer'))
                <li class="sub">
                    <a href="{{ route('task-manager.priorities.index') }}">اولویت ها <i class="fas fa-list-ol"></i></a>
                </li>
                @endif
            </ul>
        </li>
        @endif
        <li>
            <a href="#" id="toggle-logout">خروج <i class="fas fa-power-off"></i></a>
        </li>
        <form class="d-none" id="logout-form" action="{{ route('logout') }}" method="POST">@csrf</form>
    </ul>
</nav>