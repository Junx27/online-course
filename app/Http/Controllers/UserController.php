<?php

namespace App\Http\Controllers;

use App\Models\DataAffiliate;
use App\Models\DataKelas;
use App\Models\DataPesanan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $user = User::where("role", "affiliate")->get();
        return response()->json($user);
    }
    public function updateProfil(Request $request, String $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255|unique:users,email,' . $user->id,
            'kontak' => 'required',
            'gambar' => 'required',
        ]);
        if ($request->hasFile('gambar')) {
            if ($user->gambar) {
                Storage::disk('public')->delete($user->gambar);
            }
            $validated['gambar'] = $request->file('gambar')->store('gambar_profil', 'public');
        }
        $user->update($validated);
        if ($user->role === "admin") {

            return Inertia::location('/pengaturan');
        } else {
            return Inertia::location('/pengaturan-affiliate');
        }
    }
    public function classDetail(String $id)
    {
        return Inertia::render("ClassDetail", ["id" => $id]);
    }

    public function createClass(Request $request)
    {
        $validated = $request->validate([
            'nama_kelas' => 'required',
            'tanggal_pesan' => 'required',
            'nama_siswa' => 'required',
            'email_siswa' => 'required',
            'kontak_siswa' => 'required',
            'nama_affiliate' => 'required',
            'email_affiliate' => 'required',
            'kontak_affiliate' => 'required',
            'kelas_id' => 'required',
        ]);
        DataPesanan::create($validated);
        return Inertia::location("/");
        // dd($request->all());
    }
    public function createAffiliate(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required',
            'kelas_id' => 'required',
        ]);
        $existingRecord = DataAffiliate::where('user_id', $validated['user_id'])
            ->where('kelas_id', $validated['kelas_id'])
            ->first();

        if ($existingRecord) {
            return back()->withErrors(['message' => 'Data sudah ada, gagal menambahkan data affiliate!']);
        }
        DataAffiliate::create($validated);

        return Inertia::location("/produk-affiliate");
    }

    public function dataAffiliate(Request $request)
    {

        $userId = $request->user()->id;
        $dataAffiliate = DataAffiliate::with([
            'user:id,nama,email,kontak',
            'kelas:id,nama_kelas,gambar_kelas,harga_kelas,deskripsi_kelas'
        ])
            ->where('user_id', $userId)
            ->get();

        return response()->json($dataAffiliate);
    }
    public function dataAffiliateAdmin(Request $request)
    {

        $dataAffiliate = DataAffiliate::with([
            'user:id,nama,email,kontak',
            'kelas:id,nama_kelas,gambar_kelas,harga_kelas,deskripsi_kelas'
        ])->get();

        return response()->json($dataAffiliate);
    }

    public function dataAffiliateDetail(String $id)
    {
        $dataAffiliate = DataAffiliate::with([
            'user:id,nama,email,kontak',
            'kelas:id,nama_kelas,gambar_kelas,harga_kelas,deskripsi_kelas'
        ])->findOrFail($id);
        return response()->json($dataAffiliate);
    }
    public function shareAffiliate(String $id)
    {
        return Inertia::render("ShareAffiliate", ["id" => $id]);
    }
}
