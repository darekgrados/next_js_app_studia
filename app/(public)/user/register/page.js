'use client';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useAuth } from "@/app/lib/AuthContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const { user } = useAuth();
  const router = useRouter();
  const auth = getAuth();

  const [registerError, setRegisterError] = useState(""); // Przeniesienie poza warunek
  const { register, handleSubmit } = useForm(); // Przeniesienie poza warunek

  if (user) {
    return null; // W tym miejscu nie ma problemu, bo hooki są wywoływane powyżej
  }

  const onSubmit = (data) => {
    console.log("clicked");
    if (data.password !== data.confirmPassword) {
      setRegisterError("Passwords do not match!");
      return;
    }

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log("User registered!");
        sendEmailVerification(auth.currentUser)
          .then(() => {
            console.log("Email verification sent!");
            router.push("/user/verify");
          });
      })
      .catch((error) => {
        let message;
        switch (error.code) {
          case "auth/email-already-in-use":
            message = "Adres email jest już zarejestrowany.";
            break;
          case "auth/invalid-email":
            message = "Niepoprawny adres email.";
            break;
          case "auth/weak-password":
            message = "Hasło jest zbyt słabe.";
            break;
          default:
            message = "Wystąpił błąd podczas rejestracji.";
        }
        setRegisterError(message);
        console.dir(error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Rejestracja</h1>

        {registerError && (
          <div className="alert alert-error mb-4">
            <p>{registerError}</p>
          </div>
        )}

        <form className="form-control w-full" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="input input-bordered flex items-center gap-2 mb-4">
              <input
                id="email"
                name="email"
                type="email"
                className="grow"
                placeholder="Email"
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
                    message: "Niepoprawny format e-mail",
                  },
                })}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 mb-4">
              <input
                id="password"
                name="password"
                type="password"
                className="grow"
                placeholder="Hasło"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Musisz podać hasło!",
                  },
                })}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 mb-4">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="grow"
                placeholder="Powtórz hasło"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Musisz potwierdzić hasło!",
                  },
                })}
              />
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-full py-2">
            Zarejstruj
          </button>
        </form>
      </div>
    </div>
  );
}
