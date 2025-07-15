import React, { useState, useEffect } from "react"
import DatePicker, { registerLocale } from "react-datepicker"
import { sr } from "date-fns/locale"
import { parse, format, isValid } from "date-fns";
import "react-datepicker/dist/react-datepicker.css"
import "../custom-datepicker.css" // (vidi ispod)
import { mainSevenDays, mainThirtyDays } from "../../public/scripts/vreme"
import TabelaPredmeta from "./TabelaPredmeta";
registerLocale("sr", sr)

export default function FormaPredmet() {
  const [datumPodnosenja, setDatumPodnosenja] = useState(null);
  const [pravosnaznost8, setPravosnaznost8] = useState("");
  const [pravosnaznost30, setPravosnaznost30] = useState("");
  const [predmeti, setPredmeti] = useState([]);
  const [poruka, setPoruka] = useState("");
  const user = JSON.parse(localStorage.getItem("korisnik"));

  useEffect(() => {
    povuciPodatke()
  }, [])

  function izracunajDatume() {
    if (!datumPodnosenja) return
    const d8 = mainSevenDays(datumPodnosenja);
    const d30 = mainThirtyDays(datumPodnosenja);
    setPravosnaznost8(format(d8, "dd.MM.yyyy"))
    setPravosnaznost30(format(d30, "dd.MM.yyyy"))
  }

  function posaljiPodatke(e) {
    e.preventDefault();

    const forma = document.getElementById("unosForma");
    const formData = new FormData(forma);
    const stranka = formData.get("stranka");
    const brPredmeta = formData.get("brpredmeta");
    const dPodnosenja = datumPodnosenja
      ? format(datumPodnosenja, "yyyy-MM-dd")
      : "";
    const referent = formData.get("referent");
    const d8 = formData.get("pravosnaznost8");
    const d30 = formData.get("pravosnaznost30");
    let dPravosnaznosti = "";

    if (d8 && d30) {
      setPoruka("Korisnička greška: Obrisite jedno od polja pravosnažnosti!");
      return;
    }

    if (d8) {
      const parsed = parse(d8, "dd.MM.yyyy", new Date());
      if (!isValid(parsed)) {
        setPoruka("Nevažeći datum pravosnažnosti (8 dana).");
        return;
      }
      dPravosnaznosti = format(parsed, "yyyy-MM-dd");
    } else if (d30) {
      const parsed = parse(d30, "dd.MM.yyyy", new Date());
      if (!isValid(parsed)) {
        setPoruka("Nevažeći datum pravosnažnosti (30 dana).");
        return;
      }
      dPravosnaznosti = format(parsed, "yyyy-MM-dd");
    } else {
      setPoruka("Morate uneti bar jedan datum pravosnažnosti!");
      return;
    }

    if (!stranka || !brPredmeta || !dPodnosenja || !referent || !dPravosnaznosti) {
      setPoruka("Korisnička greška: Sva polja moraju biti popunjena!");
      return;
    }

    async function posaljiNaBackend() {
      const url = "http://localhost:4000/api/predmet";
      const opcije = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          user: JSON.parse(localStorage.getItem("korisnik")),
          predmet: {
            stranka,
            broj_predmeta: brPredmeta,
            referent,
            datum_podnosenja: dPodnosenja,
            datum_pravosnaznosti: dPravosnaznosti,
            napomena: null,
            status: "u_izradi"
          }
        })
      };

      try {
        const rezultat = await fetch(url, opcije);
        const podaci = await rezultat.json();
        console.log(podaci);
        if (rezultat.status === 400) {
          setPoruka(podaci.poruka);
          return;
        }

        if (rezultat.status === 201) {
          setPoruka("Predmet uspešno dodat.");
          forma.reset();
          setDatumPodnosenja(null);
          setPravosnaznost8("");
          setPravosnaznost30("");
        }
      } catch (error) {
        console.error(error.message);
        setPoruka("Aplikativna greška: predmet nije dodat!");
      }
    }

    posaljiNaBackend();
  }

  async function povuciPodatke() {
  let url = "http://localhost:4000/api/predmet";
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
      setPoruka("Nema stavki za prikaz!");
      return;
    }
    let data = await response.json();
    setPredmeti(data);
  } catch (error) {
    console.error(error.message);
    setPoruka("Greška: Server nedostupan!");
  }
}

  return (
    <>
    <div className="max-w-[900px] mx-auto p-6 mt-6 mb-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
        UNOS PREDMETA
      </h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" id="unosForma">
        <div className="col-span-1 md:col-span-2 text-center text-red-500">
          {poruka}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ime i prezime
          </label>
          <input
            type="text"
            placeholder="Petar Petrović"
            name="stranka"
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Broj predmeta
          </label>
          <input
            type="text"
            name="brpredmeta"
            placeholder="RGZ-1234/2024"
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-2"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Datum podnošenja
          </label>
          <DatePicker
            selected={datumPodnosenja}
            onChange={(date) => setDatumPodnosenja(date)}
            dateFormat="dd.MM.yyyy"
            locale="sr"
            name="dpodnosenja"
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
            value={user.ime}
            placeholder={user.ime}
            name="referent"
            className="mt-1 w-full rounded-md bg-gray-100 border-gray-300 shadow-sm p-2 text-gray-600"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Pravosnažnost (8 dana)
          </label>
          <input
            type="text"
            value={pravosnaznost8}
            name="pravosnaznost8"
            onChange={(e) => setPravosnaznost8(e.target.value)}
            placeholder="dd.mm.yyyy"
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm text-gray-700 p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Pravosnažnost (30 dana)
          </label>
          <input
            type="text"
            value={pravosnaznost30}
            name="pravosnaznost30"
            onChange={(e) => setPravosnaznost30(e.target.value)}
            placeholder="dd.mm.yyyy"
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm text-gray-700 p-2"
          />
        </div>
      </form>

      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={izracunajDatume}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
        >
          Izračunaj pravosnažnost
        </button>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          onClick={posaljiPodatke}
        >
          Sačuvaj predmet
        </button>
      </div>
    </div>
    { !predmeti && <TabelaPredmeta predmeti={[]} duzina={0}/>}
    { predmeti && <TabelaPredmeta predmeti={predmeti} duzina={predmeti.length}/>}
    
    </>
  )
}
