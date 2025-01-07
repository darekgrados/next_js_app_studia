'use client';
import { getAuth, updateProfile } from "firebase/auth";
import { useAuth } from "@/app/lib/AuthContext";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function UserProfile() {
  const { user } = useAuth();
  const auth = getAuth();
  const [error, setError] = useState(""); // State to store errors

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      displayName: user?.displayName || "",
      email: user?.email || "",
      photoURL: user?.photoURL || "",
    },
  });

  const onSubmit = (data) => {
    updateProfile(auth.currentUser, {
      displayName: data.displayName,
      photoURL: data.photoURL,
    })
      .then(() => {
        console.log("Profile updated");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Profil użytkownika</h1>
        {error && (
          <div className="alert alert-error mb-4">
            <p>{error}</p>
          </div>
        )}

        <form className="form-control w-full" onSubmit={handleSubmit(onSubmit)}>
          {/* Pole displayName */}
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <span className="label-text">Nazwa użytkownika</span>
            <input
              type="text"
              className="grow"
              placeholder="Nazwa użytkownika"
              {...register("displayName", {
                required: "Nazwa użytkownika jest wymagana",
              })}
            />
          </label>
          {errors.displayName && (
            <span className="text-error">{errors.displayName.message}</span>
          )}

          <br />

          {/* Pole email (tylko do odczytu) */}
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <span className="label-text">Email</span>
            <input
              type="email"
              className="grow"
              readOnly
              {...register("email")}
            />
          </label>

          <br />

          {/* Pole photoURL */}
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <span className="label-text">Adres zdjęcia profilowego</span>
            <input
              type="text"
              className="grow"
              placeholder="Adres zdjęcia profilowego"
              {...register("photoURL", {
                pattern: {
                  value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/,
                  message: "Niepoprawny adres URL zdjęcia",
                },
              })}
            />
          </label>
          {errors.photoURL && (
            <span className="text-error">{errors.photoURL.message}</span>
          )}

          {/* Przycisk zapisu */}
          <button type="submit" className="btn btn-primary mt-4 w-full">
            Zapisz
          </button>
        </form>
      </div>
    </div>
  );
}