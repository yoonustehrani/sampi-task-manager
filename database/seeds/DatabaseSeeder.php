<?php

use App\Role;
use App\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(RoleSeeder::class);
        // $this->call(PermissionSeeder::class);
        // $this->call(PrioritySeeder::class);
        // $user = new User;
        // $user->first_name = 'یوزر';
        // $user->name = 'elnovel';
        // $user->email = 'elnovelofficial@gmail.com';
        // $user->password = bcrypt('hello123');
        // $user->api_token = \Illuminate\Support\Str::uuid();
        // $user->save();
        // $roles = Role::all();
        // $user->roles()->attach($roles);
        (new \App\Permission())->insert([
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
        $role->permissions()->sync(\App\Permission::all());
    }
}
