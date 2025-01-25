"use client";
import { useRouter } from "next/navigation";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useAuth } from "@/app/lib/AuthContext";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const { user } = useAuth();
  const router = useRouter();
  const auth = getAuth();
  const [registerError, setRegisterError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (user) {
    return null;
  }

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      setRegisterError("Hasła nie są takie same!");
      return;
    }

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        sendEmailVerification(auth.currentUser).then(() => {
          router.push("/user/verify");
        });
      })
      .catch((error) => {
        setRegisterError(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Rejestracja
        </h1>
        {registerError && (
          <div className="alert alert-error mb-4 bg-red-100 text-red-600 p-4 rounded">
            <p>{registerError}</p>
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
                type="email"
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
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Potwierdź hasło
            </label>
            <div className="relative">
              <input
                name="confirmPassword"
                type="password"
                className="input w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Potwierdź hasło"
                {...register("confirmPassword", {
                  required: "Potwierdzenie hasła jest wymagane!",
                  maxLength: {
                    value: 40,
                    message: "Hasło jest za długie!",
                  },
                })}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition duration-200"
          >
            Zarejestruj się
          </button>
        </form>
        {/* <div className="text-center mt-4 text-sm text-gray-500">
          <p>
            Masz już konto?{" "}
            <a
              href="/user/login"
              className="text-blue-500 hover:underline font-medium"
            >
              Zaloguj się
            </a>
          </p>
        </div> */}
      </div>
    </div>
  );
}
