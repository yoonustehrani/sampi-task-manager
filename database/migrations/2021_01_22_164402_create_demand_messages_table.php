<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDemandMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('demand_messages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('demand_id');
            $table->unsignedInteger('user_id');
            $table->longText('text');
            $table->timestamps();
            $table->foreign('demand_id')->references('id')->on('demands')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('demand_messages');
    }
}
