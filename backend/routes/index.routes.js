import { Router } from "express";
import { loginUser, registerUser, getCurrentUser } from "../controllers/auth.controller.js";
import { getPopulares, getTendencia, getMovieDetails, getTopPeliculas, 
    getNextMovies, getUserWatchlist, searchMovies, addToFavList , getMovieActors, getMovieVideos, checkPorVer } from "../controllers/peliculas.controller.js";
import { addToWatchlist, deleteFromWatchlist } from "../controllers/peliculas.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();


//CRUD
//Rutas de auth
router.post("/auth/login", loginUser);
router.post("/auth/register", registerUser);



//Rutas de peliculas
router.get("/populares", getPopulares);
router.get("/tendencia", getTendencia);
router.get("/top", getTopPeliculas);
router.get("/nextMovies", getNextMovies);
router.get("/movieDetail/:tmdbId", getMovieDetails);
router.get("/search/:query", searchMovies);
router.get("/movieActors/:idMovie", getMovieActors);
router.get("/movieVideos/:idMovie", getMovieVideos);
router.get("/checkPorVer/:idMovie", authMiddleware, checkPorVer);


//Rutas para crear listas de peliculas
router.post("/watchlist", authMiddleware,addToWatchlist);
router.delete("/watchlist", authMiddleware, deleteFromWatchlist); // Descomentar si se implementa la eliminación de la lista de seguimiento
router.post("/getWatchlist", authMiddleware, getUserWatchlist);
router.post("/favList", authMiddleware, addToFavList);

// pruebas para traer datos usando nuestro token
router.get("/auth/me", authMiddleware, getCurrentUser);
router.get("/protected", (req, res) => {
    res.json({ message: "Ruta protegida, acceso permitido" });
});



export default router;