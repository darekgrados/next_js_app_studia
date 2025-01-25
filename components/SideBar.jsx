"use client";
import Link from "next/link";

function SideBar({ children }) {
  return (
    <div className="drawer bg-gray-800">
      <input id="my-drawer" type="checkbox" className="drawer-toggle " />
      <div className="drawer-content bg-gray-800">
        <label htmlFor="my-drawer" className="btn bg-blue-500 hover:bg-blue-600 text-white drawer-button">Menu</label>
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu  bg-gray-800 text-gray-100 font-bold min-h-full w-80 p-4 ">
          <li><Link href="/user/login">Zaloguj</Link></li>
          <li><Link href="/user/logout">Wyloguj</Link></li>
          <li><Link href="/user/register">Rejestracja</Link></li>
          <li><Link href="/user/profile">Profil</Link></li>
          {/* <li><Link href="/user/articles">Adres</Link></li> */}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;