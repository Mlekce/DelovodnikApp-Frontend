import Header from "./Header";
import { useEffect, useState, createContext, useContext } from "react";

export default function Korisnici() {
    return (
        <>
            <Header />
            <TabelaKorisnika />
        </>
    )
}

function TabelaKorisnika() {
    const [listaKorisnika, setListaKorisnika] = useState({ sviKorisnici: [], brojKorisnika: 0 });
    const [selectedKorisnikId, setSelectedKorisnikId] = useState(null);
    const [displayUsers, setDisplayUsers] = useState([])
    const [stranica, setStranica] = useState(1)
    const noPrikaz = 3;
    let stranice = Math.ceil(listaKorisnika.brojKorisnika / noPrikaz)

    useEffect(() => {
        getUsers()
    }, []);

    useEffect(() => {
        setDisplayUsers(() => {
            let start = noPrikaz * (stranica - 1);
            let end = noPrikaz * (stranica)
            return listaKorisnika.sviKorisnici.slice(start, end);
        })
    }, [listaKorisnika, stranica]);

    function sledecaStranica() {
        setStranica(prevVal => {
            if (prevVal < stranice) {
                return prevVal += 1
            }
            return prevVal
        })
    }

    function prethodnaStranica() {
        setStranica(prevVal => {
            if (prevVal <= 1) {
                return prevVal = 1
            }
            return prevVal -= 1
        })
    }

    async function getUsers() {
        let url = "http://localhost:4000/api/users";
        let options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
        let response = await fetch(url, options);
        let data = await response.json();
        setListaKorisnika(data.poruka);
    }

    async function izbrisiKorisnika(korid) {
        let url = `http://localhost:4000/api/users/del/${korid}`;
        let options = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: korid
            })
        }
        let response = await fetch(url, options);
        let data = await response.json();
        console.log(data.poruka);
        getUsers()
        return
    }

    function otvoriModal() {
        let mod = document.getElementById("modal");
        mod.classList.remove("hidden");
    }

    function otvoriModalIzmeni(id) {
        setSelectedKorisnikId(id);
        document.getElementById("modal-izmeni").classList.remove("hidden");
    }

    window.onclick = function (event) {
        let mod = document.getElementById("modal");
        let forma = document.getElementById("modal-form");
        let mod2 = document.getElementById("modal-izmeni");
        let forma2 = document.getElementById("modal-form-izmeni");
        if (event.target == forma) {
            mod.classList.add("hidden");
        }
        if (event.target == forma2) {
            mod2.classList.add("hidden");
        }
    }

    return (
        <>
            <div className="max-w-[1200px] mx-auto">
                <div className="mt-10 relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
                    <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
                        <div className="flex items-center justify-between ">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800">Lista Zaposlenih</h3>
                                <p className="text-slate-500">Izmenite podatke o zaposlenima</p>
                            </div>
                            <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
                                {/*
                                <button
                                    className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button">
                                    Vidi sve
                                </button>
                                */}
                                <button
                                    onClick={otvoriModal}
                                    className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                                        strokeWidth="2" className="w-4 h-4">
                                        <path
                                            d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z">
                                        </path>
                                    </svg>
                                    Dodaj korisnika
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-0 overflow-scroll">
                        <table className="w-full mt-4 text-left table-auto min-w-max">
                            <thead>
                                <tr>
                                    <th
                                        className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                        <p
                                            className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                            Korisnik
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                                stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                            </svg>
                                        </p>
                                    </th>
                                    <th
                                        className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                        <p
                                            className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                            Uloga
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                                stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                            </svg>
                                        </p>
                                    </th>
                                    <th
                                        className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                        <p
                                            className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                                            Prava
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                                stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                            </svg>
                                        </p>
                                    </th>
                                    <th
                                        className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                        <p
                                            className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                                            Kreiran
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                                stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                            </svg>
                                        </p>
                                    </th>
                                    <th
                                        className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                        <p
                                            className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                                            Radnje
                                        </p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayUsers.length > 0 &&
                                    displayUsers.map((kor, i) => (
                                        <tr key={kor.id || i}>
                                            <td className="p-4 border-b border-slate-200">
                                                <div className="flex items-center gap-3">
                                                    <img src={`http://localhost:4000/avatars/${kor.avatar}`} alt={kor.ime}
                                                        className="relative inline-block h-9 w-9 !rounded-full object-cover object-center" />
                                                    <div className="flex flex-col">
                                                        <p className="text-sm font-semibold text-slate-700">{kor.ime}</p>
                                                        <p className="text-sm text-slate-500">{kor.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                <p className="text-sm font-semibold text-slate-700">{kor.sluzba}</p>
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                <div className="w-max">
                                                    <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
                                                        <span>{kor.uloga}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                <p className="text-sm text-slate-500">
                                                    {kor.datum_registracije ? kor.datum_registracije.split("T")[0] : "Nepoznat"}
                                                </p>
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                <button className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                    type="button"
                                                    data-dialog-target="dialog"
                                                    onClick={() => otvoriModalIzmeni(kor.id)}
                                                    data-korid={kor.id}
                                                >
                                                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                                                            className="w-4 h-4">
                                                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z">
                                                            </path>
                                                        </svg>
                                                    </span>
                                                </button>
                                                <button className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                    type="button"
                                                    data-dialog-target="dialog"
                                                    onClick={() => izbrisiKorisnika(kor.id)}
                                                    data-korid={kor.id}
                                                >
                                                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                                                            <path d="M9 3a1 1 0 00-1 1v1H4.75a.75.75 0 000 1.5H5.5v12A2.5 2.5 0 008 21h8a2.5 2.5 0 002.5-2.5V6h.75a.75.75 0 000-1.5H16V4a1 1 0 00-1-1H9zm1 3V4h4v2H10zm-1.5 3.25a.75.75 0 011.5 0v8.5a.75.75 0 01-1.5 0v-8.5zm4 0a.75.75 0 011.5 0v8.5a.75.75 0 01-1.5 0v-8.5z" />
                                                        </svg>
                                                    </span>

                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="flex items-center justify-between p-3">
                        <p className="block text-sm text-slate-500">
                            {`Strana ${stranica} od ${stranice}`}
                        </p>
                        <div className="flex gap-1">
                            <button
                                className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                                onClick={prethodnaStranica}
                            >
                                Prethodna
                            </button>
                            <button
                                className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                                onClick={sledecaStranica}
                            >
                                Sledeca
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ModalDodajKorisnika />
            <ModalIzmeniKorisnickePodatke korisnikId={selectedKorisnikId} />
        </>
    )
}

function ModalIzmeniKorisnickePodatke({ korisnikId }) {
    const [modalIzmeniPoruka, setIzmeniModalPoruka] = useState("");

    function zatvoriModalIzmeni() {
        let mod = document.getElementById("modal-izmeni");
        mod.classList.add("hidden")
    }

    function validacijaLozinke(lozinka, plozinka) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (lozinka !== plozinka) {
            setIzmeniModalPoruka("Lozinke se ne podudaraju");
            return false
        }

        if (!lozinka || !plozinka) {
            setIzmeniModalPoruka("Lozinka ne moze biti prazna");
            return false
        }

        if (!regex.test(lozinka)) {
            setIzmeniModalPoruka("Sifra ne ispunjava kompleksnost");
            return false
        }

        return true
    }

    async function resetujLozinku() {
        let forma = document.getElementById("modal-forma-2");
        let formData = new FormData(forma);

        let id = formData.get("korid");
        let lozinka = formData.get("password");
        let potvrdi_lozinka = formData.get("cpassword");

        if (!validacijaLozinke(lozinka, potvrdi_lozinka)) return;
        if (!id) return;

        try {
            let options = {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    novaLozinka: lozinka,
                    id: id
                })

            }
            let url = `http://localhost:4000/api/users/reset/${id}`;
            let response = await fetch(url, options);
            let data = await response.json();
            setIzmeniModalPoruka(data.poruka);
        } catch (error) {
            console.log(error.message);
            setIzmeniModalPoruka(`Doslo je do greske: ${error.message}`)
            return false
        }
        forma.reset();
        return true
    }

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10 hidden" id="modal-izmeni">
            <div
                className="fixed inset-0 z-50 grid place-content-center p-4"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modalTitleIzmeni"
                id="modal-form-izmeni"
            >
                <div className="w-full max-w-lg min-w-md rounded-lg bg-slate-800 text-white p-6 shadow-lg ">
                    <div className="flex items-start justify-between mb-6">
                        <h2 id="modalTitleIzmeni" className="text-xl font-bold text-white sm:text-2xl">Izmeni lozinku korisnika</h2>

                        <button
                            type="button"
                            className="-me-4 -mt-4 rounded-full p-2 text-white transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none"
                            aria-label="Close"
                            onClick={zatvoriModalIzmeni}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <p className="p2 bg-green-500 text-white text-center">{modalIzmeniPoruka}</p>
                    <form className="space-y-4 grid grid-cols-2 gap-x-5" id="modal-forma-2" onSubmit={(e) => {
                        e.preventDefault()
                        resetujLozinku()
                    }}>

                        <div>
                            <label htmlFor="password_izmeni" className="block text-sm/6 font-medium text-white">Sifra</label>
                            <div className="mt-2">
                                <input type="password" name="password" id="password_izmeni" autoComplete="password" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="cpassword_izmeni" className="block text-sm/6 font-medium text-white">Potvrdi Sifru</label>
                            <div className="mt-2">
                                <input type="password" name="cpassword" id="cpassword_izmeni" autoComplete="confirm-password" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div className="hidden">
                            <label htmlFor="id_izmeni" className="block text-sm/6 font-medium text-white">Id</label>
                            <div className="mt-2">
                                <input type="text" name="korid" id="id_izmeni" value={korisnikId || ""} readOnly className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Resetuj lozinku</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

