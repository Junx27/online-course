import { useForm } from "@inertiajs/react";
import React, { useState } from "react";

function Gambar({ id, gambar, handleClose }) {
    const [image, setImage] = useState(null);

    const { data, setData, post } = useForm({
        _method: "PUT",
        gambar_kelas: null,
    });
    console.log(data.gambar_kelas);

    const gambarUpdate = (e) => {
        e.preventDefault();
        post(`/update-gambar-class/${id}`, data);
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData("gambar_kelas", file);
        setImage(URL.createObjectURL(file));
    };
    return (
        <div className="bg-white relative pattern-1">
            <div
                className="flex justify-end p-5 cursor-pointer"
                onClick={handleClose}
            >
                <img src="/assets/plus.png" alt="" className="w-10 h-10" />
            </div>
            <form onSubmit={gambarUpdate} encType="multipart/form-data">
                <div className="flex flex-col px-5">
                    <label
                        htmlFor="gambar_kelas"
                        className="font-bold text-blue-800"
                    >
                        <img
                            src={image === null ? `/storage/${gambar}` : image}
                            alt=""
                            className="w-96 h-96 object-cover p-5"
                        />
                    </label>
                    <input
                        id="gambar_kelas"
                        type="file"
                        name="gambar_kelas"
                        className="my-3 block w-full text-sm text-gray-500
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
                <button
                    type="submit"
                    className="bg-blue-800 w-full py-4 font-bold text-white mt-3"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Gambar;
