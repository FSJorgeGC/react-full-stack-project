/* --------------------- App.jsx ---------------------
Routing: BrowserRouter, Routes, Route, Navigate
Páginas:
  - Inicio, Login, Registro, Perfil, MovieDetails
Componentes:
  - Header (siempre visible)
----------------------------------------------------- */

import './App.css'
import Inicio from './pages/Inicio.jsx'
import { Header } from './pages/Header.jsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MovieDetails from './pages/MovieDetails.jsx'
import { Login } from './pages/Login.jsx'
import { Perfil } from './pages/Perfil.jsx'
import { Registro } from './pages/Registro.jsx'
import { Buscador } from './pages/Buscador.jsx'

function App() {
  console.log(import.meta.env)
  return (
        <><Header /><div>
          <main>
           <Routes>
        <Route path="/" element={<Navigate to="/inicio" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/MovieDetails" element={<MovieDetails />} />
        <Route path="/buscador" element={<Buscador />} />
      </Routes>
          </main>
    </div></>
  );
}

export default App;
