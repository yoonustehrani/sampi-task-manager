<nav>
    <ul class="horizental-menu col-12">
        <li>
            <a href="{{ route('task-manager.') }}">داشبورد <i class="fas fa-tachometer-alt"></i></a>
        </li>
        <li class="has_sub">
            <p>
                <a href="#demands">
                    مدیریت سیستمی<i class="fas fa-desktop"></i>
                </a>
                <i class="opener fa fa-angle-left"></i>
            </p>
            <ul>
                <li class="sub">
                    <a href="{{ route('task-manager.users.index') }}">کاربران <i class="fas fa-users"></i></a>
                </li>
                <li class="sub">
                    <a href="{{ route('task-manager.roles.index') }}">سمت ها <i class="fas fa-user-tag"></i></a>
                </li>
                <li class="sub">
                    <a href="{{ route('task-manager.permissions.index') }}">مجوز ها <i class="far fa-address-card"></i></a>
                </li>
                <li class="sub">
                    <a href="{{ route('task-manager.proiorities.index') }}">اولویت ها <i class="fas fa-list-ol"></i></a>
                </li>
            </ul>
        </li>
        <li class="has_sub">
            <p>
                <a href="#demands">
                    نیاز ها<i class="fab fa-stack-exchange"></i>
                </a>
                <i class="opener fa fa-angle-left"></i>
            </p>
            <ul>
                <li class="sub"><a href="">ضروری و مهم<i class="fas fa-hourglass-end"></i></a></li>
                <li class="sub"><a href="">ضروری و غیر مهم<i class="fas fa-hourglass-half"></i></a></li>
                <li class="sub"><a href="">غیر ضروری و مهم<i class="fas fa-hourglass-start"></i></a></li>
                <li class="sub"><a href="">غیر ضروری و غیر مهم<i class="fas fa-hourglass"></i></a></li>
            </ul>
        </li>
        <li>
            <a href="" id="toggle-logout">
            <i class="fas fa-sign-out-alt"></i> خروج
            </a>
        </li>
        <form class="d-none" id="logout-form" action="{{ route('logout') }}" method="POST">@csrf</form>
    </ul>
</nav>