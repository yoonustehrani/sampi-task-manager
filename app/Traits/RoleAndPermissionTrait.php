<?php

namespace App\Traits;

trait RoleAndPermissionTrait {
    public function permissions()
    {
        return $this->belongsToMany(Permission::class);
    }
    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    /**
     * returns true if a user has the target permission(s)
     * @param array|string $permission
     * @return boolean
     */

    public function hasPermission($permission)
    {
        $this->loadPermissions();
        $permissions = $this->roles->pluck('permissions')->flatten()
        ->pluck('key')->unique()->toArray();
        return in_array($permission, $permissions);
    }

    public function hasRole($role)
    {
        $this->loadRoles();
        if (is_string($role)) {
            return $this->roles->contains('name', $role);
        }
        return !! $role->intersect($this->roles)->count();
    }

    public function assignRole($role)
    {
        return $this->roles()->syncWithoutDetaching([$role]);
    }

    public function loadRoles()
    {
        if (! $this->relationLoaded('roles')) {
            $this->load('roles');
        }
    }

    public function loadPermissions()
    {
        if (! $this->relationLoaded('roles')) {
            $this->load('roles.permissions');
        }
    }
}