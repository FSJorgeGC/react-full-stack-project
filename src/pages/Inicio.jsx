/* Página de inicio 
  - En esta página se muestra el componente ListaComponent según la cantidad de tipos que haya en el listado

*/

import "./buscador.css"; // Importa el CSS para estilos
import ListaComponent from "../components/listas/ListaComponent";
import ListaComponentBusqueda from "../components/listas/ListaComponentBusqueda";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa"; // Icono de información

const Inicio = () => {
  const tipoPelicula = ["tendencia", "populares", "top", "nextMovies"];
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const [searchMovie, setSearchMovie] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${VITE_API_URL}/search/${searchQuery}`);
      if (!response.ok) {
        throw new Error("Error al buscar películas");
      }
      const data = await response.json();
      console.log("Resultados de búsqueda:", data);
      setSearchMovie(data);
    } catch (error) {
      console.error("Error al buscar películas:", error);
      alert("Error al buscar películas. Por favor, inténtalo de nuevo más tarde.");
    }
  };
  return (
   <>
  <form onSubmit={handleSearch}>
    <h3>Busca aquí tu película para hoy</h3>
    <input
      type="text"
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Buscar películas..."
    />
  </form>

  {/* Solo se muestra si NO hay resultados de búsqueda */}
  {searchMovie.length === 0 && (
    <div className="general-movies-list">
      {tipoPelicula.map((tipo) => (
        <ListaComponent key={tipo} tipo={tipo} />
      ))}
    </div>
  )}

  {/* Resultados de búsqueda */}
  {searchMovie.length > 0 && (
    <div className="search-results">
      <h2>Resultados de búsqueda para: "{searchQuery}"</h2>
      <ListaComponentBusqueda moviesSearch={searchMovie} />
    </div>
  )}
</>

  );
};


export default Inicio;
