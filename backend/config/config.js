import dotenv from "dotenv";
dotenv.config();
// Configuración de variables de entorno
export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/cine-project";
export const BACKEND_API = process.env.BACKEND_API || "https://react-full-stack-project.onrender.com";
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";   
export const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION || "7d";

// Variable de autenticación con JWT
export const JWT_SECRET = process.env.JWT_SECRET;
export const TMDB_API_KEY = process.env.TMDB_API_KEY;
export const TMDB_BASE_URL = "https://api.themoviedb.org/3";



