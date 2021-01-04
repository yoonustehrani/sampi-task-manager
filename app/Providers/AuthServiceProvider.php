<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        \App\Demand::class => \App\Policies\DemandPolicy::class,
        \App\Permission::class => \App\Policies\PermissionPolicy::class,
        \App\Role::class => \App\Policies\RolePolicy::class,
        \App\Task::class => \App\Policies\TaskPolicy::class,
        \App\User::class => \App\Policies\UserPolicy::class,
        \App\Workspace::class => \App\Policies\WorkspacePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
