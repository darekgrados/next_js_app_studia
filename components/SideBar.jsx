"use client";
import { AuthProvider, useAuth } from "@/app/lib/AuthContext";
import Link from "next/link";
import { useContext } from "react";
function SideBar({children}) {
    const {user} = useAuth();
    return ( 
        <div className="drawer">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
  <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Menu</label>
    {children}
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      <li><Link href="/user/login">Zaloguj</Link></li>
      <li><Link href="/user/logout">Wyloguj</Link></li>
      <li><Link href="/user/register">Rejestracja</Link></li>
      <li><Link href="/user/profile">Profil</Link></li>
    </ul>
  </div>
</div>
     );
}

export default SideBar;