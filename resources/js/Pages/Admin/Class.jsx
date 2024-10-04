import React, { useEffect, useState } from "react";
import RoleAccess from "../Middleware/RoleAccess";
import SideBar from "@/Components/SideBar";
import PopOver from "@/Components/PopOver";
import { Head, useForm } from "@inertiajs/react";
import axios from "axios";
import FormaterRupiah from "@/Components/FormaterRupiah";
import Gambar from "./Gambar";

function Class({ auth }) {
    const [openCreateClass, setOpenCreateClass] = useState(false);
    const [openEditClass, setOpenEditClass] = useState(false);
    const [openEditClassGambar, setOpenEditClassGambar] = useState(false);
    const [dataKelas, setDataKelas] = useState([]);
    const [id, setId] = useState(null);
    const [image, setImage] = useState(null);
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
    } = useForm({
        gambar_kelas: "",
        nama_kelas: "",
        deskripsi_kelas: "",
        harga_kelas: "",
        user_id: auth.user.id,
    });
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData("gambar_kelas", file);
        setImage(URL.createObjectURL(file));
    };
    const submit = (e) => {
        e.preventDefault();
        post(route("create.class"));
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/kelas");
                setDataKelas(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (id !== null) {
            const singgleData = async () => {
                try {
                    const response = await axios.get(`/api/kelas/${id}`);
                    setData({
                        gambar_kelas: response.data.gambar_kelas,
                        nama_kelas: response.data.nama_kelas,
                        deskripsi_kelas: response.data.deskripsi_kelas,
                        harga_kelas: response.data.harga_kelas,
                    });
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            singgleData();
        }

        fetchData();
    }, [id]);
    const handleEdit = (id) => {
        setId(id);
        setOpenEditClass(true);
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        if (id !== null) {
            put(`/update-class/${id}`);
        }
    };
    const handleImage = (id) => {
        setId(id);
        setOpenEditClassGambar(true);
    };
    const handleDelete = (id) => {
        destroy(`/delete-class/${id}`);
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
                <Head title="Kelas Admin" />
                {openEditClassGambar && (
                    <PopOver>
                        <Gambar
                            id={id}
                            gambar={data.gambar_kelas}
                            handleClose={() => setOpenEditClassGambar(false)}
                        />
                    </PopOver>
                )}

                {openCreateClass && (
                    <PopOver>
                        <div className="bg-white pattern-1">
                            <div
                                onClick={() => setOpenCreateClass(false)}
                                className=" flex justify-end cursor-pointer p-5"
                            >
                                <img
                                    src="/assets/plus.png"
                                    alt=""
                                    className="w-10 h-10 rotate-45"
                                />
                            </div>
                            <form
                                onSubmit={submit}
                                className="bg-white flex flex-col gap-1 md:gap-5 pattern-1"
                                encType="multipart/form-data"
                            >
                                <div className="flex flex-col px-5">
                                    <label
                                        htmlFor="gambar_kelas"
                                        className="font-bold text-blue-800"
                                    >
                                        <img
                                            src={
                                                image === null
                                                    ? "/assets/camera.png"
                                                    : image
                                            }
                                            alt=""
                                            className="w-full h-32 md:h-[150px] object-cover"
                                        />
                                    </label>
                                    <input
                                        id="gambar_kelas"
                                        type="file"
                                        name="gambar_kelas"
                                        className="mt-2 block w-full text-sm text-gray-500
                                   file:mr-4 file:py-2 file:px-4
                                   file:border-0
                                   file:text-sm file:font-semibold
                                   file:bg-blue-50 file:text-blue-700
                                   hover:file:bg-blue-100"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-1 px-5">
                                    <label
                                        htmlFor="nama_kelas"
                                        className="text-sm font-bold text-blue-800"
                                    >
                                        Nama Kelas
                                    </label>
                                    <input
                                        type="text"
                                        id="nama_kelas"
                                        className="mt-1 block w-full border-none outline-none bg-blue-50"
                                        value={data.nama_kelas}
                                        onChange={(e) =>
                                            setData(
                                                "nama_kelas",
                                                e.target.value
                                            )
                                        }
                                        max={30}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-1 px-5">
                                    <label
                                        htmlFor="harga_kelas"
                                        className="text-sm font-bold text-blue-800"
                                    >
                                        Harga Kelas
                                    </label>
                                    <input
                                        type="text"
                                        id="harga_kelas"
                                        className="mt-1 block w-full border-none outline-none  bg-blue-50"
                                        value={data.harga_kelas}
                                        onChange={(e) =>
                                            setData(
                                                "harga_kelas",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-1 px-5">
                                    <label
                                        htmlFor="deskripsi_kelas"
                                        className="text-sm font-bold text-blue-800"
                                    >
                                        Deskripsi
                                    </label>
                                    <textarea
                                        id="text"
                                        name="deskripsi_kelas"
                                        type="text"
                                        className="mt-1 block w-full border-none outline-none bg-blue-50"
                                        value={data.deskripsi_kelas}
                                        onChange={(e) =>
                                            setData(
                                                "deskripsi_kelas",
                                                e.target.value
                                            )
                                        }
                                        rows={6}
                                        maxLength={150}
                                        required
                                    />
                                </div>
                                <input
                                    type="text"
                                    value={data.user_id}
                                    className="hidden"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-800 text-white p-5 mt-5 font-bold hover:bg-blue-700"
                                >
                                    Tambah Kelas
                                </button>
                            </form>
                        </div>
                    </PopOver>
                )}
                {openEditClass && (
                    <PopOver>
                        <div className="bg-white pattern-1">
                            <div
                                onClick={() => setOpenEditClass(false)}
                                className=" flex justify-end cursor-pointer p-5"
                            >
                                <img
                                    src="/assets/plus.png"
                                    alt=""
                                    className="w-10 h-10 rotate-45"
                                />
                            </div>
                            <form
                                onSubmit={handleUpdate}
                                className="bg-white w-96 flex flex-col gap-1 md:gap-5 pattern-1"
                                encType="multipart/form-data"
                            >
                                <div className="flex flex-col gap-1 px-5">
                                    <label
                                        htmlFor="nama_kelas"
                                        className="text-sm font-bold text-blue-800"
                                    >
                                        Nama Kelas
                                    </label>
                                    <input
                                        type="text"
                                        id="nama"
                                        className="mt-1 block w-full border-none outline-none bg-blue-50"
                                        value={data.nama_kelas}
                                        onChange={(e) =>
                                            setData(
                                                "nama_kelas",
                                                e.target.value
                                            )
                                        }
                                        max={30}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-1 px-5">
                                    <label
                                        htmlFor="harga_kelas"
                                        className="text-sm font-bold text-blue-800"
                                    >
                                        Harga Kelas
                                    </label>
                                    <input
                                        type="text"
                                        id="harga_kelas"
                                        className="mt-1 block w-full border-none outline-none bg-blue-50"
                                        value={data.harga_kelas}
                                        onChange={(e) =>
                                            setData(
                                                "harga_kelas",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-1 px-5">
                                    <label
                                        htmlFor="deskripsi_kelas"
                                        className="text-sm font-bold text-blue-800"
                                    >
                                        Deskripsi
                                    </label>
                                    <textarea
                                        id="text"
                                        name="deskripsi_kelas"
                                        type="text"
                                        className="mt-1 block w-full border-none outline-none bg-blue-50"
                                        value={data.deskripsi_kelas}
                                        onChange={(e) =>
                                            setData(
                                                "deskripsi_kelas",
                                                e.target.value
                                            )
                                        }
                                        rows={6}
                                        maxLength={150}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="bg-blue-800 text-white p-5 mt-5 font-bold hover:bg-blue-700"
                                >
                                    Ubah Kelas
                                </button>
                            </form>
                        </div>
                    </PopOver>
                )}

                <div>
                    <h1 className="font-bold text-3xl md:text-5xl text-center mt-10 md:mt-20">
                        Daftar
                        <span className="text-blue-800 mx-2">Kelas</span>
                        <span className="text-yellow-400 mx-2">
                            Event Academy
                        </span>
                    </h1>
                </div>
                <div
                    onClick={() => setOpenCreateClass(true)}
                    className="cursor-pointer"
                >
                    <div className="fixed z-30 bottom-5 right-5 md:top-20 md:right-10">
                        <img
                            src="/assets/plus.png"
                            alt=""
                            className="w-12 h-12 bg-white rounded-full"
                        />
                    </div>
                </div>
                <div className="mt-10 pattern-1">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-5 md:p-0">
                        {dataKelas.map((i) => (
                            <div
                                key={i.id}
                                className="relative h-96 group transition-all duration-500 bg-white shadow hover:shadow-lg hover:shadow-blue-500/50 cursor-pointer overflow-hidden"
                            >
                                <img
                                    src={`storage/${i.gambar_kelas}`}
                                    alt=""
                                    className="transition-all duration-500 w-full h-full object-cover group-hover:scale-105"
                                />
                                <div className="inset-0 w-full h-full group-hover:bg-blue-800/50 bg-gradient-to-t from-blue-800 to-transparent absolute mt-20 group-hover:mt-0"></div>
                                <div className="transition-all duration-500 inset-0 absolute p-5 top-64 group-hover:top-10">
                                    <h1 className="font-bold text-2xl capitalize text-white line-clamp-2">
                                        {i.nama_kelas}
                                    </h1>
                                    <p className="transition-all duration-700 text-white group-hover:mt-5 mt-32 line-clamp-3">
                                        {i.deskripsi_kelas}
                                    </p>
                                    <p className="transition-all duration-700 text-white group-hover:mt-5 mt-32 text-2xl">
                                        <FormaterRupiah
                                            number={i.harga_kelas}
                                        />
                                    </p>
                                    <div className="transition-all w-full duration-500 absolute -right-10 group-hover:bottom-5 group-hover:right-0">
                                        <div className="flex justify-between mt-10 mx-10">
                                            <div
                                                onClick={() => handleEdit(i.id)}
                                            >
                                                <img
                                                    src="/assets/edit.png"
                                                    alt=""
                                                    className="w-10 h-10 bg-white p-2 rounded-full"
                                                />
                                            </div>
                                            <div
                                                onClick={() =>
                                                    handleImage(i.id)
                                                }
                                            >
                                                <p className="text-white bg-white/20 p-2 hover:bg-white/50">
                                                    Ubah gambar
                                                </p>
                                            </div>
                                            <div
                                                onClick={() =>
                                                    handleDelete(i.id)
                                                }
                                            >
                                                <img
                                                    src="/assets/delete.png"
                                                    alt=""
                                                    className="w-10 h-10"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </SideBar>
        </RoleAccess>
    );
}

export default Class;
