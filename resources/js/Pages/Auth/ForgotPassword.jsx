import InputError from "@/Components/InputError";
import Pattern from "@/Components/Pattern";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <div>
            <Head title="Forgot Password" />
            <div className="p-10">
                <a href="/">&larr; Kembali</a>
            </div>
            <Pattern>
                <div className="w-96 p-5 pattern-1 mx-auto mt-32">
                    <form onSubmit={submit}>
                        <p className="p-2 bg-white mb-5">
                            Masukan email terdaftar untuk pemulihan kata sandi
                        </p>
                        <InputError message={errors.email} className="mt-2" />
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <div className="mt-10 flex justify-end">
                            <button className="transition-all py-4 duration-500 font-bold bg-blue-800 p-2 w-full text-center border-2 border-blue-800 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50">
                                Verifikasi email
                            </button>
                        </div>
                    </form>
                </div>
            </Pattern>
        </div>
    );
}
