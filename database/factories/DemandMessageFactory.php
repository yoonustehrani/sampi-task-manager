<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use App\DemandMessage;

$factory->define(DemandMessage::class, function (Faker $faker) {
    return [
        'text' => "<p>". $faker->sentences(2, true) ."</p>" . "<p><span>". $faker->sentences(2, true) ."</span></p>",
        'user_id' => rand(1,2)
    ];
});
