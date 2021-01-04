<?php

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
        $user->name = 'Elnovel';
        $user->email = 'elnovelofficial@gmail.com';
        $user->password = bcrypt('hello123');
        $user->save();
    }
}
