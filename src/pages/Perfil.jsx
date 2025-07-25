/* Perfil.jsx 
Hooks: useState, useEffect
Funcionalidad:
  - Perfil de usuario donde se muestra el nombre y las listas, tanto de favoritas como de por ver
  - GET a /api/v1/auth/auth/me
*/

import React, { useState, useEffect } from "react";
import "./perfil.css"; // Importa el CSS para estilos
import { CardPerfil } from "../components/cards/CardPerfil";
import { BtnLogOut } from "../components/buttons/BtnLogOut.jsx";

export const Perfil = () => {
    const [user, setUser] = useState(null);
    const [actionButton, setActionButton] = useState("");
    const BACKEND_API = import.meta.env.VITE_API_URL;

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
                                    <h2>Tu perfil</h2>
                                    <h3>Bienvenido a tu perfil, {user.name}</h3>
                        
                                 <BtnLogOut />
                            </div>
                            <div className="perfil-content">
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
                                </div>
                                <div className="perfil-movies-list">
                             {actionButton === "Más tarde" && (
                                user.watchlist && user.watchlist.length > 0 ? (
                                    user.watchlist.map(p => <CardPerfil key={p.tmdbId} p={p} />)
                                ) : (
                                    <p>No hay películas en la lista de seguimiento.</p>
                                )
                            )}
                            {actionButton === "Tus favoritas" && (
                                user.favList && user.favList.length > 0 ? (
                                    user.favList.map(p => <CardPerfil key={p.tmdbId} p={p} />)
                                ) : (
                                    <p>No hay películas en la lista de favoritos.</p>
                                )
                            )}
                                </div>
                            </div>
                           
                        </>
                    ) : (
                        <p>Cargando perfil...</p>
                    )}
                </div>
        );
    };

export default Perfil;