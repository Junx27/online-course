import React, { useEffect, useState } from "react";
import RoleAccess from "../Middleware/RoleAccess";
import AffiliateSideBar from "@/Components/AffiliateSideBar";
import axios from "axios";
import { useForm, usePage } from "@inertiajs/react";
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
                        {dataKelas
                            .filter((i) => i.user_id === auth.user.id)
                            .map((i) => (
                                <div
                                    key={i.id}
                                    className="transition-all duration-500 bg-white shadow hover:shadow-lg hover:shadow-blue-500/50 cursor-pointer"
                                >
                                    <img
                                        src={`storage/${i.kelas.gambar_kelas}`}
                                        alt=""
                                        className="w-full h-96 object-cover"
                                    />
                                    <div className="p-5">
                                        <h1 className="font-bold text-2xl capitalize">
                                            {i.kelas.nama_kelas}
                                        </h1>
                                        <p className="my-2 text-justify h-32">
                                            {i.kelas.deskripsi_kelas}
                                        </p>
                                        <p className="mt-2 text-blue-800 font-bold text-2xl">
                                            <FormaterRupiah
                                                number={i.kelas.harga_kelas}
                                            />
                                        </p>
                                        <div className="mt-5">
                                            <a
                                                href={`/class-detail-affiliate/786ad${i.id}ujh635035772`}
                                            >
                                                <button className="transition-all duration-500 flex items-center gap-3 font-bold bg-blue-800 p-2 w-full text-center border-2 border-blue-800 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50">
                                                    <img
                                                        src="/assets/logout.png"
                                                        alt=""
                                                        className="w-10 h-10 bg-white"
                                                    />
                                                    Share Affiliate Link &rarr;
                                                </button>
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
