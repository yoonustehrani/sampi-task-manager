<?php

namespace App\Policies;

use App\Demand;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DemandPolicy
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
        return $user->hasPermission('can_view_any_demands');
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\User  $user
     * @param  \App\Demand  $demand
     * @return mixed
     */
    public function view(User $user, Demand $demand)
    {
        if ($user->id == $demand->from_id || $user->id == $demand->to_id) {
            return true;
        }
        return $user->hasPermission('can_view_any_demands');
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->hasPermission('can_create_demands');
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\Demand  $demand
     * @return mixed
     */
    public function update(User $user, Demand $demand)
    {
        return $user->id == $demand->from_id || $user->hasPermission('can_update_any_demands');
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Demand  $demand
     * @return mixed
     */
    public function delete(User $user, Demand $demand)
    {
        return $user->id == $demand->from_id || $user->hasPermission('can_delete_demands');
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\User  $user
     * @param  \App\Demand  $demand
     * @return mixed
     */
    public function restore(User $user, Demand $demand)
    {
        return $user->hasPermission('can_restore_demands');
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Demand  $demand
     * @return mixed
     */
    public function forceDelete(User $user, Demand $demand)
    {
        return $user->hasPermission('can_force_delete_demands');
    }

    public function toggle_state(User $user, Demand $demand)
    {
        return $user->id == $demand->to_id || $user->hasPermission('can_update_any_demands');
    }
}
