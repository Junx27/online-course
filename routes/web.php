<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AffiliateController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});
Route::get('/class-detail/{id}', [UserController::class, "classDetail"]);
Route::get('/class-detail-affiliate/786ad{id}ujh635035772', [UserController::class, "shareAffiliate"]);
Route::post("/create-class-guest", [UserController::class, "createClass"])->name("create.class.guest");
Route::get('/affiliate-register', function () {
    return Inertia::render('Affiliate');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::put('/profile/update/{id}', [UserController::class, 'updateProfil'])->name('profile.update');
    Route::put('/konfirmasi-siswa/{id}', [AdminController::class, "konfirmasiSiswa"]);
    Route::delete('/delete-siswa/{id}', [AdminController::class, "deletPesanan"]);
    Route::post("/create-class", [AdminController::class, "createClass"])->name("create.class");
    Route::put("/update-class/{id}", [AdminController::class, "updateClass"]);
    Route::put("/update-gambar-class/{id}", [AdminController::class, "updateGambarClass"]);
    Route::delete("/delete-class/{id}", [AdminController::class, "deleteClass"]);
    Route::get('/dashboard', [AdminController::class, "dashboard"])->name("dashboard.admin");
    Route::get('/class', [AdminController::class, "class"])->name(name: "class.admin");
    Route::get('/affiliate', [AdminController::class, "affiliate"])->name("affiliate.admin");
    Route::get('/siswa', [AdminController::class, "siswa"])->name("siswa.admin");
    Route::get('/pengaturan', [AdminController::class, "setting"])->name("pengaturan.admin");
    Route::get('/pemesanan', [AdminController::class, "order"])->name("pemesanan.admin");
    Route::get("/dashboard-affiliate", [AffiliateController::class, "dashboard"])->name('dashboard.affiliate');
    Route::get("/data-affiliate", [AffiliateController::class, "data"])->name('data.affiliate');
    Route::get("/produk-affiliate", [AffiliateController::class, "produk"])->name('produk.affiliate');
    Route::get("/pengaturan-affiliate", [AffiliateController::class, "pengaturan"])->name('pengaturan.affiliate');
    Route::post("/create-affiliate", [UserController::class, "createAffiliate"])->name("create.affiliate");
});

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__ . '/auth.php';
require __DIR__ . '/api.php';
