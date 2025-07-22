/* ------------------ Registro.jsx ------------------
Hooks: useState, useNavigate
Funcionalidad:
  - Formulario de registro de usuario
  - POST a /api/v1/auth/register
  - Redirección a /login tras éxito
---------------------------------------------------- */



import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Registro = () => {
    const BACKEND_API = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api/v1";
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`${BACKEND_API}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    name,
                    password,
                }),
            });
            const result = await response.json();
            if (!response.ok) {
              alert(result.msg);
                throw new Error(result?.msg || "Error al registrar usuario");
            }
            alert("Usuario registrado exitosamente");
            navigate("/login");
        } catch (error) {
            console.error(error);
            alert("Error al registrar usuario");
        }
    }
  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="name">Nombre:</label>
            <input type="text" id="name" name="name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Registrar</button>
        <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a></p>
      </form>
    </div>
  );
}