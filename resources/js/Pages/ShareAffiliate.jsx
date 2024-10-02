import Footer from "@/Components/Footer";
import FormaterRupiah from "@/Components/FormaterRupiah";
import Navbar from "@/Components/Navbar";
import Pattern from "@/Components/Pattern";
import Pattern2 from "@/Components/Pattern2";
import PopOver from "@/Components/PopOver";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ShareAffiliate({ id }) {
    const now = new Date();
    const [openCreateClass, setOpenCreateClass] = useState(false);
    const [gambar, setGambar] = useState();
    const [harga, setHarga] = useState();
    const [deskripsi, setDeskripsi] = useState();
    const { data, setData, post } = useForm({
        nama_kelas: "",
        nama_siswa: "",
        kontak_siswa: "",
        tanggal_pesan: now.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }),
        status_siswa: "menunggu",
        email_siswa: "",
        nama_affiliate: "",
        email_affiliate: "",
        kontak_affiliate: "",
        kelas_id: "",
    });
    useEffect(() => {
        const singgleData = async () => {
            try {
                const response = await axios.get(
                    `/api/data-kelas-affiliate/${id}`
                );
                setGambar(response.data.kelas.gambar_kelas);
                setHarga(response.data.kelas.harga_kelas);
                setDeskripsi(response.data.kelas.deskripsi_kelas);
                setData((prev) => ({
                    ...prev,
                    nama_kelas: response.data.kelas.nama_kelas,
                    kelas_id: response.data.kelas.id,
                    nama_affiliate: response.data.user.nama,
                    email_affiliate: response.data.user.email,
                    kontak_affiliate: response.data.user.kontak || "-",
                }));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        singgleData();
    }, [id, setData]);

    const submit = (e) => {
        e.preventDefault();
        post(route("create.class.guest"));
    };
    return (
        <div className="">
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
                            className="bg-white p-5 flex flex-col gap-5 w-96"
                            encType="multipart/form-data"
                        >
                            <input
                                type="text"
                                id="nama_kelas"
                                className="hidden"
                                value={data.nama_kelas}
                                max={30}
                                required
                            />
                            <div className="flex flex-col gap-3">
                                <label
                                    htmlFor="nama_siswa"
                                    className="font-bold text-blue-800"
                                >
                                    Nama Siswa
                                </label>
                                <input
                                    type="text"
                                    id="nama_siswa"
                                    className="mt-1 block w-full"
                                    value={data.nama_siswa}
                                    onChange={(e) =>
                                        setData("nama_siswa", e.target.value)
                                    }
                                    max={30}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label
                                    htmlFor="kontak_siswa"
                                    className="font-bold text-blue-800"
                                >
                                    Kontak Siswa
                                </label>
                                <input
                                    type="number"
                                    id="kontak_siswa"
                                    className="mt-1 block w-full"
                                    value={data.kontak_siswa}
                                    onChange={(e) =>
                                        setData("kontak_siswa", e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label
                                    htmlFor="email_siswa"
                                    className="font-bold text-blue-800"
                                >
                                    Email Siswa
                                </label>
                                <input
                                    type="email"
                                    id="email_siswa"
                                    className="mt-1 block w-full"
                                    value={data.email_siswa}
                                    onChange={(e) =>
                                        setData("email_siswa", e.target.value)
                                    }
                                    max={30}
                                    required
                                />
                            </div>
                            <input
                                type="text"
                                id="tanggal_pesan"
                                className="hidden"
                                value={data.tanggal_pesan}
                                required
                            />
                            <input
                                type="text"
                                name="kelas_id"
                                className=""
                                value={data.kelas_id}
                                required
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

            <div className="relative z-50 p-10 font-bold text-xl md:text-2xl px-5 md:px-20">
                <a href="/">&larr; Kembali</a>
            </div>
            <div className="mx-0 md:mx-32 -mt-20">
                <Pattern>
                    <img
                        src={`/storage/${gambar}`}
                        alt=""
                        className="w-full h-[400px] object-cover mt-20 md:mt-32"
                    />
                </Pattern>
            </div>
            <div className="mt-32 md:mt-20 flex justify-between items-center">
                <div className="w-full px-5 md:px-32">
                    <h1 className="font-bold text-5xl md:text-7xl pattern-1 p-2 text-blue-800 capitalize">
                        {data.nama_kelas}
                    </h1>
                    <p className="mt-10">{deskripsi}</p>
                    <p className="mt-10 text-5xl font-bold">
                        <FormaterRupiah number={harga} />
                    </p>
                </div>
                <div className="hidden md:block w-full mx-auto md:p-32">
                    <Pattern>
                        <img
                            src="/assets/studying.png"
                            alt=""
                            className="w-96 h-96 object-cover"
                        />
                    </Pattern>
                </div>
            </div>
            <div
                className="flex justify-center mt-10  md:-mt-10 cursor-pointer md:mb-20"
                onClick={() => setOpenCreateClass(true)}
            >
                <h1 className="transition-all duration-500 w-96 bg-blue-800 p-5 text-center text-3xl font-bold border-2 border-blue-800 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50">
                    Pesan Kelas Sekarang
                </h1>
            </div>
            <div>
                <h1 className="mt-20 md:mt-0 font-bold text-4xl md:text-7xl m-5 md:m-32 text-center">
                    Media
                    <span className="text-blue-800 mx-2">Pembelajaran</span>
                    <br /> Kami{" "}
                    <span className="text-yellow-400 mx-2">Event Academy</span>
                </h1>
            </div>
            <div className="mx-5 md:mx-32 mt-20 grid grid-cols-1 md:grid-cols-2 gap-20 pattern-1">
                <div className="transition-all duration-500 hover:shadow-lg p-5 cursor-pointer bg-white">
                    <h1 className="w-full font-bold text-3xl md:text-5xl">
                        <span className="bg-blue-400 p-2 px-5 mr-5">1</span>
                        Platform Online
                    </h1>
                    <p className="mt-10">
                        Kursus pembelajaran yang dilakukan secara online melalui
                        aplikasi zoom meeting dengan client, kursus semacam
                        webinar, E-cource, Kelas mulai dari mingguan hingga
                        tahunan pun juga ada dengan berbagai materi.
                    </p>
                </div>
                <div className="transition-all duration-500 hover:shadow-lg p-5 cursor-pointer bg-white">
                    <h1 className="w-full font-bold text-3xl md:text-5xl">
                        <span className="bg-sky-400 p-2 px-5 mr-5">2</span>
                        Platform Offline
                    </h1>
                    <p className="mt-10">
                        Kursus pembelajaran yang dilakukan secara offline tatap
                        muka langsung dengan client, kursus semacam seminar
                        workshop dari berbagai materi.
                    </p>
                </div>
                <div className="transition-all duration-500 hover:shadow-lg p-5 cursor-pointer bg-white">
                    <h1 className="w-full font-bold text-3xl md:text-5xl">
                        <span className="bg-cyan-400 p-2 px-5 mr-5">3</span>
                        Relations
                    </h1>
                    <p className="mt-10">
                        Kerjasama dengan member event academy untuk dibantu
                        membuat sebuah start-up sesuai bidang yang mereka
                        tekuni.
                    </p>
                </div>
                <div className="transition-all duration-500 hover:shadow-lg p-5 cursor-pointer bg-white">
                    <h1 className="w-full font-bold text-3xl md:text-5xl">
                        <span className="bg-yellow-400 p-2 px-5 mr-5">4</span>
                        Creative
                    </h1>
                    <p className="mt-10">
                        Menampilkan berbagai karya anak muda diantaranya design
                        " poster/banner/dll, hasil copywriting, puisi, dan karya
                        lainnya..
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mx-5 md:mx-32 pb-64 mt-32 pattern-1">
                <div className="order-last md:order-first">
                    <h1 className="font-bold text-3xl md:text-5xl">
                        <span className="text-blue-800 mx-2">Paltform</span>
                        <span className="text-yellow-400 mx-2">Offline</span>
                    </h1>
                    <div className="flex flex-col gap-10 mt-10">
                        <div className="transition-all duration-500 hover:shadow-lg p-5 cursor-pointer bg-white">
                            <h1 className="w-full font-bold text-2xl">
                                Seminar <br />
                                <span className="bg-red-300/50 text-red-500 px-3 p-2 text-sm">
                                    Offline
                                </span>
                            </h1>
                            <p className="mt-5">
                                Pembelajaran sesuai berbagai materi yang kami
                                adakan, materi akan selalu terupdate, bertemu
                                face to face dengan para pebisnis lain.
                            </p>
                        </div>
                        <div className="transition-all duration-500 hover:shadow-lg p-5 cursor-pointer bg-white">
                            <h1 className="w-full font-bold text-2xl">
                                Workshop <br />
                                <span className="bg-red-300/50 text-red-500 px-3 p-2 text-sm">
                                    Offline
                                </span>
                            </h1>
                            <p className="mt-5">
                                Pembelajaran sambil perkenalan produk" kami
                                hingga para pebisnis yang bergabung dengan kami
                                dalam penjualan produk mereka.
                            </p>
                        </div>
                    </div>
                    <div className="mt-20">
                        <Pattern>
                            <img
                                src="/assets/note.png"
                                alt=""
                                className="w-64 h-64 md:w-96 md:h-96 object-cover"
                            />
                        </Pattern>
                    </div>
                    <Footer />
                </div>
                <div>
                    <h1 className="font-bold text-5xl">
                        <span className="text-blue-800 mx-2">Paltform</span>
                        <span className="text-yellow-400 mx-2">Online</span>
                    </h1>
                    <div className="flex flex-col gap-10 mt-10">
                        <div className="transition-all duration-500 hover:shadow-lg p-5 cursor-pointer bg-white">
                            <h1 className="w-full font-bold text-2xl">
                                Grup WhatsApp
                                <br />
                                <span className="bg-green-300/50 text-green-500 px-3 p-2 text-sm mr-3">
                                    Whatsapp
                                </span>
                                <span className="bg-green-300/50 text-green-500 px-3 p-2 text-sm">
                                    Online
                                </span>
                            </h1>
                            <p className="mt-5">
                                Grup sesuai dengan minat materi yang kalian
                                inginkan, anggota grup dari berbagai daerah,
                                digunakan untuk diskusi/sharing sesuai nama
                                group.
                            </p>
                        </div>
                        <div className="transition-all duration-500 hover:shadow-lg p-5 cursor-pointer bg-white">
                            <h1 className="w-full font-bold text-2xl">
                                Saluran WhatsApp
                                <br />
                                <span className="bg-green-300/50 text-green-500 px-3 p-2 text-sm mr-3">
                                    Whatsapp
                                </span>
                                <span className="bg-green-300/50 text-green-500 px-3 p-2 text-sm">
                                    Online
                                </span>
                            </h1>
                            <p className="mt-5">
                                Sharing berbagai informasi terkait materi
                                pembelajaran terkini, pendidikan, dan berbagai
                                hal positif lainnya.
                            </p>
                        </div>
                        <div className="transition-all duration-500 hover:shadow-lg p-5 cursor-pointer bg-white">
                            <h1 className="w-full font-bold text-2xl">
                                Postingan Feed & story
                                <br />
                                <span className="bg-pink-300/50 text-pink-500 px-3 p-2 text-sm mr-3">
                                    Instagram
                                </span>
                                <span className="bg-green-300/50 text-green-500 px-3 p-2 text-sm">
                                    Online
                                </span>
                            </h1>
                            <p className="mt-5">
                                Akan kami posting sesuai materi pembelajaran
                                yang kami sediakan, upgrade pengetahuanmu dengan
                                postingan kami, positif vibes
                            </p>
                        </div>
                        <div className="transition-all duration-500 hover:shadow-lg p-5 cursor-pointer bg-white">
                            <h1 className="w-full font-bold text-2xl">
                                Live Instagram
                                <br />
                                <span className="bg-pink-300/50 text-pink-500 px-3 p-2 text-sm mr-3">
                                    Instagram
                                </span>
                                <span className="bg-green-300/50 text-green-500 px-3 p-2 text-sm">
                                    Online
                                </span>
                            </h1>
                            <p className="mt-5">
                                Beberapa kali akan kami sediakan jadwal live
                                untuk tanya jawab terkait pembelajaran kami.
                            </p>
                        </div>
                        <div className="transition-all duration-500 hover:shadow-lg p-5 cursor-pointer bg-white">
                            <h1 className="w-full font-bold text-2xl">
                                Kuis & Giveaway <br />
                                <span className="bg-pink-300/50 text-pink-500 px-3 p-2 text-sm mr-3">
                                    Instagram
                                </span>
                                <span className="bg-green-300/50 text-green-500 px-3 p-2 text-sm">
                                    Online
                                </span>
                            </h1>
                            <p className="mt-5">
                                Akan ada kuis & giveaway menarik untuk kalian
                                yang rajin update info " pembelajaran terbaru
                                kami.
                            </p>
                        </div>
                        <div className="transition-all duration-500 hover:shadow-lg p-5 cursor-pointer bg-white">
                            <h1 className="w-full font-bold text-2xl">
                                Meeting <br />
                                <span className="bg-blue-300/50 text-blue-500 px-3 p-2 text-sm mr-3">
                                    Zoom
                                </span>
                                <span className="bg-green-300/50 text-green-500 px-3 p-2 text-sm">
                                    Online
                                </span>
                            </h1>
                            <p className="mt-5">
                                Meeting sesuai jadwal webinar/kelas kami, materi
                                terupdate setiap akan ada event terbaru, sharing
                                bersama gaakan bikin bosan.
                            </p>
                        </div>
                        <div className="transition-all duration-500 hover:shadow-lg p-5 cursor-pointer bg-white">
                            <h1 className="w-full font-bold text-2xl">
                                Recording <br />
                                <span className="bg-blue-300/50 text-blue-500 px-3 p-2 text-sm mr-3">
                                    Zoom
                                </span>
                                <span className="bg-green-300/50 text-green-500 px-3 p-2 text-sm">
                                    Online
                                </span>
                            </h1>
                            <p className="mt-5">
                                File recording ada penyimpanan tersendiri buat
                                kalian yang mengikuti meeting, dapat dilihat
                                berkali- kali.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShareAffiliate;
