<?php

use App\Demand;
use App\Priority;
use Illuminate\Database\Seeder;

class PrioritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items = [
            'ضروری و فوری',
            'ضروری و غیر فوری',
            'غیر ضروری و فوری',
            'غیر ضروری و غیر فوری'
        ];

        foreach ($items as $title) {
            $priority = new Priority();
            $priority->title = $title;
            $priority->save();
        }
    }
}
