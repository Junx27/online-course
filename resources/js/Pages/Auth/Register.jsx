import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Pattern from "@/Components/Pattern";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <div>
            <Head title="Register" />
            <div className="p-10 font-bold text-xl md:text-2xl px-5 md:px-20">
                <a href="/affiliate-register">&larr; Kembali</a>
            </div>
            <Pattern>
                <div className="w-96 p-5 pattern-1 mx-auto mt-20">
                    <form
                        action=""
                        className="bg-white p-5 flex flex-col gap-5"
                        onSubmit={submit}
                    >
                        <div className="flex flex-col gap-3">
                            <label
                                htmlFor="nama"
                                className="font-bold text-blue-800"
                            >
                                Nama
                            </label>
                            <InputError
                                message={errors.nama}
                                className="mt-2"
                            />
                            <input
                                id="nama"
                                type="text"
                                name="nama"
                                value={data.nama}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("nama", e.target.value)
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label
                                htmlFor="email"
                                className="font-bold text-blue-800"
                            >
                                Email
                            </label>
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label
                                htmlFor="password"
                                className="font-bold text-blue-800"
                            >
                                Password
                            </label>
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                        </div>
                        <label
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                            className="font-bold text-blue-800"
                        >
                            Konfirmasi Password
                        </label>
                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />
                        <button className="mt-5 transition-all py-4 duration-500 font-bold bg-blue-800 p-2 w-full text-center border-2 border-blue-800 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50">
                            Register
                        </button>
                    </form>
                </div>
            </Pattern>
        </div>
    );
}
