import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import indexRoutes from "./routes/index.routes.js";

dotenv.config();

const app = express();

// Lista de orígenes permitidos
const allowedOrigins = [
  "http://localhost:5173",
  "https://eloquent-starlight-bd56f5.netlify.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir peticiones sin origin (como Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("❌ Not allowed by CORS: " + origin));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use("/api/v1", indexRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Mongo conectado"))
  .catch(err => console.error("❌ Error Mongo:", err));

app.listen(3000, () => console.log("🚀 Backend en http://localhost:3000"));
