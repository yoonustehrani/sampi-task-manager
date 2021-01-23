<?php

namespace App\Policies;

use App\User;
use App\Workspace;
use Illuminate\Auth\Access\HandlesAuthorization;

class WorkspacePolicy
{
    use HandlesAuthorization;

    public function before($user, $ability)
    {
        if ($user->hasRole('developer')) {
            return true;
        }
    }

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return $user->hasPermission('can_view_any_workspaces');
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\User  $user
     * @param  \App\Workspace  $workspace
     * @return mixed
     */
    public function view(User $user, Workspace $workspace)
    {
        $user_can_view = $workspace->users->filter(function($workspace_user) use($user) {
            return $user->id == $workspace_user->id;
        })->first();
        return (!! $user_can_view) ?: $user->hasPermission('can_view_any_workspaces');
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return !! $user->hasPermission('can_create_workspaces');
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\Workspace  $workspace
     * @return mixed
     */
    public function update(User $user, Workspace $workspace)
    {
        $user_can_view = $workspace->admins->filter(function($workspace_user) use($user) {
            return $user->id == $workspace_user->id;
        })->first();
        return (!! $user_can_view) ?: $user->hasPermission('can_update_any_workspaces');
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Workspace  $workspace
     * @return mixed
     */
    public function delete(User $user, Workspace $workspace)
    {
        $user_can_view = $workspace->admins->filter(function($workspace_user) use($user) {
            return $user->id == $workspace_user->id;
        })->first();
        return (!! $user_can_view) ?: $user->hasPermission('can_delete_any_workspaces');
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\User  $user
     * @param  \App\Workspace  $workspace
     * @return mixed
     */
    public function restore(User $user, Workspace $workspace)
    {
        return $user->hasPermission('can_restore_workspaces');
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Workspace  $workspace
     * @return mixed
     */
    public function forceDelete(User $user, Workspace $workspace)
    {
        return $user->hasPermission('can_force_delete_workspaces');
    }
}
