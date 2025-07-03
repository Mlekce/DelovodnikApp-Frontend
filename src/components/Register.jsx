import icon from "../assets/favicon.ico";
import React from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";

export default function Register() {
  const navigate = useNavigate();
  let [poruka, setPoruka] = React.useState(null);

  function posaljiPodatke(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const cpassword = formData.get("cpassword");

    function validateEmail(email) {
      if (typeof email !== "string") return false;
      const trimmed = validator.trim(email);
      if (!validator.isEmail(trimmed)) {
        return false;
      }
      const normalizedEmail = validator.normalizeEmail(trimmed, {
        all_lowercase: true,
        gmail_remove_subaddress: true,
        yahoo_remove_subaddress: true,
        icloud_remove_subaddress: true
      });
      return normalizedEmail || false;
    }

    function validatePasword(pass1, pass2) {
      if (pass1 !== pass2) {
        return false
      }
      let trim1 = validator.trim(pass1);
      let regx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      if (!regx.test(trim1)) {
        return false;
      }
      return true
    }

    let url = "http://localhost:4000/api/register";
    let obradjenEmail = validateEmail(email);
    let passwordTest = validatePasword(password, cpassword);

    if (!passwordTest) {
      return false
    }
    else {
      posaljiNaBackend(url, obradjenEmail, password)

    }

    async function posaljiNaBackend(url, email, pass) {
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ime: "Srdjan S",
          email,
          lozinka: pass,
          uloga: "admin",
          sluzba: "Sektor DT",
          avatar: null
        })
      }
      try {
        let response = await fetch(url, options);
        let data = await response.json();
        setPoruka(data.poruka);

        if (response.ok) {
          setTimeout(() => {
            navigate("/login")
          }, 3000)
        }
      } catch (error) {
        setPoruka("Greška pri slanju podataka.");
        console.error(err);
      }
    }
  }

  return (
    <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-18 w-auto" src={icon} alt="Republicki geodetski zavod" />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Delovodnik registracija </h2>
      </div>
      {poruka &&
        <div className="block text-sm/6 font-medium mt-5 text-green-600 text-center">
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
            </div>
            <div className="mt-2">
              <input type="password" name="password" id="password" autoComplete="password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Potvrdi Sifru</label>
            </div>
            <div className="mt-2">
              <input type="password" name="cpassword" id="cpassword" autoComplete="password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Registruj se</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Vec imate nalog?
          <a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500"> Idi na prijavu</a>
        </p>
      </div>
    </div>
  )
}