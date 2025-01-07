"use client";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

function LoginForm() {
  const returnUrl = useSearchParams().get("returnUrl");
  const router = useRouter();
  const [firebaseError, setFirebaseError] = useState("");

  const { register, handleSubmit, formState: {errors} } = useForm();

  const onSubmit = (data) => {
    setPersistence(auth, browserSessionPersistence).then(() => {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          console.log("user logged!");

          // if (!userCredential.user.emailVerified){
          //   router.replace('/user/verify-email');
          //   //console.log("not verified")            uncomment after adding verify-email page
          //   return;
          // }

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
    <div className="card items-center shadow-lg p-6 w-100">
      <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
        {firebaseError && (<div className="alert alert-error mb-4">
          <p>{firebaseError}</p>
        </div>)}
        <div>
          <label className="input input-bordered flex items-center gap-2">
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
              type="text"
              className="grow"
              placeholder="Email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Musisz podać adres email!",
                },
                maxLength: {
                  value: 40,
                  message: " Adres email jest zbyt długi!",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Niepoprawny format e-mail",
                },
              })}
            />
          </label>
          {errors.email && (<p className="text-error">{errors.email.message}</p>)}
        </div>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              id="password"
              name="password"
              type="password"
              className="grow"
              placeholder="Your password"
              {...register("password", {
                required: "Hasło jest wymagane!",
                maxLength: {
                  value: 20,
                  message: "Hasło jest za długie!",
                },
              })}
            />
          </label>
          {errors.password && (<p className="text-error">{errors.password.message}</p>)}
        </div>
        <button type="submit"  className="btn btn-primary " >Zaloguj</button>
      </form>
    </div>
  );
}

export default LoginForm;