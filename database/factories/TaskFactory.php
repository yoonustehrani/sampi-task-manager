<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use App\Task;

$factory->define(Task::class, function (Faker $faker) {
    $time = $faker->dateTimeBetween('-30 days', 'now', 'Asia/Tehran');
    return [
        'title' => $faker->words(4, true),
        'group' => 'default',
        'description' => $faker->paragraphs(4, true),
        'workspace_id' => 1,
        'priority_id' => 1,
        'creator_id' => 1,
        'created_at' => $time,
        'updated_at' => $time,
    ];
});
