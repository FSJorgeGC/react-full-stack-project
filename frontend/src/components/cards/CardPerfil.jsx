import "./cardPerfil.css"; // Importa el CSS para estilos

export const CardPerfil = ({ p }) => {
    
    const BACKEND_API = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api/v1";
    const token = localStorage.getItem("token"); 

    async function handleDelete() {
        console.log("Eliminar de la lista de seguimiento");
        const response = await fetch(`${BACKEND_API}/watchlist`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ tmdbId: p.tmdbId }) 
        }) 
        // Aquí puedes manejar la respuesta de la API si es necesario
        .then(response => {
            if (response.ok) {
                console.log("Película eliminada de la lista de seguimiento");
                window.location.reload(); 
            } else {
                console.error("Error al eliminar la película de la lista de seguimiento");
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });

    }

    return (
        <div className="card-perfil-container">
            <img src={`https://image.tmdb.org/t/p/w500${p.poster}`} alt={`Poster de ${p.titulo}`} />

            <div className="card-perfil-content">
                <h3>{p.titulo}</h3>
                <p>{p.overview}</p>
            </div>
            <button className="card-perfil-delete-button" onClick={handleDelete}>
                X
            </button>
        </div>
    );
}