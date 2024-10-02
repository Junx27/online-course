import React from "react";

function Footer() {
    return (
        <div className="p-10 mt-10 bg-white shadow-lg">
            <div className="flex gap-3 items-center">
                <img
                    src="/assets/logo.png"
                    alt=""
                    className="w-20 h-20 object-cover"
                />
                <h1 className="font-bold text-xl">Event Academy</h1>
            </div>
            <div className="flex flex-col gap-3">
                <p>Email: eventacademy01@gmail.com</p>
                <p>Phone: 0878-4446-1289</p>
                <p>Sosial Media: eventacademy.id</p>
            </div>
        </div>
    );
}

export default Footer;
