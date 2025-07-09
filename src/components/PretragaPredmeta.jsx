import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { sr } from "date-fns/locale";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "../custom-datepicker.css";
import Header from "./Header";
import TabelaPredmeta from "./TabelaPredmeta";

registerLocale("sr", sr);

export default function PretragaPredmeta() {
  return (
    <>
      <Header />
      <Pracenje />
    </>
  );
}

function Pracenje() {
  const [predmeti, setPredmeti] = useState([]);
  const [poruka, setPoruka] = useState("");
  const [stranka, setStranka] = useState("");
  const [predmet, setPredmet] = useState("");
  const [datumPodnosenja, setDatumPodnosenja] = useState(null);
  const [datumPravosnaznosti, setDatumPravosnaznosti] = useState(null);

  const podaciOKorisniku = JSON.parse(localStorage.getItem("korisnik")) || {};
  const referent = podaciOKorisniku.ime || "";

  const pretraziPredmete = async () => {
    const url = "http://localhost:4000/api/predmet/pretraga";

    const body = {
      predmet: {
        broj_predmeta: predmet || null,
        ime_stranke: stranka || null,
        referent: referent || null,
        datum_podnosenja: datumPodnosenja
          ? format(datumPodnosenja, "yyyy-MM-dd")
          : null,
        datum_pravosnaznosti: datumPravosnaznosti
          ? format(datumPravosnaznosti, "yyyy-MM-dd")
          : null,
      },
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        setPoruka("Greška pri povlačenju podataka iz baze!");
        return;
      }

      const data = await response.json();

      if(data.length === 0){
        setPredmeti([])
        setPoruka("Nema stavki za prikaz!")
      }
      else {
        setPredmeti(data);
        setPoruka("");
      }
      console.log(predmeti)
    } catch (error) {
      console.error("Greška u pretrazi:", error);
      setPoruka("Neočekivana greška!");
      setPredmeti([]);
    }
  };

  return (
    <>
      <div className="max-w-[900px] mx-auto p-6 mt-6 mb-6 bg-white rounded-xl shadow-md space-y-6">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
          PRETRAGA PREDMETA
        </h2>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            pretraziPredmete();
          }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ime i prezime stranke
            </label>
            <input
              type="text"
              name="stranka"
              value={stranka}
              onChange={(e) => setStranka(e.target.value)}
              placeholder="Petar Petrović"
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Broj predmeta
            </label>
            <input
              type="text"
              name="predmet"
              value={predmet}
              onChange={(e) => setPredmet(e.target.value)}
              placeholder="RGZ-1234/2024"
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Datum podnošenja
            </label>
            <DatePicker
              selected={datumPodnosenja}
              onChange={(date) => setDatumPodnosenja(date)}
              dateFormat="dd.MM.yyyy"
              locale="sr"
              placeholderText="Izaberi datum"
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm text-gray-700 p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Referent
            </label>
            <input
              type="text"
              readOnly
              value={referent}
              className="mt-1 w-full rounded-md bg-gray-100 border-gray-300 shadow-sm p-2 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Datum pravosnažnosti
            </label>
            <DatePicker
              selected={datumPravosnaznosti}
              onChange={(date) => setDatumPravosnaznosti(date)}
              dateFormat="dd.MM.yyyy"
              locale="sr"
              placeholderText="Izaberi datum"
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm text-gray-700 p-2"
            />
          </div>
        </form>

        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={pretraziPredmete}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
          >
            Pretraži
          </button>
        </div>

        {poruka && (
          <div className="text-red-600 font-medium border border-red-200 rounded p-2 bg-red-50">
            {poruka}
          </div>
        )}
      </div>

      <TabelaPredmeta predmeti={predmeti} duzina={predmeti.length} />
    </>
  );
}
