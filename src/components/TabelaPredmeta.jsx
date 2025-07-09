import { useState, useEffect } from "react";
import { format } from "date-fns";

export default function TabelaPredmeta({ predmeti, duzina }) {
    const prikaz = 6;
    const [stranica, setStranica] = useState(1);
    const [prikazaniPredmeti, setPrikazaniPredmeti] = useState([]);

    useEffect(() => {
        // kad predmeti stignu ili stranica se promeni, napravi slice
        const pocetak = (stranica - 1) * prikaz;
        const kraj = stranica * prikaz;
        if (duzina > 0) {
            setPrikazaniPredmeti(predmeti.slice(pocetak, kraj));
        } else {
            setPrikazaniPredmeti([])
        }
    }, [predmeti, stranica]);

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
                                    <th className="p-4 border-b">Datum podnošenja</th>
                                    <th className="p-4 border-b">Datum pravosnažnosti</th>
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
