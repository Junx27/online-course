import React, { useEffect, useState } from "react";
import RoleAccess from "../Middleware/RoleAccess";
import SideBar from "@/Components/SideBar";
import axios from "axios";
import { Head, useForm } from "@inertiajs/react";
import FormaterRupiah from "@/Components/FormaterRupiah";

function Pemesanan({ auth }) {
    const [dataSiswa, setDataSiswa] = useState([]);
    const { data, put } = useForm({
        status_siswa: "diterima",
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("/api/pesananmasuk");
            setDataSiswa(response.data);
        };
        fetchData();
    }, []);

    const handleSubmit = (e, id) => {
        e.preventDefault();
        put(`/konfirmasi-siswa/${id}`, data);
    };
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
                <Head title="Konfirmasi Kelas" />
                <div>
                    <h1 className="font-bold text-3xl md:text-5xl text-center mt-10 md:mt-20">
                        Daftar
                        <span className="text-blue-800 mx-2">Konfirmasi</span>
                        <span className="text-yellow-400 mx-2">Kelas</span>
                    </h1>
                </div>
                <div className="p-5 md:p-10 pattern-1 mt-10">
                    {dataSiswa.map((i) => (
                        <div
                            key={i.id}
                            className="flex flex-col md:flex-row gap-10 items-center bg-white hover:bg-blue-50 p-5 shadow-lg border-b cursor-pointer"
                            id={`pdf-content-${i.id}`}
                        >
                            <img
                                src={`storage/${i.kelas.gambar_kelas}`}
                                alt=""
                                className="w-64 h-64 object-cover"
                            />
                            <div className="w-full">
                                <h1 className="my-2 truncate w-32">
                                    <span className="font-bold">
                                        Nama Kelas:
                                    </span>
                                    <br />
                                    {i.kelas.nama_kelas}
                                </h1>
                                <h1 className="my-2">
                                    <span className="font-bold">
                                        Tanggal Pesan:
                                    </span>
                                    <br />
                                    {i.tanggal_pesan}
                                </h1>
                                <h1 className="my-2">
                                    <span className="font-bold">Harga:</span>
                                    <br />
                                    <FormaterRupiah
                                        number={i.kelas.harga_kelas}
                                    />
                                </h1>
                                <h1 className="my-2 truncate w-32">
                                    <span className="font-bold">
                                        Deskripsi:
                                    </span>
                                    <br />
                                    <p className="p-2 mt-2">-</p>
                                </h1>
                            </div>
                            <div className="w-full">
                                <h1 className="my-2 truncate w-32">
                                    <span className="font-bold">
                                        Nama Siswa:
                                    </span>
                                    <br />
                                    {i.nama_siswa}
                                </h1>
                                <h1 className="my-2">
                                    <span className="font-bold">Email:</span>
                                    <br />
                                    {i.email_siswa}
                                </h1>
                                <h1 className="my-2">
                                    <span className="font-bold">Kontak:</span>
                                    <br />
                                    {i.kontak_siswa}
                                </h1>
                                <h1 className="my-2">
                                    <span className="font-bold">
                                        Status Pesanan:
                                    </span>
                                    <br />
                                    <p
                                        className={`p-2 cursor-pointer mt-2 ${
                                            i.status_siswa === "menunggu"
                                                ? "font-bold text-blue-500"
                                                : i.status_siswa === "diterima"
                                                ? "font-bold text-green-500"
                                                : "font-bold text-red-500"
                                        }`}
                                    >
                                        {i.status_siswa}
                                    </p>
                                </h1>
                            </div>
                            <div className="w-full">
                                <h1 className="my-2 truncate w-32">
                                    <span className="font-bold">
                                        Nama Affiliate:
                                    </span>
                                    <br />
                                    {i.nama_affiliate}
                                </h1>
                                <h1 className="my-2">
                                    <span className="font-bold">Email:</span>
                                    <br />
                                    {i.email_affiliate}
                                </h1>
                                <h1 className="my-2">
                                    <span className="font-bold">Kontak:</span>
                                    <br />
                                    {i.kontak_affiliate}
                                </h1>
                                <h1>
                                    <span className="font-bold">
                                        Bukti Affiliate:
                                    </span>
                                    <br />
                                    <button
                                        onClick={(e) => handleSubmit(e, i.id)}
                                        className="font-bold text-green-500 text-center cursor-pointer mt-2 p-2"
                                    >
                                        Konfirmasi
                                    </button>
                                </h1>
                            </div>
                        </div>
                    ))}
                </div>
            </SideBar>
        </RoleAccess>
    );
}

export default Pemesanan;
