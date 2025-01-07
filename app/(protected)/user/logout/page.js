'use client'
import { useAuth } from "@/app/lib/AuthContext";
import { signOut } from 'firebase/auth';
import { auth } from "@/app/lib/firebase";
import { useRouter } from 'next/navigation';

export default function Logout() { 
    const { user } = useAuth();
    const router = useRouter();

    const onSubmit = (e) => {
        e.preventDefault();
        signOut(auth);
        router.push("/");
    }

    if (!user) {
        return null;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    className="h-24 w-24 text-gray-500 mb-6"
                >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <form onSubmit={onSubmit} className="w-full">
                    <button className="btn btn-secondary w-full py-2" type="submit">
                        Wyloguj
                    </button>
                </form>
            </div>
        </div>
    );
}