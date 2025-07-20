import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import {jwtDecode} from "jwt-decode";

import Login from "./components/Login"
import Logout from "./components/Logout"
import Stranica404 from './components/Stranica404.jsx'
import PretragaPredmeta from './components/PretragaPredmeta.jsx'
import Korisnici from './components/TabelaKoriniska.jsx'
import KomponentaNalog from './components/Nalog.jsx'
import StranicaStatistika from './components/Statistika.jsx'
import Register from "./components/Register.jsx"
import ResetPass from "./components/ResetPass.jsx"

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/reset", element: <ResetPass /> },
  { path: "/index", element: <Navigate to="/" replace /> },
  { path: "/pocetna", element: <Navigate to="/" replace /> },
  { path: "/pracenje", element: (<ProtectedRoute><PretragaPredmeta /></ProtectedRoute>) },
  { path: "/korisnici", element: (<AdminRoute><Korisnici /></AdminRoute>) },
  { path: "/statistika", element: (<ProtectedRoute><StranicaStatistika /></ProtectedRoute>) },
  { path: "/delovodnik", element: (<ProtectedRoute> <App /></ProtectedRoute>) },
  { path: "/profil", element: (<ProtectedRoute> <KomponentaNalog /></ProtectedRoute>) },
  { path: "/odjava", element: <Logout /> },
  { path: "*", element: <Stranica404 /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)


function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const isAuth = token && isTokenValid(token);

  return isAuth ? children : <Navigate to="/" replace />;
}

function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("korisnik") || "{}");
  const token = localStorage.getItem("token");
  const isAuth = token && isTokenValid(token);

  return user.uloga === "admin" && isAuth
    ? children
    : <Navigate to="/" replace />;
}

function isTokenValid(token) {
  try {
    const { exp } = jwtDecode(token);
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
}