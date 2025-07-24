import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import indexRoutes from "./routes/index.routes.js";

dotenv.config();

const app = express();

// Lista blanca de dominios permitidos (desarrollo y producción)
const whitelist = [
  "http://localhost:5173",
  "https://movieinweb.netlify.app"
];

// Configuración de CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(`❌ Bloqueado por CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


// Middleware para parsear JSON
app.use(express.json());

// Rutas de la API
app.use("/api/v1", indexRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Mongo conectado"))
  .catch(err => console.error("❌ Error Mongo:", err));

// Levantar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend en http://localhost:${PORT}`));
