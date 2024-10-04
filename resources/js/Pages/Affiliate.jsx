import Navbar from "@/Components/Navbar";
import Pattern from "@/Components/Pattern";
import { Head } from "@inertiajs/react";
import React from "react";

function Affiliate() {
    return (
        <div className="pattern-1">
            <Head title="Affiliate-Register" />
            <div className="p-10 font-bold text-xl md:text-2xl px-5 md:px-20">
                <a href="/">&larr; Kembali</a>
            </div>
            <div className="mt-0 md:mt-32 mx-5 md:mx-32 flex justify-between items-center pb-32">
                <div className="w-full hidden md:block">
                    <Pattern>
                        <img
                            src="/assets/money.png"
                            alt=""
                            className="w-64 h-64 object-cover mx-auto mt-20"
                        />
                    </Pattern>
                </div>
                <div className="relative w-full">
                    <h1 className="font-bold text-7xl">
                        Program Affiliate <br />{" "}
                        <span className="text-yellow-400">Event </span>
                        <span className="text-blue-800">Academy </span>
                    </h1>
                    <p className="mt-10">
                        Hasilkan uang bersama Event Academy dengan mengikuti
                        program affiliate
                    </p>
                    <div className="flex gap-5 md:gap-20 mt-20 text-2xl font-bold">
                        <a
                            href="/login"
                            className="transition-all duration-500 bg-blue-50 p-5 w-full text-center border-2 border-blue-800 hover:bg-blue-100 hover:shadow-lg hover:shadow-blue-500/50"
                        >
                            Login
                        </a>
                        <a
                            href="/register"
                            className="transition-all duration-500 bg-blue-800 p-5 w-full text-center border-2 border-blue-800 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50"
                        >
                            Register
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Affiliate;
