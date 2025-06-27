import icon from "../assets/favicon.ico";

export default function Login(){
    return (

<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-18 w-auto" src={icon} alt="Republicki geodetski zavod" />
    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Delovodnik prijava </h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" action="#" method="POST">
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
      <a href="mailto:administrator@example.com" className="font-semibold text-indigo-600 hover:text-indigo-500"> Kontaktirajte administratora</a>
    </p>
  </div>
</div>
    )
}