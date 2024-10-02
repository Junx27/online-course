import { Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";

function AffiliateSideBar({ children, gambar, nama }) {
    const [open, setOpen] = useState(false);
    const { url } = usePage();
    const sidebar = [
        {
            nama: "Dashboard",
            link: "/dashboard-affiliate",
            gambar: "/assets/dashboard.png",
        },
        {
            nama: "Data Afiliate",
            link: "/data-affiliate",
            gambar: "/assets/affiliate.png",
        },
        {
            nama: "Affiliate",
            link: "/produk-affiliate",
            gambar: "/assets/share.png",
        },
        {
            nama: "Pengaturan",
            link: "/pengaturan-affiliate",
            gambar: "/assets/setting.png",
        },
        {
            nama: "Logout",
            link: "/logout",
            gambar: "/assets/logout.png",
        },
    ];
    return (
        <div className="overflow-hidden">
            <div className="fixed w-full p-3 border-b bg-white z-40">
                <div className="flex px-5 md:px-0 justify-between md:justify-end pr-5">
                    <div
                        onClick={() => setOpen(true)}
                        className="md:hidden block"
                    >
                        <img
                            src="/assets/menu.png"
                            alt=""
                            className="w-10 h-10"
                        />
                    </div>
                    <div className="flex items-center gap-5">
                        <h1 className="capitalize">
                            <span className="font-bold">Hi,</span>
                            {nama}
                        </h1>
                        <img
                            src={gambar}
                            alt=""
                            className="w-10 h-10 object-cover rounded-full"
                        />
                    </div>
                </div>
            </div>
            <div
                className={`transition-all duration-500 md:block fixed w-64 h-screen border-r bg-white z-50 ${
                    open ? "ml-0" : "-ml-[600px]"
                }`}
            >
                <div className="flex flex-col items-center gap-5 p-5">
                    <img src="/assets/logo.png" alt="" className="w-12 h-12" />
                    <h1 className="font-bold">Event Academy</h1>
                </div>
                <div className="mt-10 flex flex-col gap-5">
                    {sidebar.map((i) => (
                        <Link
                            key={i.nama}
                            href={i.link}
                            method={`${i.nama === "Logout" ? "post" : ""}`}
                            className={`transition-all duration-500 px-10 p-1 flex items-center gap-2 ${
                                url === i.link
                                    ? "font-bold bg-blue-800 border-2 border-blue-800 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50"
                                    : ""
                            }`}
                        >
                            <img
                                src={i.gambar}
                                alt=""
                                className="w-12 h-12 p-2 bg-white"
                            />
                            {i.nama}
                        </Link>
                    ))}
                </div>
                <div
                    className="inset-0 absolute ml-64 bg-opacity-10 bg-black/50 w-full h-full z-20"
                    onClick={() => setOpen(false)}
                ></div>
            </div>
            <div className="hidden transition-all duration-500 md:block fixed w-64 h-screen border-r bg-white z-50">
                <div className="flex flex-col items-center gap-5 p-5">
                    <img src="/assets/logo.png" alt="" className="w-12 h-12" />
                    <h1 className="font-bold">Event Academy</h1>
                </div>
                <div className="mt-10 flex flex-col gap-5">
                    {sidebar.map((i) => (
                        <Link
                            key={i.nama}
                            href={i.link}
                            method={`${i.nama === "Logout" ? "post" : ""}`}
                            className={`transition-all duration-500 px-10 p-1 flex items-center gap-2 ${
                                url === i.link
                                    ? "font-bold bg-blue-800 border-2 border-blue-800 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50"
                                    : ""
                            }`}
                        >
                            <img
                                src={i.gambar}
                                alt=""
                                className="w-12 h-12 p-2 bg-white"
                            />
                            {i.nama}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="md:ml-64 md:p-10 pt-20">{children}</div>
        </div>
    );
}

export default AffiliateSideBar;
