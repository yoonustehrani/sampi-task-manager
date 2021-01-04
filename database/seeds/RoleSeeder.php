<?php

use App\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            'developer' => 'توسعه دهنده',
            'CEO' => 'مدیر عامل',
            'CTO' => 'مدیر ارشد اجرایی',
            'CFO' => 'مدیر ارشد مالی',
            'COO' => 'مدیر ارشد اجرایی',
            'member' => 'عضو',
            'member_of_the_board' => 'عضو هیئت مدیره',
        ];
        foreach ($roles as $name => $label) {
            $role = new Role();
            $role->name = $name;
            $role->label = $label;
            $role->save();
        }
    }
}
