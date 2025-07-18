import React from "react";
import { FaHeart } from "react-icons/fa";

export const BtnFav = ({ tmdbId, titulo, poster, anio, overview }) => {
    async function btnFav() {
        try {
            const res = await fetch("/api/favList", {
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
