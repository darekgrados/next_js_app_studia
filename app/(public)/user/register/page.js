'use client';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useAuth } from "@/app/lib/AuthContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const { user } = useAuth();
  const router = useRouter();

  if (user) {
    return null;
  }

  const auth = getAuth();
  const [registerError, setRegisterError] = useState(""); // State for registration errors
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("clicked");
    // Validate password match
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
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
