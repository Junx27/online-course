<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataKelas extends Model
{
    use HasFactory;
    protected $fillable = [
        'gambar_kelas',
        'nama_kelas',
        'deskripsi_kelas',
        'harga_kelas',
        'user_id',
    ];
}
