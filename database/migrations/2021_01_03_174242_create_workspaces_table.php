<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWorkspacesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('workspaces', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->text('description')->nullable();
            $table->text('avatar_pic');
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('user_workspace', function (Blueprint $table) {
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('workspace_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('workspace_id')->references('id')->on('workspaces')->onDelete('cascade')->onUpdate('cascade');
            $table->boolean('is_admin')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_workspace');
        Schema::dropIfExists('workspaces');
    }
}
