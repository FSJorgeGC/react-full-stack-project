/* LIstaComponent
    - Componente general que nos permite según el tipo que pasemos sacar diferentes listados de peliculas
*/

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./listaTendencia.css";
import { BtnPorVer } from "../BtnPorVer";
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import { BtnFav } from "../BtnFav";
import { set } from "mongoose";

const TITULOS = {
  tendencia: "en Tendencia",
  top: "Mejor Valoradas",
  populares: "Populares",
  nextMovies: "que saldrán próximamente",
};

const ListaComponent = ({ tipo }) => {
  const [peliculas, setPeliculas] = useState([]);
  const [checkPorVer, setCheckPorVer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BACKEND_API = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api/v1";

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${BACKEND_API}/${tipo}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener películas");
        return res.json();
      })
      .then((data) => setPeliculas(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [tipo]);




  const settings = {
    dots: true,
    infinite: false,
    speed: 200,
    slidesToShow: 6,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      { breakpoint: 1440, settings: { slidesToShow: 4, slidesToScroll: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };



  return (
    <div className="carrusel-container">
      <h2>Películas {TITULOS[tipo] || ""}</h2>
      <Slider {...settings}>
        {peliculas.length > 0 &&
          peliculas.map((p) => (
            <div key={p.id} className="movie-card">
              <div className="movie-card-inner">
                <div className="movie-card-front">
                  {p.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${p.poster_path}`}
                      alt={`Poster de ${p.title}`}
                    />
                  )}
                </div>
                <div className="movie-card-back">
                  <div className="movie-info">
                    <div>
                      <h3>{p.title}</h3>
                      <p>{p.release_date}</p>
                    </div>
                    <div>
                      <Link to="/MovieDetails" state={{ movie: p }} className="button" aria-label={`Detalles de ${p.title}`}>
                        <FaInfoCircle />
                      </Link>
                    </div>
                  </div>
                  <div className="buttons-container">
                    <div className="buttons-icons">
                      <BtnFav
                        tmdbId={p.id}
                        titulo={p.title}
                        poster={p.poster_path}
                        anio={p.release_date?.split("-")[0]}
                        overview={p.overview}
                      />
                      <BtnPorVer
                        tmdbId={p.id}
                        titulo={p.title}
                        poster={p.poster_path}
                        anio={p.release_date?.split("-")[0]}
                        overview={p.overview}
                        styleClass={checkPorVer ? "active" : ""}
                      />
                    </div>
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
  );
};

export default ListaComponent;
