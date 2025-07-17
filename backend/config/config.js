import dotenv from 'dotenv';
dotenv.config();

// Variable de autenticación con JWT
export const JWT_SECRET = process.env.JWT_SECRET;
export const TMDB_API_KEY = process.env.TMDB_API_KEY;
export const TMDB_BASE_URL = "https://api.themoviedb.org/3";



