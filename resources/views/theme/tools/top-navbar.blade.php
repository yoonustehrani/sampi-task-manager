<div class="col-12 navbar-top">
    <div>
        <div class="admin-info-container float-left">
            <a href="#" class="float-left mr-2">
                <img src="{{ asset(auth()->user()->avatar_pic ?: 'images/male-avatar.svg') }}" alt="{{ auth()->user()->name }} profile photo">
            </a>
            <div>
                <p class="admin-email-link">{{ auth()->user()->email }}</p>
                <div class="btn-group drop-down-container">
                    <button type="button" class="btn btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-user-tie"></i> {{ auth()->user()->name }}
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="{{ route('task-manager.users.edit', auth()->user()->id) }}">تنظیمات <i class="fas fa-cog"></i></a>
                        <a id="logout-dropdown" href="#" class="dropdown-item">خروج <i class="fas fa-sign-out-alt"></i></a>
                    </div>
                </div>
            </div>
        </div>
        <button data-event="max" class="btn scr-controller float-right vertical-centerlize d-none d-md-inline">
            <i class="fas fa-expand-arrows-alt fa-compress"></i>
        </button>
        <button class="btn btn-secondary float-right vertical-centerlize collapser-btn">
            <i class="fas fa-angle-double-left"></i>
        </button>
    </div>
</div>