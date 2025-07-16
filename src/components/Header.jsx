import { useState } from "react";

import logo from "../assets/logo.png";
import hamburger from "../assets/hamburger36.png";

import "../index.css"


export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    function toggleMenu() {
        setIsOpen(prev => !prev);
    }

    return (
        <>
            <header className="bg-indigo-800 text-white p-4 ">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <img src={logo} alt="rgz-logo" className="w-15 h-15" />
                        <h3 className="text-md font-semibold">RGZ Delovodnik</h3>
                    </div>
                    {/* Hamburger dugme */}
                    <button
                        onClick={toggleMenu}
                        className="block md:hidden focus:outline-none"
                    >
                        <img src={hamburger} alt="hamburger" className="w-8 h-8" />
                    </button>

                    {/* Desktop meni */}
                    <nav className="hidden md:flex gap-6">
                        <a href="/" className="hover:underline">Početna</a>
                        <a href="/delovodnik" className="hover:underline">Unos</a>
                        <a href="/pracenje" className="hover:underline">Pracenje</a>
                        <a href="/statistika" className="hover:underline">Statistika</a>
                        <a href="/korisnici" className="hover:underline">Korisnici</a>
                        <a href="/profil" className="hover:underline">Nalog</a>
                        <a href="/odjava" className="hover:underline">Izadji</a>
                    </nav>
                </div>

                {/* Mobile meni */}
                {isOpen && (
                    <div className="mt-4 md:hidden flex flex-col gap-2" >
                        <a href="/" className="hover:underline">Početna</a>
                        <a href="/delovodnik" className="hover:underline">Unos</a>
                        <a href="/pracenje" className="hover:underline">Pracenje</a>
                        <a href="/statistika" className="hover:underline">Statistika</a>
                        <a href="/korisnici" className="hover:underline">Korisnici</a>
                        <a href="/profil" className="hover:underline">Nalog</a>
                        <a href="/odjava" className="hover:underline">Izadji</a>
                    </div>
                )}
            </header >
        </>
    )
}