import { TMDB_API_KEY, TMDB_BASE_URL } from "../config/config.js";
import fetch from "node-fetch";
import usuarioModel from "../db/models/usuario.model.js";

export const getPopulares = async (req, res, next) => {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=es-ES`);
    const data = await response.json();
    res.json(data.results);
  } catch (err) {
    res.status(500).json({ error: "Error al consultar populares" });
    next(err);
  }
};
export const getTendencia = async (req, res, next) => {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/trending/movie/day?api_key=${TMDB_API_KEY}&language=es-ES`);
    const data = await response.json();
    res.json(data.results);
  } catch (err) {
    next(err);
    res.status(500).json({ error: "Error al consultar tendencia" });
  }
};

export const getTopPeliculas = async (req, res, next) => {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=es-ES`);
    const data = await response.json();
    res.json(data.results);
  } catch (err) {
    next(err);
    res.status(500).json({ error: "Error al consultar tendencia" });
  }
};


export const getNextMovies = async (req, res, next) => {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=es-ES`);
    const data = await response.json();
    res.json(data.results);
  } catch (err) {
    next(err);
    res.status(500).json({ error: "Error al consultar tendencia" });
  }
};


export const addToWatchlist = async (req, res, next) => {
  const userId = req.user.id; 
  const { tmdbId, titulo, poster, anio, overview } = req.body;
  try{
    const user = await usuarioModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if(user.watchlist.some(movie => movie.tmdbId === tmdbId)) {
      return res.status(400).json({ error: "La película ya está en la lista de seguimiento" });
    }

    user.watchlist.push({ tmdbId, titulo, poster, anio, overview });
    await user.save();
    res.status(201).json({ message: "Película añadida a la lista de seguimiento" });
  } catch (err) {
    next(err);
  }
};

export const deleteFromWatchlist = async (req, res, next) => {
  const userId = req.user.id;
  const { tmdbId } = req.body;
  try {
    const user = await usuarioModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const movieIndex = user.watchlist.findIndex(movie => movie.tmdbId === tmdbId);

    user.watchlist.splice(movieIndex, 1);
    await user.save();
    res.status(200).json({ message: "Película eliminada de la lista de seguimiento" });
  } catch (err) {
    console.error("Error al eliminar de la lista de seguimiento:", err);
    res.status(500).json({ error: "Error al eliminar de la lista de seguimiento" });
  }
}


export const getUserWatchlist = async (req, res, next) => {
  const userId = req.user.id; 
  const { tmdbId, titulo, poster, anio, overview } = req.body;
  try{
    const user = await usuarioModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }


    if(user.watchlist.some(movie => movie.tmdbId === tmdbId)) {
       res.status(201).json({ message: "La película ya está en la lista de seguimiento" });
    }

  } catch (err) {
    next(err);
  }
};

export const addToFavList = async (req, res, next) => {
  const userId = req.user.id;
  const { tmdbId, titulo, poster, anio, overview } = req.body;
  try {

    const user = await usuarioModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
 
    if (user.favList.some(movie => movie.tmdbId === tmdbId))
      return res.status(400).json({ error: "La película ya está en la lista de favoritos" });

    user.favList.push({ tmdbId, titulo, poster, anio, overview });
    await user.save();
    res.status(201).json({ message: "Película añadida a la lista de favoritos" });
  } catch (err) {
    console.error("Error al añadir a la lista de favoritos:", err);
    res.status(500).json({ error: "Error al añadir a la lista de favoritos" });
    next(err);
  }
}; 

export const getMovieDetails = async (req, res, next) => {
  const { tmdbId } = req.params;
  try {
    const response = await fetch(`${TMDB_BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}&language=es-ES`);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Error al obtener detalles de la película" });
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener detalles de la película" });
    next(err);
  }
}



export const searchMovies = async (req, res, next) => {
  const { query } = req.params;
  try {
    const response = await fetch(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=es-ES&query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Error al buscar películas" });
    }
    const data = await response.json();
    res.json(data.results);
  } catch (err) {
    next(err);
  }
};



export const getMovieActors = async (req, res, next) => {
  try{
    const { idMovie } = req.params;
    console.log('ID de la película:', idMovie);
    console.log('URL de la API:', `${TMDB_BASE_URL}/movie/${idMovie}/credits?api_key=${TMDB_API_KEY}&language=es-ES`);
    const response = await fetch(`${TMDB_BASE_URL}/movie/${idMovie}/credits?api_key=${TMDB_API_KEY}&language=es-ES`);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Error al obtener información de la película" });
    }
    const data = await response.json();
    res.json(data.cast);
  } catch (err) {
    console.error("Error al obtener información de la película:", err);
    res.status(500).json({ error: "Error al obtener información de la película" });
    next(err);
  }
};


export const getMovieVideos = async (req, res, next) => {
  const { idMovie } = req.params;
  try {
    const response = await fetch(`${TMDB_BASE_URL}/movie/${idMovie}/videos?api_key=${TMDB_API_KEY}&language=es-ES`);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Error al obtener videos de la película" });
    }
    const data = await response.json();
    res.json(data.results);
  } catch (err) {
    console.error("Error al obtener videos de la película:", err);
    res.status(500).json({ error: "Error al obtener videos de la película" });
    next(err);
  }
}


export const checkPorVer = async (req, res, next) => {
  const userId = req.params.id;
  const { tmdbId } = req.params;
  try {
    const user = await usuarioModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const movie = user.watchlist.find(movie => movie.tmdbId === tmdbId);
    if (!movie) {
      return res.status(404).json({ error: "Película no encontrada en la lista de seguimiento" });
    }
    
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ error: "Error al comprobar la lista de seguimiento" });
    next(err);
  }
};


export const getMoviesGenres = async (req, res, next) => {
  try{
    const response = await fetch(`${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=es-ES`);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Error al obtener géneros de películas" });
    }
    const data = await response.json();
    res.json(data.genres);
  } catch (err) {
    console.error("Error al obtener géneros de películas:", err);
    res.status(500).json({ error: "Error al obtener géneros de películas" });
    next(err);
  }
}

export const getMoviesByGenre = async (req, res, next) => {
  const { idGenre } = req.params;
  try {
    console.log('ID del género seleccionado:', idGenre);
    console.log('URL de la API:', `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=es-ES&with_genres=${idGenre}`);

    const response = await fetch(`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=es-ES&with_genres=${idGenre}`);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Error al obtener películas por género" });
    }
    const data = await response.json();
    res.json(data.results);
  } catch (err) {
    console.error("Error al obtener películas por género:", err);
    res.status(500).json({ error: "Error al obtener películas por género" });
    next(err);
  }
}