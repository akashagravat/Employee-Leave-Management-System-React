<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserleaveTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('userleave', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('EmployeeId');
            $table->string('Subject');
            $table->string('Reason');
            $table->string('StartDate');
            $table->string('EndDate');
            $table->tinyInteger('IsAprooved');
            $table->foreign('EmployeeId')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('userleave');
    }
}