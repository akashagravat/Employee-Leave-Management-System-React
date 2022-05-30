<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('RoleName')->unique();
            $table->boolean('Create')->default(0);
            $table->boolean('Update')->default(0);
            $table->boolean('Delete')->default(0);
            $table->boolean('Read')->default(0);
            $table->boolean('Approve')->default(0);
            $table->boolean('Reject')->default(0);
            $table->timestamps();
        });

        DB::table('roles')->insert(array(
            'RoleName' => "Admin",
            "Create" => 1,
            "Update" => 1,
            "Delete" => 1,
            "Read" => 1,
            "Approve" => 1,
            "Reject" => 1
        ));
        DB::table('roles')->insert(array(
            'RoleName' => "Employee",
            "Create" => 1,
            "Update" => 1,
            "Delete" => 1,
            "Read" => 1,
            "Approve" => 0,
            "Reject" => 0
        ));
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('roles');
    }
}
