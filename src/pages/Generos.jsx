import React, { useState, useEffect } from 'react';
import ListaComponent from '../components/listas/ListaComponent';


export const Generos = () => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api/v1";
    const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const [generos, setGeneros] = useState([]);
    const [moviesByGenre, setMoviesByGenre] = useState([]);

    useEffect(() => {
        getGeneros();
    }, []);

    const getGeneros = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/movieGenres?api_key=1f7fd3343a16c1fd2f0fe8010820351b&language=es-ES`);
            if (!response.ok) {
                throw new Error('Error al obtener géneros de películas');
            }
            console.log('Respuesta de géneros:', response);
            const data = await response.json();
            setGeneros(data.genres || data); // Ajusta según la estructura de tu respuesta
        } catch (error) {
            console.error('Error:', error);
            setGeneros([]);
        }
    }

    async function handleGeneroClick(generoId) {
        try {
            console.log('ID del género seleccionado:', generoId);
            const response = await fetch(`${BACKEND_URL}/moviesByGenre/${generoId}`);
            console.log('Respuesta de películas por género:', response);
            if (!response.ok) {
                throw new Error('Error al obtener películas por género');
            }
            const data = await response.json();
            console.log('Películas por género:', data);
            setMoviesByGenre(data.results || data); // Ajusta según la estructura de tu respuesta
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BACKEND_URL}/search/${searchQuery}`);
            if (!response.ok) {
                throw new Error("Error al buscar películas");
            }
            const data = await response.json();
            console.log("Resultados de búsqueda:", data);
            setSearchMovie(data);
        } catch (error) {
            console.error("Error al buscar películas:", error);
            alert("Error al buscar películas. Por favor, inténtalo de nuevo más tarde.");
        }
  };


    return (
        <>
          <form onSubmit={handleSearch}>
            <h3>Busca aquí tu película para hoy</h3>
            <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar películas..."
            />
        </form>
        <div>
            {generos.length > 0 ? (
                <ul>
                    {generos.map(genero => (
                        <li key={genero.id}><button onClick={() => handleGeneroClick(genero.id)}>{genero.name}</button></li>
                    ))}
                </ul>
            ) : (
                <p>No se encontraron géneros.</p>
            )}
        </div>
        <div>
            <ListaComponent peliculasBusqueda={moviesByGenre} />
        </div>

        <div>
            <ListaComponenteBusqueda moviesSearch={searchMovie} />
        </div>  
        </>
    );


}
