import { useState, useEffect } from "react";
import { format } from "date-fns";

export default function TabelaPredmeta({ predmeti, duzina, osvezi }) {
    const prikaz = 6;
    const [stranica, setStranica] = useState(1);
    const [prikazaniPredmeti, setPrikazaniPredmeti] = useState([]);

    useEffect(() => {
        const pocetak = (stranica - 1) * prikaz;
        const kraj = stranica * prikaz;
        if (duzina > 0) {
            setPrikazaniPredmeti(predmeti.slice(pocetak, kraj));
        } else {
            setPrikazaniPredmeti([])
        }
    }, [predmeti, stranica]);

    async function posaljiNaBackend(id) {
        try {
            let options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id
                })
            }
            await fetch("http://localhost:4000/api/predmet/del", options);
            osvezi()
        } catch (error) {
            console.error(error.message)
        }

    }

    const brojStranica = Math.ceil(duzina / prikaz);

    return (
        <>
            {predmeti && (
                <div className="max-w-[1200px] mx-auto mt-10 mb-10">
                    <div className="flex justify-between mb-4 px-3">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800">SPISAK PREDMETA</h3>
                            <p className="text-slate-500">Spisak svih unetih predmeta.</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full table-auto text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-slate-500 text-sm">
                                    <th className="p-4 border-b">Broj predmeta</th>
                                    <th className="p-4 border-b">Ime stranke</th>
                                    <th className="p-4 border-b">Referent</th>
                                    <th className="p-4 border-b">Datum ekspedicije</th>
                                    <th className="p-4 border-b">Datum pravosnažnosti</th>
                                    <th className="p-4 border-b">Operacije</th>
                                </tr>
                            </thead>

                            <tbody>
                                {prikazaniPredmeti.map((predmet, i) => (
                                    <tr key={i} className="hover:bg-slate-50 border-b border-slate-200">
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
                                        <td className="p-4 py-5">
                                            <button className="izbrisi_predmet relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                type="button"
                                                data-dialog-target="dialog"
                                                data-predmetid={predmet.id}
                                                onClick={(event) => posaljiNaBackend(event.currentTarget.dataset.predmetid)}
                                            >
                                                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                                                        <path d="M9 3a1 1 0 00-1 1v1H4.75a.75.75 0 000 1.5H5.5v12A2.5 2.5 0 008 21h8a2.5 2.5 0 002.5-2.5V6h.75a.75.75 0 000-1.5H16V4a1 1 0 00-1-1H9zm1 3V4h4v2H10zm-1.5 3.25a.75.75 0 011.5 0v8.5a.75.75 0 01-1.5 0v-8.5zm4 0a.75.75 0 011.5 0v8.5a.75.75 0 01-1.5 0v-8.5z" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Paginacija */}
                    <div className="flex justify-between items-center px-4 py-3">
                        <div className="text-sm text-slate-500">
                            Prikazano <b>{prikazaniPredmeti.length}</b> od {duzina}
                        </div>
                        <div className="flex space-x-1">
                            {Array.from({ length: brojStranica }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setStranica(i + 1)}
                                    className={`px-3 py-1 text-sm min-w-9 border rounded 
                                        ${stranica === i + 1
                                            ? "bg-slate-200 border-slate-400"
                                            : "bg-white border-slate-200 hover:bg-slate-50"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
