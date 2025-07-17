/* MovieDetails 
  - En está página se han realizado las diferentes llamadas a la API para obtener los siguientes resultados:
    - Datos importantes de la películas
    - Actores
    - Vídeos
*/


import { useLocation } from "react-router-dom";
import "./movieDetails.css";
import { useEffect, useState } from "react";

const MovieDetails = () => {

  const BACKEND_API = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api/v1";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


  const { state } = useLocation();
  const [actionButton, setActionButton] = useState("Resumen");
  const [responseVideo, setResponseVideo] = useState([]);
  const movie = state?.movie;
  const [cast, setCast] = useState([]);
  const [details, setDetails] = useState({});

  //Paginacion de los actores
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(cast.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCast = cast.slice(startIndex, endIndex);



  useEffect(() => {
    if (!movie) {
      console.error("No se ha proporcionado ningun objeto de película");
      return;
    }
    fetchMovieActors();
    fetchMovieDetails();
    fetchMovieVideos();
  }, [movie]);




  async function fetchMovieActors() {
    try {
      const response = await fetch(`${BACKEND_API}/movieActors/${movie.id}?api_key=${API_KEY}&language=es-ES`);
      if (!response.ok) {
        console.error("Error al obtener los actores de la película:", response.statusText);
        return;
      }

      const responseData = await response.json();
      console.log("Detalles de la película:", responseData.cast || "No");
      setCast(responseData.cast || []); // suponiendo que el backend responde con { data: { cast: [...] } }
    } catch (error) {
      console.error(error);
    }
  }

    async function fetchMovieDetails() {
    try {
      const response = await fetch(`${BACKEND_API}/movieDetail/${movie.id}?api_key=${API_KEY}&language=es-ES`);
      if (!response.ok) {
        console.error("Error al obtener detalles de la película:", response.statusText);
        return;
      }

      const responseData = await response.json();
      console.log("Detalles de la película:", responseData || "No");
      setDetails(responseData || []); // suponiendo que el backend responde con { data: { cast: [...] } }
    } catch (error) {
      console.error(error);
    }
  }

   async function fetchMovieVideos() {
    try {
      console.log("Obteniendo detalles de la película:", movie.id);
      const response = await fetch(`${BACKEND_API}/movieVideos/${movie.id}?api_key=${API_KEY}&language=es-ES`);
      if (!response.ok) {
        console.error("Error al obtener videos de la película:", response.statusText);
        return;
      }

      const responseData = await response.json();
      console.log("Detalles de la película:", responseData || "No");
      setResponseVideo(responseData || []); // suponiendo que el backend responde con { data: { cast: [...] } }
    } catch (error) {
      console.error(error);
    }
  }



  function handleActionButtonClick(e) {
  
      setActionButton(e.target.textContent);
  
  }

  return (
    <><h2>Detalles de la película</h2>
    <div className="movie-details-container">
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`Poster de ${movie.title}`} />
      </div>

      <div>
        <div className="movie-details-buttons">
          <button
            onClick={handleActionButtonClick}
            className={actionButton === "Resumen" ? "active" : ""}
          >
            Resumen
          </button>
          <button
            onClick={handleActionButtonClick}
            className={actionButton === "Actores" ? "active" : ""}
          >
            Actores
          </button>

          <button
            onClick={handleActionButtonClick}
            className={actionButton === "Video" ? "active" : ""}
          >
            Video
          </button>
        </div>

        {/* Contenido del RESUMEN */}
        {actionButton === "Resumen" && (
          <div className="info-container">
            <div className="movie-details-content info-container">
              <h1>{movie.title}</h1>
              <p>{movie.overview}</p>
              <div className="more-info-container">
                <p>{details.release_date && (
                  <span>{new Date(details.release_date).toLocaleDateString()}</span>
                )}</p>
                <p>{details.runtime && <span>{details.runtime} minutos</span>}</p>
                {details.genres && (
                  <div className="generos-container"> {details.genres.map(genre => <span key={genre.id}>{genre.name}</span>)}</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Contenido de ACTORES */}
        {actionButton === "Actores" && (
          <>
            <div className="cast-container">
              <div className="pagination-single" style={currentPage < 1 ? { display: "none" } : {}}>
                <button
                  onClick={() => setCurrentPage(currentPage === totalPages ? 1 : currentPage - 1)}
                >
                  ◀
                </button>
              </div>

              <div className="cast-list">
                {currentCast.map((actor) => (
                  <div className="actor-card" key={actor.id}>
                    <img
                      src={actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "/img/default-profile.png"}
                      alt={`Foto de ${actor.name}`} />
                    <div className="actor-info">
                      <p className="actor-name">{actor.name}</p>
                      <p className="actor-character">{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Paginación de actores */}
              <div className="pagination-single">
                <button
                  onClick={() => setCurrentPage(currentPage === totalPages ? 1 : currentPage + 1)}
                >
                  ➤
                </button>
              </div>
            </div>
          </>
        )}
        {/* Contenido de VIDEO */}
        {actionButton === "Video" && (
          <div className="video-container">
            {responseVideo.results && responseVideo.results.length > 0 ? (
              responseVideo.results.map((video) => (
                <div key={video.id} className="video-item">
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              ))
            ) : (
              <p>No hay videos disponibles para esta película.</p>
            )}
          </div>
        )}


      </div>
    </div></>
  );
};


export default MovieDetails;
