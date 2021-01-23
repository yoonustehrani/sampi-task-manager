<?php

use App\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $perms = [
            'user', 'workspace', 'role', 'permission', 'task', 'demand'
        ];
        foreach ($perms as $perm) {
            $levels = ['view_any', 'view', 'create', 'update', 'update_any', 'delete', 'restore', 'force_delete'];
            foreach($levels as $level)
            {
                $permission = new Permission();
                $permission->key = "can_{$level}_" . \Illuminate\Support\Str::plural($perm);
                $permission->save();
            }
        }
        (new Permission())->insert([
            [
                'key' => 'can_edit_user_role',
                'label' => 'ویرایش سمت کاربران'
            ],
            [
                'key' => 'can_manage_system',
                'label' => 'مدیریت سیستم'
            ]
        ]);
        $role = \App\Role::whereName('developer')->first();
        $role->Permissions()->sync(Permission::all());
    }
}
