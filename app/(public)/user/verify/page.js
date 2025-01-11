'use client';

import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "@/app/lib/AuthContext";

export default function VerifyEmail() {
  const { user } = useAuth();
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState(null); // Stan na błędy

  useEffect(() => {
    const auth = getAuth();

    // Zapamiętanie adresu e-mail przed wylogowaniem
    if (user?.email) {
      setUserEmail(user.email);
    }

    // Wylogowanie użytkownika
    signOut(auth)
      .then(() => {
        console.log("User signed out due to email verification required.");
      })
      .catch((error) => {
        console.error("Error signing out:", error.message);
        setError("Wystąpił błąd podczas wylogowania.");
      });
  }, [user]);

  return (
    <div className="card items-center shadow-lg p-6 w-100">
      <h1 className="text-center text-xl font-bold">Weryfikacja email</h1>
      <p className="mt-4">
        Twój email nie został zweryfikowany. Zweryfikuj adres klikając w link wysłany na:{" "}
        <strong>{userEmail}</strong>.
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Zostałeś wylogowany ze względów bezpieczeństwa. Zweryfikuj swój email i zaloguj się ponownie.
      </p>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
