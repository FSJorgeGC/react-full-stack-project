/* Página de inicio 
  - En esta página se muestra el componente ListaComponent según la cantidad de tipos que haya en el listado

*/

import "./buscador.css"; // Importa el CSS para estilos
import ListaComponent from "../components/listas/ListaComponent";
import React, { use, useState } from "react";

const Inicio = () => {
  const tipoPelicula = ["tendencia", "populares", "top", "nextMovies"];

   
  return (
   <>
 
    <div className="general-movies-list">
      {tipoPelicula.map((tipo) => (
        <ListaComponent key={tipo} tipo={tipo} />
      ))}
    </div>


</>

  );
};


export default Inicio;
