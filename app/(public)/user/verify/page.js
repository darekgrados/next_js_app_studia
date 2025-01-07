'use client';

import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "@/app/lib/AuthContext";

export default function VerifyEmail() {
  const { user } = useAuth();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const auth = getAuth();

    // Zapamiętanie adresu e-mail przed wylogowaniem
    if (user?.email) {
      setUserEmail(user.email);
    }

    // Wylogowanie użytkownika
    signOut(auth).then(() => {
      console.log("User signed out due to email verification required.");
    }).catch((error) => {
      console.error("Error signing out:", error.message);
    });
  }, [user]);

  return (
    <div className="card items-center shadow-lg p-6 w-100">
      <h1 className="text-center text-xl font-bold">Email Verification Required</h1>
      <p className="mt-4">
        Email not verified. Verify your email by clicking on the link sent to your address: <strong>{userEmail}</strong>.
      </p>
      <p className="mt-2 text-sm text-gray-500">
        You have been logged out for security reasons. Please verify your email and log in again.
      </p>
    </div>
  );
}