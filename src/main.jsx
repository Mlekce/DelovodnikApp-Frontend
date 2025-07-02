import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

import Login from "./components/Login"
import Stranica404 from './components/Stranica404.jsx'
import PretragaPredmeta from './components/PretragaPredmeta.jsx'
import Korisnici from './components/TabelaKoriniska.jsx'
import KomponentaNalog from './components/Nalog.jsx'
import StranicaStatistika from './components/Statistika.jsx'
import Register from "./components/Register.jsx"

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register />},
  { path: "/index", element: <Navigate to="/" replace /> },
  { path: "/pocetna", element: <Navigate to="/" replace /> },
  { path: "/pracenje", element: <PretragaPredmeta /> },
  { path: "/korisnici", element: <Korisnici /> },
  { path: "/statistika", element: <StranicaStatistika /> },
  { path: "/delovodnik", element: <App /> },
  { path: "/profil", element: <KomponentaNalog /> },
  { path: "*", element: <Stranica404 /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
