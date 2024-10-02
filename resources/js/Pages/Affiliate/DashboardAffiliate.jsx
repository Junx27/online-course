import React, { useEffect, useState } from "react";
import AffiliateSideBar from "@/Components/AffiliateSideBar";
import RoleAccess from "../Middleware/RoleAccess";
import Pattern from "@/Components/Pattern";
import { useForm, usePage } from "@inertiajs/react";
import axios from "axios";
import FormaterRupiah from "@/Components/FormaterRupiah";

function DashboardAffiliate({ auth }) {
    const { errors } = usePage().props;
    const [dataKelas, setDataKelas] = useState([]);
    const [dataAffiliate, setDataAffiliate] = useState([]);
    const [dataPesananAffiliate, setDataPesananAffiliate] = useState([]);
    const [id, setId] = useState(null);
    const [image, setImage] = useState(null);
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
    } = useForm({
        kelas_id: null,
        user_id: auth.user.id,
    });
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData("gambar_kelas", file);
        setImage(URL.createObjectURL(file));
    };
    const submit = (e) => {
        e.preventDefault();
        post(route("create.affiliate"));
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
    }, [id]);
    const handleEdit = (id) => {
        setData("kelas_id", id);
    };
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
                    {errors.message && (
                        <div className="flex justify-between mt-20">
                            <div className="bg-red-500 text-white p-3 rounded">
                                {errors.message}
                            </div>
                            <img
                                src="/assets/plus.png"
                                alt=""
                                className="w-10 h-10 rotate-45 cursor-pointer"
                                onClick={() => window.location.reload()}
                            />
                        </div>
                    )}
                    <h1 className="font-bold">
                        <div>
                            <h1 className="font-bold text-5xl md:text-7xl m-5 md:m-32 text-start md:text-center">
                                Selamat Datang
                                <span className="text-blue-800 mx-2">
                                    Affiliate
                                </span>
                                <br />
                                <span className="text-yellow-400 mx-2">
                                    Event Academy
                                </span>
                            </h1>
                        </div>
                    </h1>
                    <div className="flex flex-col md:flex-row items-center">
                        <Pattern>
                            <img
                                src="/assets/money.png"
                                alt=""
                                className="w-64 h-64 object-cover mx-auto mt-20"
                            />
                        </Pattern>
                        <p className="text-center mx-5 md:mx-20">
                            Pada fitur ini para affiliate dapat menghasilkan
                            uang, caranya cukup tambahkan daftar kelas yang akan
                            di share sebagai link affiliate kamu. Berikut data
                            fitur affiliate kamu, untuk informasi lebih lanjut
                            dapat menghubungi admin Event Academy
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10 mt-10 pattern-1 p-2 md:p-10">
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
                                        (i) =>
                                            i.nama_affiliate ===
                                                auth.user.nama &&
                                            i.status_siswa === "diterima"
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
                                        (i) =>
                                            i.nama_affiliate ===
                                                auth.user.nama &&
                                            i.status_siswa === "menunggu"
                                    ).length
                                }
                            </p>
                            <p className="text-center mt-3">
                                Affiliate Pending
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className="font-bold text-5xl md:text-7xl m-5 mt-10 md:mt-0 md:m-32 text-center">
                        Tambahkan Ke
                        <span className="text-blue-800 mx-2">Daftar</span>
                        <br /> Kelas{" "}
                        <span className="text-yellow-400 mx-2">
                            Affiliate Kamu
                        </span>
                    </h1>
                </div>
                <p className="text-center mx-5 md:mx-20">
                    Berikut daftar kelas yang dapat kamu tambahkan ke dalam
                    daftar kelas affiliate kamu
                </p>
                <div className="mt-10 pattern-1">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-5 md:p-10">
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
                                    <div className="mt-5">
                                        <form
                                            action=""
                                            onSubmit={submit}
                                            onClick={() => handleEdit(i.id)}
                                        >
                                            <button className="transition-all duration-500 flex items-center gap-3 font-bold bg-blue-800 p-2 w-full text-center border-2 border-blue-800 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50">
                                                <img
                                                    src="/assets/affiliate.png"
                                                    alt=""
                                                    className="w-10 h-10 bg-white"
                                                />
                                                Tambahkan Affiliate
                                            </button>
                                        </form>
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

export default DashboardAffiliate;
