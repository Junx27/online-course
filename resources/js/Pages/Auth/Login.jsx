import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Pattern from "@/Components/Pattern";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="">
            <Head title="Log in" />
            <div className="p-10 font-bold text-xl md:text-2xl px-5 md:px-20">
                <a href="/affiliate-register">&larr; Kembali</a>
            </div>
            <Pattern>
                <div className="w-96 p-5 pattern-1 mx-auto mt-32">
                    <form
                        action=""
                        className="bg-white p-5 flex flex-col gap-5"
                        onSubmit={submit}
                    >
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
                                htmlFor=""
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
                        <a href="/forgot-password">Lupa kata sandi?</a>
                        <button className="transition-all py-4 duration-500 font-bold bg-blue-800 p-2 w-full text-center border-2 border-blue-800 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50">
                            Login
                        </button>
                    </form>
                </div>
            </Pattern>
        </div>
    );
}
