import icon from "../assets/favicon.ico";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [poruka, setPoruka] = useState("");

  function posaljiPodatke(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const lozinka = formData.get("password");

    async function posaljiNaBekend(email, lozinka) {
      const url = "http://localhost:4000/api/login";
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, lozinka })
        };

        const res = await fetch(url, options);
        const data = await res.json();

        return { ok: res.ok, data };
      } catch (err) {
        console.error(err);
        return { ok: false, data: null };
      }
    }

    posaljiNaBekend(email, lozinka).then(({ ok, data }) => {
      if (!ok || !data?.token) {
        setPoruka("Prijava nije uspela. Proverite podatke.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("korisnik", JSON.stringify(data.korisnik));
      setPoruka("Uspešno ste prijavljeni!");

      setTimeout(() => {
        navigate("/delovodnik");
      }, 2000);
    });
  }
  return (
    <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8" id="login">
      <div className="bg-white border border-gray-200 sm:mx-auto sm:w-full sm:max-w-md py-6 px-6 rounded-2xl shadow-xl">      
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-18 w-auto" src={icon} alt="Republicki geodetski zavod" />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Delovodnik prijava </h2>
      </div>

      {poruka &&
        <div className="block text-sm/6 mt-5 bg-green-600 text-white font-semibold text-center">
          {poruka}
        </div>
      }

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={posaljiPodatke}>
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email adresa</label>
            <div className="mt-2">
              <input type="email" name="email" id="email" autoComplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Sifra</label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Zaboravljena sifra?</a>
              </div>
            </div>
            <div className="mt-2">
              <input type="password" name="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Prijavi se</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Nemate nalog?
          <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500"> Registruj se</a>
        </p>
      </div>
      </div>
    </div>
  )
}