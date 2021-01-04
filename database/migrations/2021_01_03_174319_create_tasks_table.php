<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('parent_id');
            $table->string('title');
            $table->string('group');
            $table->longText('description')->nullable();
            $table->boolean('finished')->default(false);
            $table->unsignedInteger('finisher_id');
            $table->unsignedInteger('workspace_id');
            $table->unsignedInteger('priority_id');
            $table->timestamp('due_to')->nullable();
            $table->timestamp('finished_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('finisher_id')->references('id')->on('users')->onUpdate('cascade');
            $table->foreign('workspace_id')->references('id')->on('workspaces')->onUpdate('cascade');
            $table->foreign('priority_id')->references('id')->on('priorities')->onUpdate('cascade');
        });
        Schema::create('task_user', function (Blueprint $table) {
            $table->unsignedInteger('user_id');
            $table->unsignedBigInteger('task_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('task_id')->references('id')->on('tasks')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('task_user');
        Schema::dropIfExists('tasks');
    }
}
