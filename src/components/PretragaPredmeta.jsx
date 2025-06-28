import { useState } from "react"
import DatePicker, { registerLocale } from "react-datepicker"
import { sr } from "date-fns/locale"
import { addDays, format } from "date-fns"
import "react-datepicker/dist/react-datepicker.css"
import "../custom-datepicker.css" // (vidi ispod)
import Header from "./Header"
import TabelaPredmeta from "./TabelaPredmeta"

registerLocale("sr", sr)

export default function PretragaPredmeta() {
  return (
    <>
      <Header />
      <Pracenje />
      <TabelaPredmeta />
    </>
  )


}

function Pracenje() {
  const [datumPodnosenja, setDatumPodnosenja] = useState(null)
  const [datumPravosnaznosti, setDatumPravosnaznosti] = useState(null)
  return (
    <div className="max-w-[900px] mx-auto p-6 mt-6 mb-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
        PRETRAGA PREDMETA
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ime i prezime
          </label>
          <input
            type="text"
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
            placeholder="Unesite ime referenta"
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Datum Pravosnažnosti
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
      </div>
      <div className="flex justify-between gap-4">
        
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
        >
          Pretrazi
        </button>
        <div className="w-full py-2 px-4"></div>
      </div>
    </div>
  )
}