import mongoose from "mongoose";

const options = {
    collection: 'authusers', // Nombre de la colección en MongoDB
    strict: true,            // Solo permite campos definidos en el esquema
    collation: {            // Configurar idioma español y nivel de comparación de Strings
        locale: 'es',
        strength: 1
    }
}


const usuarioSchema = new mongoose.Schema({
    nombre: String,
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    watchlist: [{
        tmdbId: Number,
        titulo: String,
        poster: String,
        anio: String,
        overview: String
    }], 
    favList: [{
        tmdbId: Number,
        titulo: String,
        poster: String,
        anio: String,
        overview: String
    }],
}, options);

export default mongoose.model("Usuario", usuarioSchema, "authusers"); // Nombre del modelo, esquema y colección