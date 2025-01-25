"use client";
import { getAuth, updateProfile } from "firebase/auth";
import { useAuth } from "@/app/lib/AuthContext";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { db } from "@/app/lib/firebase";
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";

export default function UserProfile() {
  const { user } = useAuth();
  const auth = getAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: user?.displayName || `${user?.email}`,
      email: user?.email || "",
      street: "",
      city: "",
      zipCode: "",
      photoURL: user?.photoURL || "",
    },
  });

  useEffect(() => {
    const fetchAdress = async () => {
      try {
        if (user?.uid) {
          const snapshot = await getDoc(doc(db, "users", user?.uid));
          if (snapshot.exists()) {
            const address = snapshot.data().address;
            setValue("street", address?.street || "");
            setValue("city", address?.city || "");
            setValue("zipCode", address?.zipCode || "");
          }
        }
      } catch (e) {
        console.error("Error getting document:", e);
        setError("Wystąpił błąd podczas pobierania danych z Firestore.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdress();
  }, [user?.uid, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: data.displayName,
        photoURL: data.photoURL,
      });
      console.log("Profil zaktualizowany");

      await setDoc(doc(db, "users", user?.uid), {
        address: {
          street: data.street,
          city: data.city,
          zipCode: data.zipCode,
        },
      });
      console.log("Dane uzytkownika zaktualizowane");
    } catch (e) {
      console.error("Wystąpił błąd podczas aktualizacji danych: ", e);
      if (e.code === "permission-denied") {
        setError("Brak uprawnień do zapisu danych w Firestore.");
      } else {
        setError("Wystąpił błąd: " + e.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Profil
        </h1>

        {error && (
          <div className="alert alert-error mb-4 bg-red-100 text-red-600 p-4 rounded">
            <p>{error}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Pole displayName */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Imię</label>
            <input
              type="text"
              className="input w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Display Name"
              {...register("displayName", {
                required: "Nazwa użytkownika jest wymagana",
                maxLength: {
                  value: 50,
                  message: "Nazwa użytkownika jest za długa",
                },
              })}
              disabled={isLoading}
            />
            {errors.displayName && (
              <p className="text-sm text-red-600 mt-1">
                {errors.displayName.message}
              </p>
            )}
          </div>

          {/* Pole email (tylko do odczytu) */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              className="input w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
              value={user?.email || ""}
            />
          </div>
          {/* Pola address */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Ulica
            </label>
            <input
              type="text"
              className="input w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Street"
              {...register("street")}
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Miasto
            </label>
            <input
              type="text"
              className="input w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="City"
              {...register("city")}
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Kod pocztowy
            </label>
            <input
              type="text"
              className="input w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Zip Code"
              {...register("zipCode", {
                maxLength: {
                  value: 6,
                  message: "Kod pocztowy jest za długi",
                },
              })}
              disabled={isLoading}
            />
            {errors.zipCode && (
              <p className="text-sm text-red-600 mt-1">
                {errors.zipCode.message}
              </p>
            )}
          </div>

          {/* Pole photoURL */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Profilowe
            </label>
            <input
              type="text"
              className="input w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Profile Photo URL"
              {...register("photoURL", {
                pattern: {
                  value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/,
                  message: "Niepoprawny adres URL zdjęcia",
                },
              })}
            />
            {errors.photoURL && (
              <p className="text-sm text-red-600 mt-1">
                {errors.photoURL.message}
              </p>
            )}
          </div>

          {/* Przycisk zapisu */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition duration-200 mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
