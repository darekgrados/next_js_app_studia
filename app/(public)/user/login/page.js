"use client";
import {
    browserSessionPersistence,
    setPersistence,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense} from "react";
import { useForm } from "react-hook-form";

function LoginForm() {
    const returnUrl = useSearchParams().get("returnUrl");
    const router = useRouter();
    const [firebaseError, setFirebaseError] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        setPersistence(auth, browserSessionPersistence).then(() => {
            signInWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    console.log("user logged!");

                    if (returnUrl) {
                        router.push(returnUrl);
                    } else {
                        router.push("/");
                    }
                })
                .catch((error) => {
                    console.log("Error logging in: ", error);
                    setFirebaseError(error.message);
                });
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6">Zaloguj się</h1> {/* Nagłówek wymagany przez test */}
                <form className="form-control w-full" onSubmit={handleSubmit(onSubmit)}>
                    {firebaseError && (
                        <div className="alert alert-error mb-4">
                            <p>{firebaseError}</p>
                        </div>
                    )}
                    <div>
                        <label className="input input-bordered flex items-center gap-2 mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70"
                            >
                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="grow"
                                placeholder="Wprowadź email" 
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Musisz podać adres email!",
                                    },
                                })}
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70"
                            >
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="grow"
                                placeholder="Wprowadź hasło" 
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Musisz podać hasło!",
                                    },
                                })}
                            />
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary w-full py-2">
                        Zaloguj
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
      <Suspense fallback={<div>Ładowanie...</div>}>
        <LoginForm />
      </Suspense>
    );
  }
  
