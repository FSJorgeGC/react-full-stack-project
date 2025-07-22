import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./listas.css";
import { BtnPorVer } from "../buttons/BtnPorVer";
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import { BtnFav } from "../buttons/BtnFav";

const ListaComponent = ({ peliculasBusqueda = [], peliculasGenero = [] }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 200,
    slidesToShow: 6,
    slidesToScroll: 3,
    arrows: true,
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

  // Determinar qué lista mostrar
  const peliculas = peliculasBusqueda.length > 0 ? peliculasBusqueda : peliculasGenero;

  return (
    <div className="carrusel-container">
      <Slider {...settings}>
        {peliculas.map((p) => (
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
