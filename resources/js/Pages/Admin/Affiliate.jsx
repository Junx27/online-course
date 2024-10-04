import React, { useEffect, useState } from "react";
import RoleAccess from "../Middleware/RoleAccess";
import SideBar from "@/Components/SideBar";
import { Head } from "@inertiajs/react";

function Affiliate({ auth }) {
    const [dataUser, setDataUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/users");
                setDataUser(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
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
                <Head title="Affiliate Admin" />
                <div>
                    <h1 className="font-bold text-3xl md:text-5xl text-center mt-10 md:mt-20">
                        Daftar
                        <span className="text-blue-800 mx-2">Affiliate</span>
                        <span className="text-yellow-400 mx-2">Kamu</span>
                    </h1>
                </div>
                <div className="p-5 md:p-10 pattern-1 mt-10">
                    {dataUser.map((i) => (
                        <div
                            key={i.id}
                            className="flex flex-col md:flex-row gap-10 items-center p-5 shadow-lg border-b bg-white hover:bg-blue-50 cursor-pointer"
                        >
                            <img
                                src={
                                    i.gambar === null
                                        ? "/assets/boy.png"
                                        : `storage/${i.gambar}`
                                }
                                alt=""
                                className="w-[100px] h-[100px] object-cover"
                            />
                            <div className="w-full flex flex-col md:flex-row md:justify-between">
                                <h1 className="my-2">
                                    <span className="font-bold">
                                        Nama Affiliate:
                                    </span>
                                    <br />
                                    {i.nama}
                                </h1>
                                <h1 className="my-2">
                                    <span className="font-bold">Email:</span>
                                    <br />
                                    {i.email}
                                </h1>
                                <h1 className="my-2">
                                    <span className="font-bold">Kontak:</span>
                                    <br />
                                    {i.kontak}
                                </h1>
                                <button>
                                    <img
                                        src="/assets/delete.png"
                                        alt=""
                                        className="w-10 h-10 ml-64 md:ml-0 md:mr-10"
                                    />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </SideBar>
        </RoleAccess>
    );
}

export default Affiliate;
