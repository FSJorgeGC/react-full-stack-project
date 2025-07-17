import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export const authMiddleware = (req, res, next) => {
    console.log("Authorization header:", req.headers.authorization);


    // Verificar si el token está presente en los headers
    const token = req.headers.authorization?.split(" ")[1]; // Asumiendo que el token se envía como "Bearer <token>"
    console.log("Token recibido:", token);
    
    console.log("Token recibido:", token);
    if (!token) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }               
    // Verificar el token
    console.log("Verificando token:", token);
    console.log("SECRET USADO DE VERIFICACION", JWT_SECRET);
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Token inválido" });
        }       
        // Si el token es válido, guardar la información del usuario en req.user
        req.user = {
            id: decoded.userId
        };

        console.log("Usuario autenticado:", req.user);
        next(); // Llamar al siguiente middleware o ruta
    });
}