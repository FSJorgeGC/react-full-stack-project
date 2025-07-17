/* LIstaComponent
    - Componente general que nos permite según el tipo que pasemos sacar diferentes listados de peliculas
*/

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./listaTendencia.css"
import { BtnPorVer } from "../BtnPorVer";
import { Link } from "react-router-dom";
import {FaInfoCircle} from "react-icons/fa";

const ListaComponent = ({moviesSearch}) => {

  const settings = {
    dots: true,
    infinite: false,
    speed: 200,
    slidesToShow: 6,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4, slidesToScroll: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
    ],
  };





   return (
    <>
     
    <div className="carrusel-container" >
       <Slider {...settings}>
         {moviesSearch.length > 0 && moviesSearch.map(p => (
           <div key={p.id} className="movie-card">
             <div className="movie-card-inner">
               <div className="movie-card-front">
                 {p.poster_path && (
                   <img
                     src={`https://image.tmdb.org/t/p/w500${p.poster_path}`}
                     alt={p.title} />
                 )}
               </div>
               <div className="movie-card-back">
                 <div>
                   <h3>{p.title} </h3>
                   <p>{p.release_date}</p>

                 </div>
                 <div className="buttons-container">
                   <BtnPorVer tmdbId={p.id} titulo={p.title} poster={p.poster_path} anio={p.release_date.split("-")[0]} overview={p.overview} />
                   <Link to="/MovieDetails" state={{ movie: p }} className="button">
                     <FaInfoCircle />
                   </Link>
                   <div>
                     <p className="num-vote">{p.vote_average}</p>

                   </div>

                 </div>


               </div>
             </div>
           </div>
         ))}
       </Slider>
     </div>
    </>
  );
}


export default ListaComponent;
