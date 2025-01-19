"use client";
import { useAuth } from "@/app/lib/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

export default function Logout() {
  const { user } = useAuth();
  const router = useRouter();

  const onSubmit = () => {
    signOut(auth);
    router.push("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Czy na pewno chcesz się wylogować?
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Wyloguj się
          </button>
        </form>
      </div>
    </div>
  );
}
