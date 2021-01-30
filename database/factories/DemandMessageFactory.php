<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use App\DemandMessage;

$factory->define(DemandMessage::class, function (Faker $faker) {
    return [
        'text' => $faker->sentences(2, true),
        'user_id' => rand(1,3)
    ];
});
