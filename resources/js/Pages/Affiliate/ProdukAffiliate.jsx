import React, { useEffect, useState } from "react";
import RoleAccess from "../Middleware/RoleAccess";
import AffiliateSideBar from "@/Components/AffiliateSideBar";
import axios from "axios";
import { Head, useForm, usePage } from "@inertiajs/react";
import FormaterRupiah from "@/Components/FormaterRupiah";

function ProdukAffiliate({ auth }) {
    const { errors } = usePage().props;
    const [dataKelas, setDataKelas] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/data-kelas-affiliate");
                setDataKelas(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    return (
        <RoleAccess auth={auth} role={"affiliate"}>
            <AffiliateSideBar
                nama={auth.user.nama}
                gambar={
                    auth.user.gambar === null
                        ? "/assets/boy.png"
                        : `storage/${auth.user.gambar}`
                }
            >
                <div>
                    <Head title="Kelas Affiliate" />
                    <h1 className="font-bold text-3xl md:text-5xl text-center mt-10 md:mt-20">
                        Daftar
                        <span className="text-blue-800 mx-2">Kelas</span>
                        <span className="text-yellow-400 mx-2">Affiliate</span>
                    </h1>
                </div>
                <p className="mt-10 text-center mx-5 md:mx-20">
                    Bagikan kelas affiliate kamu untuk mendapatkan komisi syarat
                    dan ketentuan berlaku, informasi lebih lanjut hubungi admin
                    Event Academy.
                </p>
                <div className="mt-10 pattern-1">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-5 md:p-10">
                        {dataKelas.map((i) => (
                            <div
                                key={i.id}
                                className="relative group h-96 transition-all duration-500 bg-white shadow hover:shadow-lg hover:shadow-blue-500/50 cursor-pointer overflow-hidden"
                            >
                                <img
                                    src={`storage/${i.kelas.gambar_kelas}`}
                                    alt=""
                                    className="transition-all duration-500 w-full h-full object-cover group-hover:scale-105"
                                />
                                <div className="inset-0 w-full h-full group-hover:bg-blue-800/50 bg-gradient-to-t from-blue-800 to-transparent absolute mt-20 group-hover:mt-0"></div>
                                <div className="transition-all duration-500 inset-0 absolute p-5 top-64 group-hover:top-10">
                                    <h1 className="font-bold text-2xl capitalize text-white line-clamp-2">
                                        {i.kelas.nama_kelas}
                                    </h1>
                                    <p className="transition-all duration-700 text-white group-hover:mt-5 mt-32 line-clamp-3">
                                        {i.kelas.deskripsi_kelas}
                                    </p>
                                    <p className="transition-all duration-700 text-white group-hover:mt-5 mt-32 text-2xl">
                                        <FormaterRupiah
                                            number={i.kelas.harga_kelas}
                                        />
                                    </p>
                                    <div className="transition-all duration-500 text-white hover:bg-white/10 p-2 absolute -right-10 group-hover:bottom-5 group-hover:right-5 text-xl font-bold">
                                        <a
                                            href={`/class-detail-affiliate/786ad${i.id}ujh635035772`}
                                        >
                                            Share Affiliate Link &rarr;
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </AffiliateSideBar>
        </RoleAccess>
    );
}

export default ProdukAffiliate;
