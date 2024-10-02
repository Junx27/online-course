<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('data_pesanans', function (Blueprint $table) {
            $table->id();
            $table->string("nama_kelas");
            $table->string("tanggal_pesan");
            $table->string("nama_siswa");
            $table->string("email_siswa");
            $table->string("kontak_siswa");
            $table->string("status_siswa");
            $table->string("nama_affiliate");
            $table->string("email_affiliate");
            $table->string("kontak_affiliate");
            $table->foreignId("kelas_id")->constrained("data_kelas")->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_pesanans');
    }
};
