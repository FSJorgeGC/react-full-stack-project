import React from "react";
import { FaHeart } from "react-icons/fa";

export const BtnFav = ({ tmdbId, titulo, poster, anio, overview }) => {
    const BACKEND_API = import.meta.env.VITE_API_URL;
    async function btnFav() {
        try {
            const res = await fetch(`${BACKEND_API}/favList`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ tmdbId, titulo, poster, anio, overview })
            });
            if (!res.ok) {
                throw new Error("Error al añadir a favoritos");
            }
            const data = await res.json();
            console.log("Película añadida a favoritos:", data);
            alert("Película añadida a tus favoritos");
        } catch (err) {
            console.error("Error al añadir a favoritos:", err);
        }
}


    return (
        <button onClick={btnFav} className="btn-fav button">
            <FaHeart />
        </button>
    );

    
};
