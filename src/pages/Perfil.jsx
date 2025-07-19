/* ------------------ Perfil.jsx ------------------
Hooks: useState, useEffect
Funcionalidad:
  - Perfil de usuario donde se muestra el nombre y las listas, tanto de favoritas como de por ver
  - GET a /api/v1/auth/auth/me
---------------------------------------------------- */

import { useEffect } from "react";
import { useState } from "react";
import "./perfil.css"; // Importa el CSS para estilos
import { CardPerfil } from "../components/cards/CardPerfil";



export const Perfil = () => {
    const [user, setUser] = useState(null);
    const [actionButton, setActionButton] = useState("");
    const BACKEND_API = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api/v1";

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            // Obteneer el token del localStorage
            const token = localStorage.getItem("token");
            const response = await fetch(`${BACKEND_API}/auth/me`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Enviar el token en los headers
                }
            });
            if (!response.ok) {
                throw new Error("Error al obtener el usuario");
            }

            const responseData = await response.json();
            console.log("Usuario obtenido:", responseData);
            setUser(responseData.data); // Asumiendo que la respuesta tiene un campo 'data' con la información del usuario

        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };
        function handleActionButtonClick(e) {
        
            setActionButton(e.target.textContent);
        
        }    
        return (
                <div>
                    {/* Render user info or a loading state */}
                    {user ? (
                        <>
                            <div className="perfil-header">
                                <h2>Perfil de usuario</h2>
                                <h3>Bienvenido a tu perfil {user.nombre}</h3>
                            </div>
                            <div className="movie-details-buttons">
                            <button
                                onClick={handleActionButtonClick}
                                className={actionButton === "Tus favoritas" ? "active" : ""}
                            >
                                Tus favoritas
                            </button>
                            <button
                                onClick={handleActionButtonClick}
                                className={actionButton === "Más tarde" ? "active" : ""}
                            >
                                Más tarde
                            </button>
                            {actionButton === "Más tarde" && (
                                <div className="perfil-movies-list">
                                    {user.watchlist && user.watchlist.length > 0 ? (
                                        user.watchlist.map(p => <CardPerfil key={p.tmdbId} p={p} />)
                                    ) : (
                                        <p>No hay películas en la lista de seguimiento.</p>
                                    )}
                                </div>
                            )}
                            {actionButton === "Tus favoritas" && (
                                <div className="perfil-movies-list">
                                    {user.favList && user.favList.length > 0 ? (
                                        user.favList.map(p => <CardPerfil key={p.tmdbId} p={p} />)
                                    ) : (
                                        <p>No hay películas en la lista de favoritos.</p>
                                    )}
                                </div>
                            )}

                        </div>
                        </>
                    ) : (
                        <p>Cargando perfil...</p>
                    )}
                </div>
        );
};