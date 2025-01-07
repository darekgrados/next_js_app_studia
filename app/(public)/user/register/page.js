'use client';
import { useRouter } from 'next/navigation';

import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { useAuth } from "@/app/lib/AuthContext";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterForm(){


  const { user } = useAuth();
  const router = useRouter();
  
  if (user) {
    return null;
  }
  
  const auth = getAuth();
  
  const [registerError, setRegisterError] = useState(""); //stan błędów rejestracji
    const { register, handleSubmit} = useForm();
  
  
  const onSubmit = (data) => {
    console.log("clicked");
    // walidacja obu równości haseł  
    if (data.password !== data.confirmPassword) {
        setRegisterError("Passwords do not match!");
        return;
      }
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log("User registered!");
        sendEmailVerification(auth.currentUser)
          .then(() => {
            console.log("Email verification send!");
            router.push("/user/verify");
        });
        
      })
      .catch((error) => {
        setRegisterError(error.message);
        console.dir(error);
      });
  };
  return (
    <div className="card items-center shadow-lg p-6 w-100">
      <h1>Rejestracja</h1>
      {registerError && (
          <div className="alert alert-error">
            <p>{registerError}</p>
          </div>)}
      <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
        <div>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70">
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
        <input  id="email"
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
                  message: " Adres email jest zbyt długi!",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Niepoprawny format e-mail",
                },
              })}/>
             
      </label>
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
        <input id="password"
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
              })} />
      </label>
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
        <input name="confirmPassword" type="password" className="grow" placeholder="Confirm Password"
        {...register("confirmPassword", {
            required: "Hasło jest wymagane!",
            maxLength: {
              value: 20,
              message: "Hasło jest za długie!",
            },
          })} />
      </label>
      </div>

      <button type="submit"  className="btn btn-primary " >Zapisz</button>
      </form>

    </div>
  );
}