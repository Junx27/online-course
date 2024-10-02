import React, { useEffect, useState } from "react";
import RoleAccess from "../Middleware/RoleAccess";
import SideBar from "@/Components/SideBar";
import PopOver from "@/Components/PopOver";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import FormaterRupiah from "@/Components/FormaterRupiah";

function Class({ auth }) {
    const [openCreateClass, setOpenCreateClass] = useState(false);
    const [openEditClass, setOpenEditClass] = useState(false);
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
        id_gambar: "",
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
                        id_gambar: response.data.id,
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
            put(`/update-class/${id}`, data);
        }
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
                {openCreateClass && (
                    <PopOver>
                        <div className="bg-white p-5">
                            <div
                                onClick={() => setOpenCreateClass(false)}
                                className=" flex justify-end cursor-pointer"
                            >
                                <img
                                    src="/assets/plus.png"
                                    alt=""
                                    className="w-10 h-10 rotate-45"
                                />
                            </div>
                            <form
                                onSubmit={submit}
                                className="bg-white p-5 flex flex-col gap-1 md:gap-5"
                                encType="multipart/form-data"
                            >
                                <div className="flex flex-col gap-3">
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
                                        className="block w-full text-sm text-gray-500
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
                                <div className="flex flex-col gap-1 md:gap-3">
                                    <label
                                        htmlFor="nama_kelas"
                                        className="font-bold text-blue-800"
                                    >
                                        Nama Kelas
                                    </label>
                                    <input
                                        type="text"
                                        id="nama"
                                        className="mt-1 block w-full"
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
                                <div className="flex flex-col gap-3">
                                    <label
                                        htmlFor="harga_kelas"
                                        className="font-bold text-blue-800"
                                    >
                                        Harga Kelas
                                    </label>
                                    <input
                                        type="text"
                                        id="harga_kelas"
                                        className="mt-1 block w-full"
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
                                <div className="flex flex-col gap-3">
                                    <label
                                        htmlFor="deskripsi_kelas"
                                        className="font-bold text-blue-800"
                                    >
                                        Deskripsi
                                    </label>
                                    <textarea
                                        id="text"
                                        name="deskripsi_kelas"
                                        type="text"
                                        className="mt-1 block w-full"
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
                                    className="bg-blue-800 text-white p-2 mt-5 font-bold hover:bg-blue-700"
                                >
                                    Tambah Kelas
                                </button>
                            </form>
                        </div>
                    </PopOver>
                )}
                {openEditClass && (
                    <PopOver>
                        <div className="bg-white p-5">
                            <div
                                onClick={() => setOpenEditClass(false)}
                                className=" flex justify-end cursor-pointer"
                            >
                                <img
                                    src="/assets/plus.png"
                                    alt=""
                                    className="w-10 h-10 rotate-45"
                                />
                            </div>
                            <form
                                onSubmit={handleUpdate}
                                className="bg-white p-5 flex flex-col gap-1 md:gap-5"
                                encType="multipart/form-data"
                            >
                                <div className="flex flex-col gap-3">
                                    <label
                                        htmlFor="gambar_kelas"
                                        className="font-bold text-blue-800"
                                    >
                                        <img
                                            src={
                                                image === null
                                                    ? `storage/${data.gambar_kelas}`
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
                                        className="block w-full text-sm text-gray-500
                                   file:mr-4 file:py-2 file:px-4
                                   file:border-0
                                   file:text-sm file:font-semibold
                                   file:bg-blue-50 file:text-blue-700
                                   hover:file:bg-blue-100"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <div className="flex flex-col gap-1 md:gap-3">
                                    <label
                                        htmlFor="nama_kelas"
                                        className="font-bold text-blue-800"
                                    >
                                        Nama Kelas
                                    </label>
                                    <input
                                        type="text"
                                        id="nama"
                                        className="mt-1 block w-full"
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
                                <div className="flex flex-col gap-3">
                                    <label
                                        htmlFor="harga_kelas"
                                        className="font-bold text-blue-800"
                                    >
                                        Harga Kelas
                                    </label>
                                    <input
                                        type="text"
                                        id="harga_kelas"
                                        className="mt-1 block w-full"
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
                                <div className="flex flex-col gap-3">
                                    <label
                                        htmlFor="deskripsi_kelas"
                                        className="font-bold text-blue-800"
                                    >
                                        Deskripsi
                                    </label>
                                    <textarea
                                        id="text"
                                        name="deskripsi_kelas"
                                        type="text"
                                        className="mt-1 block w-full"
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
                                    className="bg-blue-800 text-white p-2 mt-5 font-bold hover:bg-blue-700"
                                >
                                    Update Kelas
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
                    <div className="ml-5 md:ml-0 transition-all duration-500 md:mt-10 flex items-center gap-5 font-bold md:bg-blue-800 p-2 w-64 text-center md:border-2 md:border-blue-800 text-white md:hover:bg-blue-700 md:hover:shadow-lg md:hover:shadow-blue-500/50">
                        <img
                            src="/assets/plus.png"
                            alt=""
                            className="w-10 h-10 md:bg-white p-0 md:p-2"
                        />
                        <p className="hidden md:block">Tambah kelas</p>
                    </div>
                </div>
                <div className="mt-10 pattern-1">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-5 md:p-0">
                        {dataKelas.map((i) => (
                            <div
                                key={i.id}
                                className="transition-all duration-500 bg-white shadow hover:shadow-lg hover:shadow-blue-500/50 cursor-pointer"
                            >
                                <img
                                    src={`storage/${i.gambar_kelas}`}
                                    alt=""
                                    className="w-full h-96 object-cover"
                                />
                                <div className="p-5">
                                    <h1 className="font-bold text-2xl capitalize">
                                        {i.nama_kelas}
                                    </h1>
                                    <p className="my-2 text-justify h-32">
                                        {i.deskripsi_kelas}
                                    </p>
                                    <p className="mt-2 text-blue-800 font-bold text-2xl">
                                        <FormaterRupiah
                                            number={i.harga_kelas}
                                        />
                                    </p>
                                    <div className="flex justify-between mt-10 mx-10">
                                        <div onClick={() => handleEdit(i.id)}>
                                            <img
                                                src="/assets/edit.png"
                                                alt=""
                                                className="w-10 h-10"
                                            />
                                        </div>
                                        <div onClick={() => handleDelete(i.id)}>
                                            <img
                                                src="/assets/delete.png"
                                                alt=""
                                                className="w-10 h-10"
                                            />
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
