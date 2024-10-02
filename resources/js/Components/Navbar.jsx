import { usePage } from "@inertiajs/react";
import React from "react";
import Button from "./Button";

function Navbar() {
    const message = "helllo";
    const whatsappUrl = `https://wa.me/6287844461289?text=${message}`;
    return (
        <div className="flex justify-between items-center px-5 md:px-32 mt-10 z-50 bg-white">
            <div className="flex flex-col items-center">
                <img
                    src="/assets/logo.png"
                    alt=""
                    className="w-10 h-10 md:w-32 md:h-32"
                />
                <h1 className="font-bold text-xs md:text-xl">Event Academy</h1>
            </div>
            <a
                href={whatsappUrl}
                className="transition-all duration-500 text-xs md:text-xl md:w-64 font-bold bg-blue-800 p-5 text-center border-2 border-blue-800 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50"
            >
                More Information &rarr;
            </a>
        </div>
    );
}

export default Navbar;
