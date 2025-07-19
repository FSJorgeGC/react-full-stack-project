import React, { useState, useEffect } from 'react';


export const Generos = () => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const [generos, setGeneros] = useState([]);

    useEffect(() => {
        getGeneros();
    }, []);

    const getGeneros = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/movieGenres?api_key=${TMDB_API_KEY}&language=es-ES`);
            if (!response.ok) {
                throw new Error('Error al obtener géneros de películas');
            }
            const data = await response.json();
            setGeneros(data.genres || data); // Ajusta según la estructura de tu respuesta
        } catch (error) {
            console.error('Error:', error);
            setGeneros([]);
        }
    }


    return (
        <div>
            {generos.length > 0 ? (
                <ul>
                    {generos.map(genero => (
                        <li key={genero.id}>{genero.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No se encontraron géneros.</p>
            )}
        </div>
    );


}
