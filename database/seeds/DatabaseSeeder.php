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
        $this->call(RoleSeeder::class);
        $this->call(PermissionSeeder::class);
        $this->call(PrioritySeeder::class);
        $user = new User;
        $user->first_name = 'یوزر';
        $user->name = 'elnovel';
        $user->email = 'elnovelofficial@gmail.com';
        $user->password = bcrypt('hello123');
        $user->api_token = \Illuminate\Support\Str::uuid();
        $user->save();
        $roles = Role::all();
        $user->roles()->attach($roles);
    }
}
