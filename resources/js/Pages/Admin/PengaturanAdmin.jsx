import React, { useState } from "react";
import RoleAccess from "../Middleware/RoleAccess";
import SideBar from "@/Components/SideBar";
import Pattern2 from "@/Components/Pattern2";
import { Head, useForm } from "@inertiajs/react";

function PengaturanAdmin({ auth }) {
    const [image, setImage] = useState(null);
    const { data, setData, post } = useForm({
        _method: "PUT",
        nama: auth.user.nama,
        email: auth.user.email,
        kontak: auth.user.kontak,
        gambar: auth.user.gambar,
    });
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData("gambar", file);
        setImage(URL.createObjectURL(file));
    };
    const submit = (e) => {
        e.preventDefault();
        post(route("profile.update", { id: auth.user.id }));
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
                <Head title="Pengaturan Admin" />
                <div className="flex gap-10 items-center p-5 md:p-10">
                    <div className="w-full mx-auto p-32 hidden md:block">
                        <h1 className="font-bold text-5xl">Tips</h1>
                        <p className="my-5">
                            Rubahlah data sesuai dengan kebutuhan. Saran jangan
                            sering merubah profil, gunakan dengan bijak.
                        </p>
                        <Pattern2>
                            <img
                                src="/assets/bird.png"
                                alt=""
                                className="w-56 h-56 object-cover"
                            />
                        </Pattern2>
                    </div>
                    <div className="w-full p-5 pattern-1">
                        <form
                            onSubmit={submit}
                            className="bg-white p-2 md:p-5 flex flex-col gap-5 pattern-1 shadow-lg"
                            encType="multipart/form-data"
                        >
                            <div className="flex flex-col gap-3">
                                <label
                                    htmlFor="gambar"
                                    className="font-bold text-blue-800"
                                >
                                    {auth.user.gambar === null ? (
                                        <img
                                            src="/assets/boy.png"
                                            alt=""
                                            className="w-32 h-32 mx-auto"
                                        />
                                    ) : (
                                        <img
                                            src={
                                                image === null
                                                    ? `storage/${auth.user.gambar}`
                                                    : image
                                            }
                                            alt=""
                                            className="w-full h-[150px] object-cover"
                                        />
                                    )}
                                </label>
                                <input
                                    id="gambar"
                                    type="file"
                                    name="gambar"
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
                            <div className="flex flex-col gap-3">
                                <label
                                    htmlFor="nama"
                                    className="font-bold text-blue-800"
                                >
                                    Nama
                                </label>
                                <input
                                    type="text"
                                    id="nama"
                                    className="mt-1 block w-full border-none outline-none bg-blue-50"
                                    value={data.nama}
                                    onChange={(e) =>
                                        setData("nama", e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label
                                    htmlFor="email"
                                    className="font-bold text-blue-800"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full border-none outline-none bg-blue-50"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label
                                    htmlFor="kontak"
                                    className="font-bold text-blue-800"
                                >
                                    Kontak
                                </label>
                                <input
                                    type="text"
                                    id="kontak"
                                    className="mt-1 block w-full border-none outline-none bg-blue-50"
                                    value={data.kontak}
                                    onChange={(e) =>
                                        setData("kontak", e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <button className="trasnition-all duration-500 py-4 bg-blue-800 text-white p-2 mt-5 font-bold hover:bg-blue-700">
                                Simpan Perubahan
                            </button>
                        </form>
                    </div>
                </div>
            </SideBar>
        </RoleAccess>
    );
}

export default PengaturanAdmin;
