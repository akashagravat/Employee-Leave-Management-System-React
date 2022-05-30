<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLeave extends Model
{
    use HasFactory;
    protected $table = "userleave";
    protected $fillable = [
        'EmployeeId',
        "Subject",
        "Reason",
        "StartDate",
        "EndDate",
        "IsAprooved",
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'EmployeeId');
    }
}
