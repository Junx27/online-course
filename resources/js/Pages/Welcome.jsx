import Navbar from "@/Components/Navbar";
import Pattern from "@/Components/Pattern";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

function Welcome() {
    const [dataKelas, setDataKelas] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/kelas");
                setDataKelas(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="overflow-hidden pattern-1">
            <Head title="Welcome" />
            <Navbar />
            <div className="">
                <div className="flex flex-col md:flex-row md:justify-between items-center">
                    <div className="w-full px-5 md:px-32 order-last md:order-first">
                        <h1 className="font-bold text-5xl md:text-7xl pattern-1 p-2">
                            With <span className="text-yellow-400">Event </span>
                            <br />
                            <span className="text-blue-800">Academy </span>.
                        </h1>
                        <p className="mt-10">
                            Mewujudkan platfrom pembelajaran yang aktif,
                            inovatif dan meningkatkan ilmu pengetahuan untuk
                            generasi muda, sehingga dapat mengembangkan skill
                            anak muda yang mampu bermanfaat untuk kehidupan di
                            dunia nyata & maya.
                        </p>
                    </div>
                    <div className="w-full mx-auto p-5 md:p-32">
                        <Pattern>
                            <img
                                src="/assets/back-to-school.png"
                                alt=""
                                className="w-64 h-64 md:w-96 md:h-96 object-cover mt-12 md:mt-0"
                            />
                        </Pattern>
                    </div>
                </div>
                <div className="mt-10 md:-mt-10">
                    <Pattern>
                        <h1 className="font-bold text-5xl md:text-7xl m-10 mt-20 md:m-32 text-center">
                            Temukan
                            <span className="text-blue-800 mx-2">
                                Kelas Impianmu
                            </span>
                            <br /> Disini{" "}
                            <span className="text-yellow-400 mx-2">
                                Sekarang
                            </span>
                        </h1>
                    </Pattern>
                    <p className="mx-5 md:mx-64 text-center">
                        "Kami menyediakan berbagai kelas yang dapat diikuti.
                        Pilihlah sesuai kebutuhan untuk meningkatkan kemampuan
                        Anda. Untuk informasi lebih lanjut, silakan hubungi kami
                        di sini."
                    </p>
                </div>
                <div className="mt-10 pattern-1 mx-0 md:mx-32">
                    <div className="grid grid-col-1 md:grid-cols-3 gap-10 p-5 md:p-10">
                        {dataKelas.map((i) => (
                            <div
                                key={i.id}
                                className="relative group transition-all h-96 duration-500 bg-white shadow-md hover:shadow-lg hover:shadow-blue-500/50 cursor-pointer overflow-hidden"
                            >
                                <img
                                    src={`storage/${i.gambar_kelas}`}
                                    alt=""
                                    className="transition-all duration-500 w-full h-full object-cover group-hover:scale-105"
                                />
                                <div className="inset-0 w-full h-full group-hover:bg-blue-800/50 bg-gradient-to-t from-blue-800 to-transparent absolute mt-20 group-hover:mt-0"></div>
                                <div className="transition-all duration-500 inset-0 absolute p-5 top-56 group-hover:top-10">
                                    <h1 className="font-bold text-2xl capitalize text-white line-clamp-2">
                                        {i.nama_kelas}
                                    </h1>
                                    <p className="transition-all duration-700 text-white group-hover:mt-5 mt-32">
                                        {i.deskripsi_kelas}
                                    </p>
                                </div>
                                <div className="transition-all duration-500 text-white hover:bg-white/10 p-2 absolute -right-10 group-hover:bottom-5 group-hover:right-5 text-xl font-bold">
                                    <a href={`/class-detail/${i.id}`}>
                                        Selengkapnya &rarr;
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mx-5 md:mx-32">
                    <h1 className="font-bold text-5xl md:text-7xl pattern-1 p-5 pt-20 text-yellow-400">
                        Apa yang akan{" "}
                        <span className="text-blue-800 mx-2">
                            kamu dapatkan?
                        </span>
                    </h1>
                    <p className="mt-10 md:mr-64">
                        Dengan mewujudkan platform pembelajaran yang aktif dan
                        inovatif, generasi muda akan mendapatkan keterampilan
                        praktis yang relevan untuk pasar kerja, motivasi tinggi
                        melalui pembelajaran interaktif, serta akses ke sumber
                        daya yang beragam. Mereka juga akan menikmati
                        fleksibilitas belajar kapan saja dan di mana saja,
                        meningkatkan kreativitas dalam menyelesaikan masalah,
                        serta kesempatan untuk berkolaborasi dan membangun
                        jaringan. Selain itu, platform ini mempersiapkan mereka
                        untuk tantangan digital, mengembangkan karakter dengan
                        nilai-nilai positif, meningkatkan literasi digital, dan
                        mendorong budaya belajar seumur hidup, sehingga siap
                        berkontribusi di dunia nyata dan maya.
                    </p>
                </div>
                <div className="my-2 md:my-20 mx-5 md:mx-32">
                    <Pattern>
                        <div className="flex md:m-20 mt-32 gap-2 md:gap-12">
                            <img
                                src="/assets/earth-globe.png"
                                alt=""
                                className="w-12 h-12 md:w-32 md:h-32 object-cover"
                            />
                            <img
                                src="/assets/alarm-clock.png"
                                alt=""
                                className="w-12 h-12 md:w-32 md:h-32 object-cover"
                            />
                            <img
                                src="/assets/notebooks.png"
                                alt=""
                                className="w-12 h-12 md:w-32 md:h-32 object-cover"
                            />
                            <img
                                src="/assets/chemistry.png"
                                alt=""
                                className="w-12 h-12 md:w-32 md:h-32 object-cover"
                            />
                            <img
                                src="/assets/medal.png"
                                alt=""
                                className="w-12 h-12 md:w-32 md:h-32 object-cover"
                            />
                            <img
                                src="/assets/laptop.png"
                                alt=""
                                className="w-12 h-12 md:w-32 md:h-32 object-cover"
                            />
                        </div>
                    </Pattern>
                </div>
                <div className="mx-5 md:mx-32 my-5 md:my-20 flex items-center gap-5 md:gap-32">
                    <Pattern>
                        <img
                            src="/assets/blackboard.png"
                            alt=""
                            className="hidden md:block md:w-56 md:h-56 object-cover mx-auto md:mt-20"
                        />
                    </Pattern>
                    <div className="-mt-96 md:mt-0 relative z-20">
                        <h1 className="font-bold text-5xl md:text-7xl pattern-1 p-5 text-end text-blue-800">
                            Benefit
                            <span className="text-yellow-400 mx-2">Kelas</span>
                        </h1>
                        <p className="mt-10">
                            Platform ini menawarkan fleksibilitas dalam waktu
                            dan tempat belajar, mendorong kreativitas, serta
                            memfasilitasi kolaborasi dan jaringan profesional.
                            Dengan mempersiapkan siswa untuk tantangan dunia
                            maya dan menanamkan nilai-nilai positif, platform
                            ini juga meningkatkan literasi digital dan mendorong
                            budaya belajar seumur hidup, sehingga menciptakan
                            generasi muda yang siap berkontribusi positif bagi
                            masyarakat.
                        </p>
                    </div>
                </div>
                <div className="-mt-56 md:mt-0">
                    <Pattern>
                        <h1 className="font-bold text-5xl md:text-7xl mt-32 md:m-32 text-center">
                            Bersama
                            <span className="text-blue-800 mx-2">
                                Event Academy
                            </span>
                            <br /> Raih{" "}
                            <span className="text-yellow-400 mx-2">
                                Impiamu
                            </span>
                        </h1>
                    </Pattern>
                </div>
                <div className="mx-5 md:mx-32 my-10">
                    <p className="text-center">
                        Mewujudkan platform pembelajaran yang aktif, inovatif,
                        dan meningkatkan ilmu pengetahuan untuk generasi muda,
                        sehingga dapat mengembangkan skill anak muda yang mampu
                        bermanfaat untuk kehidupan di dunia nyata & maya.
                    </p>
                </div>
                <div className="mx-0 md:mx-32 grid grid-col-1 md:grid-cols-2 gap-10 pb-20 mt-20 pattern-1 p-10">
                    <div className="transition-all duration-500 border p-10 flex gap-10 items-center bg-white hover:shadow-lg cursor-pointer">
                        <h1 className="text-9xl font-bold text-pink-500">1</h1>
                        <p>
                            Menyediakan platform pembelajaran yang mudah diakses
                            & dipahami bagi anak muda.
                        </p>
                    </div>
                    <div className="transition-all duration-500 border p-10 flex gap-10 items-center bg-white hover:shadow-lg cursor-pointer">
                        <h1 className="text-9xl font-bold text-cyan-500">2</h1>
                        <p>
                            Membangun komunitas pembelajaran yang bermanfaat di
                            Indonesia.
                        </p>
                    </div>
                    <div className="transition-all duration-500 border p-10 flex gap-10 items-center bg-white hover:shadow-lg cursor-pointer">
                        <h1 className="text-9xl font-bold text-sky-500">3</h1>
                        <p>
                            Membekali masyarakat dengan ilmu pengetahuan yang
                            dapat diterapkan di berbagai bidang.
                        </p>
                    </div>
                    <div className="transition-all duration-500 border p-10 flex gap-10 items-center bg-white hover:shadow-lg cursor-pointer">
                        <h1 className="text-9xl font-bold text-purple-500">
                            4
                        </h1>
                        <p>
                            Menumbuhkan minat & kesadaran masyarakat akan
                            pentingnya sebuah ilmu.
                        </p>
                    </div>
                </div>
                <div className="md:mt-32 mx-5 md:mx-32 flex flex-col md:flex-row md:justify-between items-center pb-32">
                    <Pattern>
                        <img
                            src="/assets/money.png"
                            alt=""
                            className="w-64 h-64 md:w-96 md:h-96 object-cover ml-10 md:ml-0 mt-12 md:mt-0"
                        />
                    </Pattern>
                    <div className="relative w-full">
                        <h1 className="font-bold text-5xl md:text-7xl">
                            Program Affiliate <br />{" "}
                            <span className="text-yellow-400">Event </span>
                            <span className="text-blue-800">Academy </span>
                        </h1>
                        <p className="mt-10">
                            Hasilkan uang bersama Event Academy dengan mengikuti
                            program affiliate
                        </p>
                        <div className="absolute -bottom-32 right-32 md:right-0">
                            <a
                                href="/affiliate-register"
                                className="transition-all duration-500 font-bold bg-blue-800 p-5 w-full text-center border-2 border-blue-800 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50"
                            >
                                Selengkapnya disini &rarr;
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mx-0 mt-20 md:mt-0 md:mx-64 pb-32 pattern-1 p-5 md:p-20">
                    <div className="flex flex-col items-center">
                        <p className="text-center text-2xl md:text-3xl">
                            "Jadikan pembelajaran seseru itu dengan adakan event
                            di tiap belajar jangan pernah bosan belajar. Belajar
                            itu penting."
                        </p>
                        <div className="mt-10 flex flex-col gap-3 items-center">
                            <img
                                src="/assets/logo.png"
                                alt=""
                                className="w-20 h-20 object-cover"
                            />
                            <h1 className="font-bold text-xl">Event Academy</h1>
                        </div>
                        <div className="flex flex-col md:flex-row gap-5 mt-5">
                            <p>Email: eventacademy01@gmail.com</p>
                            <p>Phone: 0878-4446-1289</p>
                            <p>Sosial Media: eventacademy.id</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;
