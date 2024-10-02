import Pattern from "@/Components/Pattern";
import SideBar from "@/Components/SideBar";
import React, { useEffect, useState } from "react";
import RoleAccess from "../Middleware/RoleAccess";
import axios from "axios";

function Dashboard({ auth }) {
    const [dataKelas, setDataKelas] = useState([]);
    const [dataAffiliate, setDataAffiliate] = useState([]);
    const [dataPesananAffiliate, setDataPesananAffiliate] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/kelas");
                setDataKelas(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        const fetchAffiliate = async () => {
            try {
                const response = await axios.get("/api/data-kelas-affiliate");
                setDataAffiliate(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        const fetchPesananAffiliate = async () => {
            try {
                const response = await axios.get("/api/pesanan-affiliate");
                setDataPesananAffiliate(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchPesananAffiliate();
        fetchAffiliate();
        fetchData();
    }, []);

    return (
        <RoleAccess auth={auth} role={"admin"}>
            <SideBar
                nama={auth.user.nama}
                gambar={
                    auth.user.gambar === null
                        ? "/assets/boy.png"
                        : `storage/${auth.user.gambar}`
                }
            >
                <div>
                    <div>
                        <h1 className="font-bold text-3xl md:text-5xl mt-10 md:m-20 text-center">
                            Selamat Datang
                            <span className="text-blue-800 mx-2">Admin</span>
                            <br />
                            <span className="text-yellow-400 mx-2">
                                Event Academy
                            </span>
                        </h1>
                        <p className="mt-10 md:mt-0 text-center">
                            Berikut adalah informasi singkat pada menu admin,
                            hubungi pengembang untuk penambahan fitur.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-10 pattern-1 p-5 md:p-10">
                        <div className="bg-white shadow-lg p-5 md:p-10 text-center cursor-pointer hover:shadow-xl">
                            <img
                                src="/assets/blackboard.png"
                                alt=""
                                className="w-20 h-20 md:w-32 md:h-32 object-cover mx-auto"
                            />
                            <p className="mt-5 font-bold text-5xl text-purple-500">
                                {dataKelas.length}
                            </p>
                            <p className="text-center mt-3">Kelas aktif</p>
                        </div>
                        <div className="bg-white shadow-lg p-5 md:p-10 text-center cursor-pointer hover:shadow-xl">
                            <img
                                src="/assets/notebooks.png"
                                alt=""
                                className="w-20 h-20 md:w-32 md:h-32 object-cover mx-auto"
                            />
                            <p className="mt-5 font-bold text-5xl text-orange-500">
                                {dataAffiliate.length}
                            </p>
                            <p className="text-center mt-3">Kelas Affiliate</p>
                        </div>
                        <div className="bg-white shadow-lg p-5 md:p-10 text-center cursor-pointer hover:shadow-xl">
                            <img
                                src="/assets/notes.png"
                                alt=""
                                className="w-20 h-20 md:w-32 md:h-32 object-cover mx-auto"
                            />
                            <p className="mt-5 font-bold text-5xl text-pink-500">
                                {
                                    dataPesananAffiliate.filter(
                                        (i) => i.status_siswa === "diterima"
                                    ).length
                                }
                            </p>
                            <p className="text-center mt-3">Affiliate Sukses</p>
                        </div>
                        <div className="bg-white shadow-lg p-5 md:p-10 text-center cursor-pointer hover:shadow-xl">
                            <img
                                src="/assets/laptop.png"
                                alt=""
                                className="w-20 h-20 md:w-32 md:h-32 object-cover mx-auto"
                            />
                            <p className="mt-5 font-bold text-5xl text-blue-500">
                                {
                                    dataPesananAffiliate.filter(
                                        (i) => i.status_siswa === "menunggu"
                                    ).length
                                }
                            </p>
                            <p className="text-center mt-3">
                                Affiliate Pending
                            </p>
                        </div>
                    </div>
                </div>
            </SideBar>
        </RoleAccess>
    );
}

export default Dashboard;
