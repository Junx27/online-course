<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataPesanan extends Model
{
    use HasFactory;
    protected $fillable = [
        'nama_kelas',
        'tanggal_pesan',
        'nama_siswa',
        'email_siswa',
        'kontak_siswa',
        'status_siswa',
        'nama_affiliate',
        'email_affiliate',
        'kontak_affiliate',
        'kelas_id',
    ];

    public function kelas()
    {
        return $this->belongsTo(DataKelas::class, "kelas_id");
    }
}
