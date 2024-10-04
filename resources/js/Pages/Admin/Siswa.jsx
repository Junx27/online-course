import React, { useEffect, useState } from "react";
import RoleAccess from "../Middleware/RoleAccess";
import SideBar from "@/Components/SideBar";
import { Head, useForm } from "@inertiajs/react";
import axios from "axios";
import FormaterRupiah from "@/Components/FormaterRupiah";

function Siswa({ auth }) {
    const [dataSiswa, setDataSiswa] = useState([]);
    const {
        data,
        put,
        delete: destroy,
    } = useForm({
        status_siswa: "ditolak",
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("/api/pesanan");
            setDataSiswa(response.data);
        };
        fetchData();
    }, []);

    const handleDelete = (id) => {
        destroy(`/delete-siswa/${id}`);
    };
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
                <Head title="Siswa Admin" />
                <div>
                    <h1 className="font-bold text-3xl md:text-5xl text-center mt-10 md:mt-20">
                        Daftar
                        <span className="text-blue-800 mx-2">Siswa</span>
                        <span className="text-yellow-400 mx-2">
                            Event Academy
                        </span>
                    </h1>
                </div>
                <div className="p-5 md:p-10 pattern-1 mt-10 md:mt-0">
                    {dataSiswa.map((i) => (
                        <div
                            key={i.id}
                            className="flex flex-col md:flex-row gap-10 items-center bg-white p-5 shadow-lg border-b hover:bg-blue-50"
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
                                    <span className="font-bold">Aksi:</span>
                                    <br />
                                    <div className="flex justify-between gap-5 items-center">
                                        {i.status_siswa === "diterima" ? (
                                            <button
                                                onClick={(e) =>
                                                    handleSubmit(e, i.id)
                                                }
                                                className="font-bold text-red-500 text-center cursor-pointer mt-2 p-2"
                                            >
                                                Tolak
                                            </button>
                                        ) : (
                                            <a href="/pemesanan">
                                                <button className="font-bold text-blue-500 text-center cursor-pointer mt-2 p-2">
                                                    Ubah
                                                </button>
                                            </a>
                                        )}
                                        <button
                                            onClick={() => handleDelete(i.id)}
                                        >
                                            <img
                                                src="/assets/delete.png"
                                                alt=""
                                                className="w-10 h-10"
                                            />
                                        </button>
                                    </div>
                                </h1>
                            </div>
                        </div>
                    ))}
                </div>
            </SideBar>
        </RoleAccess>
    );
}

export default Siswa;
