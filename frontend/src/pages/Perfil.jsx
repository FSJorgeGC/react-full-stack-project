/* ------------------ Perfil.jsx ------------------
Hooks: useState, useEffect
Funcionalidad:
  - Perfil de usuario donde se muestra el nombre y las listas, tanto de favoritas como de por ver
  - GET a /api/v1/auth/auth/me
  - Redirección a /login tras éxito
---------------------------------------------------- */

import { useEffect } from "react";
import { useState } from "react";
import "./perfil.css"; // Importa el CSS para estilos
import { CardPerfil } from "../components/cards/CardPerfil";



export const Perfil = () => {
    const [user, setUser] = useState(null);

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
    
    return (
        <div>
            <>
                <div>
                    <h2>Perfil de usuario</h2>
                    <p>{user.email}</p>
                </div>
                <div className="perfil-movies-list">
                    {user.watchlist && user.watchlist.length > 0 ? (
                        user.watchlist.map(p => 
                            <CardPerfil key={p.tmdbId} p={p} 
                        />)
                    ) : (
                        <p>No hay películas en la lista de seguimiento.</p>
                    )}
                </div>
            </>
        </div>
        );
}