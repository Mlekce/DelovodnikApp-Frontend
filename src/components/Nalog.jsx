import Header from "./Header";
import avatar from "../assets/person.png"
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
    const [korisnik, setKorisnik] = useState(JSON.parse(localStorage.getItem("korisnik")));

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    function resetPass() {
        const forma = document.getElementById("reset-form");
        return
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
                <p>{poruka}</p>
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
                            Služba
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
                            type="date"
                            disabled
                            placeholder={korisnik.datum_registracije}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Zakaci fajl (avatar)
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
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Stara lozinka
                        </label>
                        <input
                            type="password"
                            name="lozinka-st"
                            onChange={(e) => { setOldPassword(e.target.value) }}
                            placeholder="Stara lozinka"
                            className="mt-1 w-[418px] rounded-md border-gray-300 shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nova lozinka
                        </label>
                        <input
                            type="password"
                            name="lozinka-n"
                            onChange={(e) => { setNewPassword(e.target.value) }}
                            placeholder="Nova lozinka"
                            className="mt-1 w-[418px] rounded-md border-gray-300 shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Potvrdi novu lozinku
                        </label>
                        <input
                            type="password"
                            name="lozinka-np"
                            onChange={(e) => { setConfirmNewPassword(e.target.value) }}
                            placeholder="potvrdi novu lozinku"
                            className="mt-1 w-[418px] rounded-md border-gray-300 shadow-sm p-2"
                        />
                    </div>
                </div>
                <div className="">
                    <button id="reset-form" onClick={resetPass} type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">
                        Zameni lozinku
                    </button>
                </div>
            </div>
        </>
    )
}
