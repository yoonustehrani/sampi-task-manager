<?php

namespace App\Policies;

use App\User;
use App\Workspace;
use Illuminate\Auth\Access\HandlesAuthorization;

class WorkspacePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        //
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
        //
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
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
        //
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
        //
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
        //
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
        //
    }
}
