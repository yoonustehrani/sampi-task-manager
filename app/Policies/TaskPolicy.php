<?php

namespace App\Policies;

use App\Task;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TaskPolicy
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
        return $user->hasPermission('can_view_any_tasks');
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\User  $user
     * @param  \App\Task  $task
     * @return mixed
     */
    public function view(User $user, Task $task)
    {
        $user_can_view = $task->users->filter(function($task_user) use($user) {
            return $user->id == $task_user->id;
        })->first();
        if (! $user_can_view) {
            $task->workspace->load('admins');
            $user_can_view = $task->workspace->admins->filter(function($workspace_admin) use($user) {
                return $user->id == $workspace_admin->id;
            })->first();
        }
        return (!! $user_can_view) ?: $user->hasPermission('can_view_any_tasks');
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->hasPermission('can_create_tasks');
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\Task  $task
     * @return mixed
     */
    public function update(User $user, Task $task)
    {
        if ($task->creator_id == $user->id || $user->hasPermission('can_update_any_tasks')) {
            return true;
        }
        $user_can_view = $task->users->filter(function($task_user) use($user) {
            return $user->id == $task_user->id;
        })->first();
        if (! $user_can_view) {
            $task->workspace->load('admins');
            $user_can_view = $task->workspace->admins->filter(function($workspace_admin) use($user) {
                return $user->id == $workspace_admin->id;
            })->first();
        }
        return !! $user_can_view;
    }

    public function update_users(User $user, Task $task)
    {
        if ($task->creator_id == $user->id || $user->hasPermission('can_update_any_tasks')) {
            return true;
        }
        $user_can_view = $task->workspace->admins->filter(function($workspace_admin) use($user) {
            return $user->id == $workspace_admin->id;
        })->first();
        return !! $user_can_view;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Task  $task
     * @return mixed
     */
    public function delete(User $user, Task $task)
    {
        return $user->id == $task->creator_id || $user->hasPermission('can_delete_tasks');
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\User  $user
     * @param  \App\Task  $task
     * @return mixed
     */
    public function restore(User $user, Task $task)
    {
        return $user->hasPermission('can_restore_tasks');
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Task  $task
     * @return mixed
     */
    public function forceDelete(User $user, Task $task)
    {
        return $user->hasPermission('can_force_delete_tasks');
    }
}
