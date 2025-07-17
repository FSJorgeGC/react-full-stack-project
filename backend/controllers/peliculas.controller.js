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
  }
};
export const getTendencia = async (req, res) => {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/trending/movie/day?api_key=${TMDB_API_KEY}&language=es-ES`);
    const data = await response.json();
    res.json(data.results);
  } catch (err) {
    res.status(500).json({ error: "Error al consultar tendencia" });
  }
};

export const getTopPeliculas = async (req, res) => {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=es-ES`);
    const data = await response.json();
    res.json(data.results);
  } catch (err) {
    res.status(500).json({ error: "Error al consultar tendencia" });
  }
};


export const getNextMovies = async (req, res) => {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=es-ES`);
    const data = await response.json();
    res.json(data.results);
  } catch (err) {
    res.status(500).json({ error: "Error al consultar tendencia" });
  }
};


export const addToWatchlist = async (req, res) => {
  const userId = req.user.id; // Asumiendo que el ID del usuario está en req.user.id
  const { tmdbId, titulo, poster, anio, overview } = req.body;
  console.log("ID del usuario:", req.body);
  try{
    // Comprobar que el usuario existe
    const user = await usuarioModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Comprobar que no esta ya en la lista
    if(user.watchlist.some(movie => movie.tmdbId === tmdbId)) {
      return res.status(400).json({ error: "La película ya está en la lista de seguimiento" });
    }

    user.watchlist.push({ tmdbId, titulo, poster, anio, overview });
    await user.save();
    res.status(201).json({ message: "Película añadida a la lista de seguimiento" });
  } catch (err) {
    console.error("Error al añadir a la lista de seguimiento:", err);
    res.status(500).json({ error: "Error al añadir a la lista de seguimiento" });
  }
};

export const deleteFromWatchlist = async (req, res) => {
  const userId = req.user.id; // Asumiendo que el ID del usuario está en req.user.id
  const { tmdbId } = req.body;
  try {
    // Comprobar que el usuario existe
    const user = await usuarioModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Comprobar que la película está en la lista
    const movieIndex = user.watchlist.findIndex(movie => movie.tmdbId === tmdbId);

    // Eliminar la película de la lista
    user.watchlist.splice(movieIndex, 1);
    await user.save();
    res.status(200).json({ message: "Película eliminada de la lista de seguimiento" });
  } catch (err) {
    console.error("Error al eliminar de la lista de seguimiento:", err);
    res.status(500).json({ error: "Error al eliminar de la lista de seguimiento" });
  }
}


export const getUserWatchlist = async (req, res) => {
  const userId = req.user.id; // Asumiendo que el ID del usuario está en req.user.id
  const { tmdbId, titulo, poster, anio, overview } = req.body;
  console.log("ID del usuario:", req.body);
  try{
    // Comprobar que el usuario existe
    const user = await usuarioModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Comprobar que no esta ya en la lista
    if(user.watchlist.some(movie => movie.tmdbId === tmdbId)) {
       res.status(201).json({ message: "La película ya está en la lista de seguimiento" });
    }

  } catch (err) {
    console.error("Error al obtener la lista de seguimiento:", err);
    res.status(500).json({ error: "Error al obtener la lista de seguimiento" });
  }
};

export const getUserFavList = async (req, res) => {
  const userId = req.user.id; // Asumiendo que el ID del usuario está
  try {
    // Comprobar que el usuario existe
    const user = await usuarioModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Devolver la lista de favoritos
    res.status(200).json(user.favList);
  } catch (err) {
    console.error("Error al obtener la lista de favoritos:", err);
    res.status(500).json({ error: "Error al obtener la lista de favoritos" });
  }
}; 

export const getMovieDetails = async (req, res) => {
  const { tmdbId } = req.params;
  try {
    const response = await fetch(`${TMDB_BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}&language=es-ES`);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Error al obtener detalles de la película" });
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error al obtener detalles de la película:", err);
    res.status(500).json({ error: "Error al obtener detalles de la película" });
  }
}



export const searchMovies = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetch(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=es-ES&query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Error al buscar películas" });
    }
    const data = await response.json();
    res.json(data.results);
  } catch (err) {
    console.error("Error al buscar películas:", err);
    res.status(500).json({ error: "Error al buscar películas" });
  }
};



export const getMovieActors = async (req, res, next) => {
  try{
    const { idMovie } = req.params;
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