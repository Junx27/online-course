<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AffiliateController extends Controller
{
    public function dashboard()
    {
        return Inertia::render("Affiliate/DashboardAffiliate");
    }
    public function data()
    {
        return Inertia::render("Affiliate/DataAffiliate");
    }
    public function produk()
    {
        return Inertia::render("Affiliate/ProdukAffiliate");
    }
    public function pengaturan()
    {
        return Inertia::render("Affiliate/PengaturanAffiliate");
    }
}
