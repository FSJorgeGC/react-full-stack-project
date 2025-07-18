import { MdWatchLater } from "react-icons/md";
import PrivateRoute from "../context/PrivateRoute";
import { useAuth } from '../context/AuthContext';
export const BtnPorVer = ({ tmdbId, titulo, poster, anio, overview }) => {
    const BACKEND_API = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api/v1";
    const token = localStorage.getItem("token");
   

    const handleAddToWatchlist = async () => {
        try {
            
            const response = await fetch(`${BACKEND_API}/watchlist`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ tmdbId, titulo, poster, anio, overview}) // Asegúrate de enviar un overview si es necesario,
            });

            console.log(response);
            if(!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error al añadir a la lista de seguimiento");
            }
            const data = await response.json();
            console.log(data.message || "Película añadida a la lista de seguimiento");
            alert("Película añadida a la lista de seguimiento");
        } catch (error) {
            console.error("Error al añadir a la lista de seguimiento:", error.message);
        }
    }
    return (
        <button onClick={handleAddToWatchlist} className="btn-watch-later button">
            <MdWatchLater /> 
</button>
    );
}
