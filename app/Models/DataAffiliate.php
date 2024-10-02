<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataAffiliate extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'kelas_id',
    ];
    public function kelas()
    {
        return $this->belongsTo(DataKelas::class, "kelas_id");
    }
    public function user()
    {
        return $this->belongsTo(User::class, "user_id");
    }
}
