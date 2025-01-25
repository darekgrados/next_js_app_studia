"use client";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";

function LoginForm() {
  const returnUrl = useSearchParams().get("returnUrl");
  const router = useRouter();
  const [firebaseError, setFirebaseError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setPersistence(auth, browserSessionPersistence).then(() => {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
    
          if(!user.emailVerified) {
            router.push("/user/verify");
          } else {
            router.push(returnUrl || "/user/profile");
          }
        })
        .catch((error) => {
          console.log("Error logging in: ", error);
          setFirebaseError(error.message);
        });
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Zaloguj się
        </h1>
        {firebaseError && (
          <div className="alert alert-error mb-4 bg-red-100 text-red-600 p-4 rounded">
            <p>{firebaseError}</p>
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="text"
                className="input w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Wprowadź email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Musisz podać adres email!",
                  },
                  maxLength: {
                    value: 40,
                    message: "Adres email jest zbyt długi!",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Niepoprawny format e-mail.",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Hasło
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                className="input w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Wprowadź hasło"
                {...register("password", {
                  required: "Hasło jest wymagane!",
                  maxLength: {
                    value: 40,
                    message: "Hasło jest za długie!",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition duration-200"
          >
            Zaloguj się
          </button>
        </form>
        {/* <div className="text-center mt-4 text-sm text-gray-500">
          <p>
            Nie masz konta?{" "}
            <a
              href="/user/register"
              className="text-blue-500 hover:underline font-medium"
            >
              Zarejestruj się
            </a>
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return(
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
};