import Header from "./Header";
import avatar from "../assets/person.png"
import {format} from "date-fns";
import { useState } from "react";

export default function KomponentaNalog() {
    return (
        <>
            <Header />
            <Nalog />
        </>
    )
}

function Nalog() {
    const [poruka, setPoruka] = useState("");
    const [resetPoruka, setResetPoruka] = useState("");
    const [korisnik, setKorisnik] = useState(JSON.parse(localStorage.getItem("korisnik")));

    async function resetPass() {
        const forma = document.getElementById("reset-form");
        const formData = new FormData(forma);
        let staraLozinka = formData.get("lozinka-st");
        let novaLozinka = formData.get("lozinka-n");
        let potvrdiNovuLozinku = formData.get("lozinka-np");

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        novaLozinka = novaLozinka.trim();
        staraLozinka = staraLozinka.trim();

        if (!staraLozinka || !novaLozinka || !potvrdiNovuLozinku) {
            setResetPoruka("Sva polja moraju biti popunjena!");
            return false;
        }

        if (novaLozinka !== potvrdiNovuLozinku) {
            setResetPoruka("Polja nove lozinke se ne poklapaju!");
            return false;
        }

        if (novaLozinka === staraLozinka) {
            setResetPoruka("Nova lozinka i stara lozinka se podudaraju.");
            return false;
        }

        if (!regex.test(novaLozinka)) {
            setResetPoruka("Nova lozinka na ispunjava kompleksnost");
            return false;
        }

        try {
            let opcije = {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    staraLozinka,
                    novaLozinka
                })
            }
            const url = "http://localhost:4000/api/users/password";
            const response = await fetch(url, opcije);
            const data = await response.json();
            setResetPoruka(data.poruka);
        } catch (error) {
            console.log(error.message);
            setResetPoruka(`Doslo je do greske: ${error.message}`);
            return false;
        }
        forma.reset();
        return true
    }

    async function posaljiPodatkeONalogu() {
        const forma = document.getElementById("nalog-form");
        let formData = new FormData(forma);
        let avtr = formData.get("avatar");
        let slzba = formData.get("sluzba");
        let opcije;

        if (!slzba && (!avtr.name || avtr.size === 0)) {
            setPoruka("Niste nista izmenili od podataka.");
            return false;
        }

        if ((avtr && avtr.name !== "" && avtr.size !== 0)) {
            opcije = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: formData
            }
            try {
                let url = "http://localhost:4000/api/users/avatar";
                let response = await fetch(url, opcije);
                if (!response.ok) {
                    setPoruka("Greska pri uploadovanju avatara!");
                    return false;
                }
                let data = await response.json();
                localStorage.setItem("korisnik", JSON.stringify(data.korisnik))
                setKorisnik(JSON.parse(localStorage.getItem("korisnik")));
                setPoruka(data.poruka);
            } catch (error) {
                console.log(error.message);
                setPoruka(`Doslo je do greske: ${error.message}`);
                return false;
            }
        }
        if (slzba) {
            opcije = {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sluzba: slzba
                })
            }
            const url = "http://localhost:4000/api/users/sluzba";
            try {
                let response = await fetch(url, opcije);
                if (!response.ok) {
                    setPoruka("Greska pri izmeni podataka o sluzbi!");
                    return false;
                }
                let data = await response.json();
                localStorage.setItem("korisnik", JSON.stringify(data.korisnik))
                setKorisnik(JSON.parse(localStorage.getItem("korisnik")));
                setPoruka(data.poruka);
            } catch (error) {
                console.log(error.message);
                setPoruka(`Doslo je do greske: ${error.message}`);
                return false;
            }
        }
        forma.reset();
        return true;
    }

    return (
        <>
            <div className="max-w-[900px] mx-auto p-6 mt-6 mb-6 bg-white rounded-xl shadow-md space-y-6">
                <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                    Korisnicki nalog
                </h2>

                <div className="flex items-center gap-4">
                    <img
                        src={korisnik.avatar ? `http://localhost:4000/avatars/${korisnik.avatar}` : avatar}
                        alt="Avatar"
                        className="w-20 h-20 rounded-full object-cover border"
                    />
                    <div>
                        <h3 className="text-lg font-bold">{korisnik.ime}</h3>
                        <p className="text-gray-500">{korisnik.email}</p>
                    </div>
                </div>
                {poruka && poruka !== "" && <p className="bg-red-500 text-white text-center uppercase;">Status: {poruka}</p>}
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    id="nalog-form"
                    encType="multipart/form-data"
                    onSubmit={(e) => {
                        e.preventDefault();
                        posaljiPodatkeONalogu();
                    }}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Ime i prezime
                        </label>
                        <input
                            type="text"
                            disabled
                            placeholder={korisnik.ime}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Služba <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder={korisnik.sluzba}
                            name="sluzba"
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="text"
                            disabled
                            placeholder={korisnik.email}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Uloga
                        </label>
                        <input
                            type="text"
                            disabled
                            placeholder={korisnik.uloga}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Datum registracije
                        </label>
                        <input
                            type="text"
                            disabled
                            placeholder={format(korisnik.datum_registracije.split("T")[0], "dd.MM.yyyy")}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Zakaci fajl (avatar) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            name="avatar"
                            placeholder={korisnik.avatar}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-100"
                        />
                    </div>
                    <div>
                        <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">
                            Sačuvaj izmene
                        </button>
                    </div>
                </form>

                {/* Resetuj lozinku forma */}
                <h3 className="text-lg font-semibold border-b pt-4">
                    Resetuj lozinku
                </h3>
                {resetPoruka === "Uspesno zamenjena lozinka!" && <p className="bg-green-600 text-white text-center uppercase;">Status: {resetPoruka}</p>}
                {resetPoruka && resetPoruka !== "Uspesno zamenjena lozinka!" && <p className="bg-red-500 text-white text-center uppercase;">Status: {resetPoruka}</p>}
                <form className="grid grid-cols-1 gap-4" id="reset-form" onSubmit={(e) => { e.preventDefault(); resetPass() }}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Stara lozinka <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            name="lozinka-st"
                            placeholder="Stara lozinka"
                            className="mt-1 w-[418px] rounded-md border-gray-300 shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nova lozinka <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            name="lozinka-n"
                            placeholder="Nova lozinka"
                            className="mt-1 w-[418px] rounded-md border-gray-300 shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Potvrdi novu lozinku <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            name="lozinka-np"
                            placeholder="potvrdi novu lozinku"
                            className="mt-1 w-[418px] rounded-md border-gray-300 shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">
                            Zameni lozinku
                        </button>
                    </div>
                </form>

            </div>
        </>
    )
}
