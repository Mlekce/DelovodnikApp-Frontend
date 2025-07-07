import { useState, useEffect } from "react";
import { parse, format, isValid } from "date-fns";

export default function TabelaPredmeta() {
    const [predmeti, setPredmeti] = useState([]);
    //const [poruka, setPoruka] = useState("");
    const [prikaz, setPrikaz] = useState(6);
    let brojStranica = Math.ceil(predmeti.length / prikaz);
    let [predmetiZaPrikaz, setPredmetiZaPrikaz] = useState([]);
    let [x, setX] = useState([1, prikaz]);
    useEffect(() => {
        povuciPodatke()

    }, [])

    useEffect(() => {

    }, [prikaz]);

    function povuciPodatke() {
        let url = "http://localhost:4000/api/predmet";
        posaljiNaBackend(url);
        async function posaljiNaBackend(url) {
            let options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }
            try {
                let response = await fetch(url, options);
                if (!response.ok) {
                    setPoruka("Greska: Greska prilikom preuzimanja podataka sa servera!")
                    return false
                }
                let data = await response.json();
                setPredmeti(data)
                let podaci = data.slice(0, prikaz);
                setPredmetiZaPrikaz(podaci)
                return true
            } catch (error) {
                console.error(error.message)
                setPoruka("Greska: Greska prilikom preuzimanja podataka sa servera!")
                return
            }
        }
    }

    function prikaziSledece(e) {
        let i = Number(e.currentTarget.textContent);
        let start = (i - 1) * prikaz;
        let end = i * prikaz;
        let predmetiPrikaz = predmeti.slice(start, end);
        setPredmetiZaPrikaz(predmetiPrikaz)
        setX([start, end])
    }

    return (
        <>
            <div className="max-w-[1200px] mx-auto mt-10 mb-10">
                <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">SPISAK PREDMETA</h3>
                        <p className="text-slate-500">Spisak svih unetih predmeta.</p>
                    </div>
                    <div className="ml-3">

                        <div className="w-full max-w-sm min-w-[200px] relative">
                            {/*  
                            <div className="relative">
                                <input
                                    className="bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                    placeholder="Pretrazi predmet..."
                                />
                                <button
                                    className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                                    type="button"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-8 h-8 text-slate-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </button>
                            </div> 
                            */}
                        </div>
                    </div>
                </div>

                <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                    <table className="w-full text-left table-auto min-w-max">
                        <thead>
                            <tr>
                                <th className="p-4 border-b border-slate-200 bg-slate-50">
                                    <p className="text-sm font-normal leading-none text-slate-500">
                                        Broj predmeta
                                    </p>
                                </th>
                                <th className="p-4 border-b border-slate-200 bg-slate-50">
                                    <p className="text-sm font-normal leading-none text-slate-500">
                                        Ime stranke
                                    </p>
                                </th>
                                <th className="p-4 border-b border-slate-200 bg-slate-50">
                                    <p className="text-sm font-normal leading-none text-slate-500">
                                        Referent
                                    </p>
                                </th>
                                <th className="p-4 border-b border-slate-200 bg-slate-50">
                                    <p className="text-sm font-normal leading-none text-slate-500">
                                        Datum podnosenja
                                    </p>
                                </th>
                                <th className="p-4 border-b border-slate-200 bg-slate-50">
                                    <p className="text-sm font-normal leading-none text-slate-500">
                                        Datum pravosnaznosti
                                    </p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                predmetiZaPrikaz.map((predmet, index) => (
                                    <tr className="hover:bg-slate-50 border-b border-slate-200" key={index}>
                                        <td className="p-4 py-5">
                                            <p className="block font-semibold text-sm text-slate-800">{predmet.broj_predmeta}</p>
                                        </td>
                                        <td className="p-4 py-5">
                                            <p className="text-sm text-slate-500">{predmet.ime_stranke}</p>
                                        </td>
                                        <td className="p-4 py-5">
                                            <p className="text-sm text-slate-500">{predmet.referent}</p>
                                        </td>
                                        <td className="p-4 py-5">
                                            <p className="text-sm text-slate-500">{format(predmet.datum_podnosenja, "dd.MM.yyyy")}</p>
                                        </td>
                                        <td className="p-4 py-5">
                                            <p className="text-sm text-slate-500">{format(predmet.datum_pravosnaznosti, "dd.MM.yyyy")}</p>
                                        </td>
                                    </tr>
                                ))
                            }



                        </tbody>
                    </table>

                    <div className="flex justify-between items-center px-4 py-3">
                        <div className="text-sm text-slate-500">
                            Showing <b>{`${x[0]}-${x[1]}`}</b> of {predmeti.length}
                        </div>
                        <div className="flex space-x-1">
                            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                                Prethodna
                            </button>
                            {Array.from({ length: brojStranica }, (_, i) => (
                                <button onClick={prikaziSledece} className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease" key={i + 1}>{i + 1}</button>
                            ))}

                            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                                Sledeca
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}