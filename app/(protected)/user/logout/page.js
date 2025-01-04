'use client'
import { useAuth } from "@/app/lib/AuthContext";
import { signOut } from 'firebase/auth';
import { auth } from "@/app/lib/firebase";
import { useRouter } from 'next/navigation';

export default function Logout() { 
    const { user } = useAuth();
  const router = useRouter()
  const onSubmit = () => {
      signOut(auth);
      router.push("/");
  }

  if (!user){
    return null;
  }

  return (
    <div className="flex align-middle rounded-2xl bg-secondary w-1/2 m-auto">
      <div className="flex flex-row w-[48rem]">
        <div className="flex text-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-48 w-48 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
        </div>
        <div className="rounded-e-2xl form-control bg-slate-400 flex basis-3/4 grow p-6">
          <form onSubmit={onSubmit}>
            <button className="btn btn-secondary my-6 w-full" type="submit">
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}