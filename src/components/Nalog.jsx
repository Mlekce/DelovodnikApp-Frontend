import Header from "./Header";
import avatar from "../assets/person.png"

export default function KomponentaNalog() {
    return (
        <>
            <Header />
            <Nalog />
        </>
    )
}

function Nalog() {
    return (
        <>
            <div className="max-w-[900px] mx-auto p-6 mt-6 mb-6 bg-white rounded-xl shadow-md space-y-6">
                <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                    Korisnicki nalog
                </h2>

                <div className="flex items-center gap-4">
                    <img
                        src={avatar}
                        alt="Avatar"
                        className="w-20 h-20 rounded-full object-cover border"
                    />
                    <div>
                        <h3 className="text-lg font-bold">Petar Petrović</h3>
                        <p className="text-gray-500">petar@example.com</p>
                    </div>
                </div>



                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Ime i prezime
                        </label>
                        <input
                            type="text"
                            name="ime"
                            placeholder="Petar Petrović"
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Služba
                        </label>
                        <input
                            type="text"
                            name="sluzba"
                            placeholder="RGZ Beograd"
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            placeholder="petar@example.com"
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Uloga
                        </label>
                        <input
                            type="text"
                            name="uloga"
                            placeholder="Referent"
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Datum registracije
                        </label>
                        <input
                            type="date"
                            name="datum"
                            placeholder="Referent"
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
                            placeholder="avatar"
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-100"
                        />
                    </div>
                    <div className="">
                        <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">
                            Sačuvaj izmene
                        </button>
                    </div>
                </div>

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
                            placeholder="potvrdi novu lozinku"
                            className="mt-1 w-[418px] rounded-md border-gray-300 shadow-sm p-2"
                        />
                    </div>
                </div>
                <div className="">
                        <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">
                            Zameni lozinku
                        </button>
                    </div>
            </div>
        </>
    )
}
