// backend/db/models/usuario.model.js
import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  contraseña: String
});

export default mongoose.model('Usuario', UsuarioSchema);