function ModalDodajKorisnika() {
    const [modalPoruka, setModalPoruka] = useState("");

    function zatvoriModal() {
        let mod = document.getElementById("modal");
        mod.classList.add("hidden")
    }

    function validacijaLozinke(lozinka, plozinka) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (lozinka !== plozinka) {
            setModalPoruka("Lozinke se ne podudaraju");
            return false
        }

        if (!lozinka || !plozinka) {
            setModalPoruka("Lozinka ne moze biti prazna");
            return false
        }

        if (!regex.test(lozinka)) {
            setModalPoruka("Sifra ne ispunjava kompleksnost");
            return false
        }

        return true
    }

    async function registrujKorisnika() {
        const forma = document.getElementById("modal-forma-1");
        const formData = new FormData(forma);

        const ime = formData.get("ime");
        const email = formData.get("email");
        const sluzba = formData.get("sluzba");
        const lozinka = formData.get("password");
        const plozinka = formData.get("cpassword");
        const uloga = formData.get("uloga");

        if (!ime || !email || !uloga || !sluzba) {
            setModalPoruka("Sva polja su obavezna da se popune!");
            return false
        }

        if (!validacijaLozinke(lozinka, plozinka)) {
            return false
        }

        try {
            let options = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ime,
                    email,
                    lozinka,
                    uloga,
                    sluzba,
                    avatar: "person.png"
                })
            }
            const url = "http://localhost:4000/api/register";
            const response = await fetch(url, options);
            const data = await response.json();
            setModalPoruka(data.poruka);

        } catch (error) {
            console.error(error.message);
            setModalPoruka("Doslo je do greske na serveru!");
        }
        forma.reset();
    }

    return (
        <>
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10 hidden" id="modal">
                <div
                    className="fixed inset-0 z-50 grid place-content-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modalTitle"
                    id="modal-form"
                >
                    <div className="w-full max-w-lg min-w-md rounded-lg bg-slate-800 text-white p-6 shadow-lg ">
                        <div className="flex items-start justify-between mb-6">
                            <h2 id="modalTitle" className="text-xl font-bold text-white sm:text-2xl">Dodaj korisnika</h2>

                            <button
                                type="button"
                                className="-me-4 -mt-4 rounded-full p-2 text-white transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none"
                                aria-label="Close"
                                onClick={zatvoriModal}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <p className="p2 bg-green-500 text-white text-center">{modalPoruka}</p>
                        <form className="space-y-4 grid grid-cols-2 gap-x-5" id="modal-forma-1" onSubmit={(e) => {
                            e.preventDefault()
                            registrujKorisnika()
                        }}>
                            <div>
                                <label htmlFor="ime" className="block text-sm/6 font-medium text-white">Ime i prezime</label>
                                <div className="mt-2">
                                    <input type="text" name="ime" id="ime" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium text-white">Email adresa</label>
                                <div className="mt-2">
                                    <input type="email" name="email" id="email" autoComplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="sluzba" className="block text-sm/6 font-medium text-white">Sluzba</label>
                                <div className="mt-2">
                                    <input type="text" name="sluzba" id="sluzba" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="uloga" className="block text-sm/6 font-medium text-white">Tip naloga</label>
                                <div className="mt-2">
                                    <select name="uloga" id="uloga" required className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                        <option value="user" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">user</option>
                                        <option value="admin" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">admin</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm/6 font-medium text-white">Sifra</label>
                                <div className="mt-2">
                                    <input type="password" name="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm/6 font-medium text-white">Potvrdi Sifru</label>
                                <div className="mt-2">
                                    <input type="password" name="cpassword" id="cpassword" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Registruj se</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
