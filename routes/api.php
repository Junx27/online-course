<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get("api/users", action: [UserController::class, "index"]);
Route::get("api/data-kelas-affiliate", action: [UserController::class, "dataAffiliate"]);
Route::get("api/data-kelas-affiliate/{id}", action: [UserController::class, "dataAffiliateDetail"]);
Route::get("api/kelas", action: [AdminController::class, "index"]);
Route::get("api/kelas/{id}", action: [AdminController::class, "show"]);
Route::get("/api/pesananmasuk", [AdminController::class, "dataSiswaKonfirmasi"]);
Route::get("/api/pesanan-affiliate", [AdminController::class, "dataSiswaAffiliate"]);
Route::get("/api/pesanan", [AdminController::class, "dataSiswa"]);
