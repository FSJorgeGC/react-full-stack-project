/* Buscador.jsx
    - Componente de buscador de películas
    - Permite buscar películas por género o por nombre
*/

import React, { useState, useEffect } from 'react';
import ListaComponentBusqueda from '../components/listas/ListaComponentBusqueda';
import './buscador.css'; 

export const Buscador = () => {
    const VITE_API_URL = import.meta.env.VITE_API_URL;
    const TMDB_API_KEY = import.meta.env.TMDB_API_KEY;
    const [generos, setGeneros] = useState([]);
    const [moviesByGenre, setMoviesByGenre] = useState([]);
    const [searchMovie, setSearchMovie] = useState([]);
    const [activeGenre, setActiveGenre] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getGeneros();
    }, []);

    const getGeneros = async () => {
        try {
            const response = await fetch(`${VITE_API_URL}/movieGenres?api_key=${TMDB_API_KEY}&language=es-ES`);
            if (!response.ok) {
                throw new Error('Error al obtener géneros de películas');
            }
            const data = await response.json();
            setGeneros(data.genres || data); 
        } catch (error) {
            console.error('Error:', error);
            setGeneros([]);
        }
    }

    async function handleGeneroClick(generoId) {
        setActiveGenre(generoId);
        try {
            console.log('ID del género seleccionado:', generoId);
            const response = await fetch(`${VITE_API_URL}/moviesByGenre/${generoId}`);
            console.log('Respuesta de películas por género:', response);
            if (!response.ok) {
                throw new Error('Error al obtener películas por género');
            }
            const data = await response.json();
            setMoviesByGenre(data.results || data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${VITE_API_URL}/search/${searchQuery}`);
            if (!response.ok) {
                throw new Error("Error al buscar películas");
            }
            const data = await response.json();
            setSearchMovie(data);
        } catch (error) {
            alert("Error al buscar películas. Por favor, inténtalo de nuevo más tarde.");
        }
  };


    return (
        <>
        <h2>Buscador</h2>
          <form className="buscador-form" onSubmit={handleSearch}>
            <h3>Busca aquí tu película para hoy</h3>
            <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar películas..."
            />
        </form>
        {generos.length > 0 && (
        <>
            {/* Para pantallas pequeñas */}
                <div className="genero-select-container">
                <select
                    value={activeGenre || ''}
                    onChange={(e) => handleGeneroClick(parseInt(e.target.value))}
                >
                    <option value="" disabled>Selecciona un género</option>
                    {generos.map(genero => (
                    <option key={genero.id} value={genero.id}>{genero.name}</option>
                    ))}
                </select>
                </div>

                {/* Para pantallas normales */}
                <div className='buttons-generos-container'>
                {generos.map(genero => (
                    <div key={genero.id}>
                    <button
                        className={activeGenre === genero.id ? 'active' : ''}
                        onClick={() => handleGeneroClick(genero.id)}
                    >
                        {genero.name}
                    </button>
                    </div>
                ))}
                </div>
            </>
            )}

        <div>
            <ListaComponentBusqueda peliculasGenero={moviesByGenre} peliculasBusqueda={searchMovie} />
        </div>

        
        </>
    );


}
