import React, { useEffect, useState } from "react";
import RoleAccess from "../Middleware/RoleAccess";
import AffiliateSideBar from "@/Components/AffiliateSideBar";
import axios from "axios";

function DataAffiliate({ auth }) {
    const [dataSiswa, setDataSiswa] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("/api/pesanan-affiliate");
            setDataSiswa(response.data);
        };
        fetchData();
    }, []);

    const loadScripts = () => {
        return new Promise((resolve, reject) => {
            const html2canvasScript = document.createElement("script");
            html2canvasScript.src =
                "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
            html2canvasScript.onload = () => {
                const jsPDFScript = document.createElement("script");
                jsPDFScript.src =
                    "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
                jsPDFScript.onload = () => resolve();
                jsPDFScript.onerror = () => reject();
                document.body.appendChild(jsPDFScript);
            };
            document.body.appendChild(html2canvasScript);
        });
    };

    const generatePdf = async (id) => {
        await loadScripts();

        const { jsPDF } = window.jspdf; // Access jsPDF from the global window object
        const pdfContent = document.getElementById(`pdf-content-${id}`);

        html2canvas(pdfContent)
            .then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF("l", "mm", "a4"); // "l" for landscape orientation
                const imgWidth = 297; // A4 width in mm
                const pageHeight = 210; // A4 height in mm
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;

                let position = 0;

                // Add the first page
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                // If the content is larger than one page, add additional pages
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(
                        imgData,
                        "PNG",
                        0,
                        position,
                        imgWidth,
                        imgHeight
                    );
                    heightLeft -= pageHeight;
                }

                pdf.save(`affiliate_data_${id}.pdf`);
            })
            .catch((error) => {
                console.error("Error generating PDF:", error);
            });
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
                    <h1 className="font-bold text-3xl md:text-5xl text-center mt-10 md:mt-20">
                        Daftar
                        <span className="text-blue-800 mx-2">Affiliate</span>
                        <span className="text-yellow-400 mx-2">Kamu</span>
                    </h1>
                </div>
                <p className="mt-10 text-center mx-5 md:mx-20">
                    Berikut data kelas affiliate kamu untuk mendapatkan komisi
                    syarat dan ketentuan berlaku, informasi lebih lanjut hubungi
                    admin Event Academy.
                </p>
                <div className="p-5 md:p-10 pattern-1">
                    {dataSiswa
                        .filter((i) => i.nama_affiliate === auth.user.nama)
                        .map((i) => (
                            <div
                                key={i.id}
                                className="flex flex-col md:flex-row gap-10 items-center bg-white p-5 shadow-lg border-b"
                                id={`pdf-content-${i.id}`}
                            >
                                <img
                                    src={`storage/${i.kelas.gambar_kelas}`}
                                    alt=""
                                    className="w-64 h-64 object-cover"
                                />
                                <div className="w-full">
                                    <h1 className="my-2">
                                        <span className="font-bold">
                                            Nama Kelas:
                                        </span>
                                        <br />
                                        {i.kelas.nama_kelas}
                                    </h1>
                                    <h1 className="my-2">
                                        <span className="font-bold">
                                            Tanggal Pesan:
                                        </span>
                                        <br />
                                        {i.tanggal_pesan}
                                    </h1>
                                    <h1 className="my-2">
                                        <span className="font-bold">
                                            Harga:
                                        </span>
                                        <br />
                                        {i.kelas.harga_kelas}
                                    </h1>
                                    <h1 className="my-2 truncate w-32">
                                        <span className="font-bold">
                                            Deskripsi:
                                        </span>
                                        <br />
                                        <p className="p-2 mt-2">-</p>
                                    </h1>
                                </div>
                                <div className="w-full">
                                    <h1 className="my-2">
                                        <span className="font-bold">
                                            Nama Siswa:
                                        </span>
                                        <br />
                                        {i.nama_siswa}
                                    </h1>
                                    <h1 className="my-2">
                                        <span className="font-bold">
                                            Email:
                                        </span>
                                        <br />
                                        {i.email_siswa}
                                    </h1>
                                    <h1 className="my-2">
                                        <span className="font-bold">
                                            Kontak:
                                        </span>
                                        <br />
                                        {i.kontak_siswa}
                                    </h1>
                                    <h1 className="my-2">
                                        <span className="font-bold">
                                            Status Pesanan:
                                        </span>
                                        <br />
                                        <p
                                            className={`p-2 cursor-pointer mt-2 ${
                                                i.status_siswa === "menunggu"
                                                    ? "font-bold text-blue-500"
                                                    : i.status_siswa ===
                                                      "diterima"
                                                    ? "font-bold text-green-500"
                                                    : "font-bold text-red-500"
                                            }`}
                                        >
                                            {i.status_siswa}
                                        </p>
                                    </h1>
                                </div>
                                <div className="w-full">
                                    <h1 className="my-2">
                                        <span className="font-bold">
                                            Nama Affiliate:
                                        </span>
                                        <br />
                                        {i.nama_affiliate}
                                    </h1>
                                    <h1 className="my-2">
                                        <span className="font-bold">
                                            Email:
                                        </span>
                                        <br />
                                        {i.email_affiliate}
                                    </h1>
                                    <h1 className="my-2">
                                        <span className="font-bold">
                                            Kontak:
                                        </span>
                                        <br />
                                        {i.kontak_affiliate}
                                    </h1>
                                    <h1>
                                        <span className="font-bold">
                                            Bukti Affiliate:
                                        </span>
                                        <br />
                                        <button
                                            onClick={() => generatePdf(i.id)}
                                            className="font-bold text-green-500 text-center cursor-pointer mt-2 p-2"
                                        >
                                            Download
                                        </button>
                                    </h1>
                                </div>
                            </div>
                        ))}
                </div>
            </AffiliateSideBar>
        </RoleAccess>
    );
}

export default DataAffiliate;
