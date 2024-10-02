<?php

namespace App\Http\Controllers;

use App\Models\DataKelas;
use App\Models\DataPesanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render("Admin/Dashboard");
    }
    public function class()
    {
        return Inertia::render("Admin/Class");
    }
    public function index()
    {
        $kelas = DataKelas::all();
        return response()->json($kelas);
    }
    public function show(String $id)
    {
        $kelas = DataKelas::findOrFail($id);
        return response()->json($kelas);
    }
    public function createClass(Request $request)
    {
        $validated = $request->validate([
            'gambar_kelas' => 'required',
            "nama_kelas" => 'required',
            'deskripsi_kelas' => 'required',
            'harga_kelas' => 'required',
            'user_id' => 'required',
        ]);
        if ($request->hasFile('gambar_kelas')) {
            $validated["gambar_kelas"] = $request->file('gambar_kelas')->store('gambar_kelas', 'public');
        }
        DataKelas::create($validated);
        return Inertia::location("/class");
    }
    public function updateClass(Request $request, String $id)
    {
        $kelas = DataKelas::findOrFail($id);

        $validated = $request->validate([
            'gambar_kelas' => 'required',
            "nama_kelas" => 'required',
            'deskripsi_kelas' => 'required',
            'harga_kelas' => 'required',

        ]);


        if ($request->hasFile('gambar_kelas')) {

            if ($kelas->gambar_kelas) {
                Storage::disk('public')->delete($kelas->gambar_kelas);
            }
            $validated["gambar_kelas"] = $request->file('gambar_kelas')->store('gambar_kelas', 'public');
        } else {

            $validated["gambar_kelas"] = $kelas->gambar_kelas;
        }


        $kelas->update($validated);


        return Inertia::location("/class");
    }

    public function deleteClass(String $id)
    {
        $kelas = DataKelas::findOrFail($id);
        if ($kelas->gambar_kelas) {
            Storage::disk('public')->delete($kelas->gambar_kelas);
        }
        $kelas->delete();
        return Inertia::location("/class");
    }

    public function setting()
    {
        return Inertia::render("Admin/PengaturanAdmin");
    }
    public function order()
    {
        return Inertia::render("Admin/Pemesanan");
    }
    public function affiliate()
    {
        return Inertia::render("Admin/Affiliate");
    }
    public function siswa()
    {
        return Inertia::render("Admin/Siswa");
    }
    public function dataSiswaKonfirmasi()
    {
        $dataPesanan = DataPesanan::whereIn("status_siswa", ["menunggu", "ditolak"])->with("kelas:id,nama_kelas,gambar_kelas,harga_kelas,deskripsi_kelas")->get();
        return response()->json($dataPesanan);
    }
    public function dataSiswaAffiliate()
    {
        $dataPesanan = DataPesanan::with("kelas:id,nama_kelas,gambar_kelas,harga_kelas,deskripsi_kelas")->get();
        return response()->json($dataPesanan);
    }
    public function dataSiswa()
    {
        $dataPesanan = DataPesanan::whereIn("status_siswa", ["diterima", "ditolak"])
            ->with("kelas:id,nama_kelas,gambar_kelas,harga_kelas,deskripsi_kelas")
            ->get();
        return response()->json($dataPesanan);
    }
    public function konfirmasiSiswa(Request $request, String $id)
    {
        $pesanan = DataPesanan::findOrFail($id);
        $validated = $request->validate([
            'status_siswa' => "required",
        ]);
        $pesanan->update($validated);
        return Inertia::location("/siswa");
    }
    public function deletPesanan(String $id)
    {
        $pesanan = DataPesanan::findOrFail($id);
        $pesanan->delete();
        return Inertia::location("/siswa");
    }
}
