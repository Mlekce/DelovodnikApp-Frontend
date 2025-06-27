import React, { useState } from "react"
import DatePicker, { registerLocale } from "react-datepicker"
import { sr } from "date-fns/locale"
import { addDays, format } from "date-fns"
import "react-datepicker/dist/react-datepicker.css"
import "../custom-datepicker.css" // (vidi ispod)

registerLocale("sr", sr)

export default function FormaPredmet() {
  const [datumPodnosenja, setDatumPodnosenja] = useState(null)
  const [pravosnaznost8, setPravosnaznost8] = useState("")
  const [pravosnaznost30, setPravosnaznost30] = useState("")

  function izracunajDatume() {
    if (!datumPodnosenja) return

    const d8 = addDays(datumPodnosenja, 8)
    const d30 = addDays(datumPodnosenja, 30)

    setPravosnaznost8(format(d8, "dd.MM.yyyy"))
    setPravosnaznost30(format(d30, "dd.MM.yyyy"))
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
        Unos predmeta
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
            Pravosnažnost (8 dana)
          </label>
          <input
            type="text"
            value={pravosnaznost8}
            readOnly
            className="mt-1 w-full rounded-md bg-gray-100 border-gray-300 shadow-sm p-2 text-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Pravosnažnost (30 dana)
          </label>
          <input
            type="text"
            value={pravosnaznost30}
            readOnly
            className="mt-1 w-full rounded-md bg-gray-100 border-gray-300 shadow-sm p-2 text-gray-600"
          />
        </div>
      </div>

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
        >
          Sačuvaj predmet
        </button>
      </div>
    </div>
  )
}
