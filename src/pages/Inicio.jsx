/* Página de inicio 
  - En esta página se muestra el componente ListaComponent según la cantidad de tipos que haya en el listado

*/

import "./buscador.css"; // Importa el CSS para estilos
import ListaComponent from "../components/listas/ListaComponent";
import ListaComponentBusqueda from "../components/listas/ListaComponentBusqueda";
import React, { use, useState } from "react";
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa"; // Icono de información

const Inicio = () => {



    console.log(import.meta.env.VITE_API_URL);


  const tipoPelicula = ["tendencia", "populares", "top", "nextMovies"];
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const [searchMovie, setSearchMovie] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

   
  return (
   <>
  {/* Solo se muestra si NO hay resultados de búsqueda */}
  {searchMovie.length === 0 && (
    <div className="general-movies-list">
      {tipoPelicula.map((tipo) => (
        <ListaComponent key={tipo} tipo={tipo} />
      ))}
    </div>
  )}

</>

  );
};


export default Inicio;
