import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

import Login from "./components/Login"
import Stranica404 from './components/Stranica404.jsx'

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/index", element: <Navigate to="/" replace /> },
  { path: "/pocetna", element: <Navigate to="/" replace /> },
  { path: "/delovodnik", element: <App /> },
  { path: "*", element: <Stranica404 /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
