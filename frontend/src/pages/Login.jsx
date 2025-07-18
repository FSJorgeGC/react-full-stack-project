/* Página de Inicio de Sesión */

import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const result = await response.json();

      if (!response.ok || !result?.data?.token) {
        throw new Error(result?.msg || "Credenciales incorrectas");
      }

      const { token, name } = result.data;
      // Si la respuesta es exitosa, guardamos el token y redirigimos
      if (!token) {
        throw new Error("Token no encontrado");
      }

      console.log("Login successful:", result.data);
      localStorage.setItem("token", token);
      alert(`Bienvenido ${email}`);
      navigate("/inicio");
    } catch (error) {
      console.error(error.message);
      alert(error.message || "Login failed");
    }
  };

  return (
    <>
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} className="container mt-5">
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
          className="form-control"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="button-container">
        <button type="submit" >
        Entrar
      </button>
      </div>
      <div >
        <p style={{ margin: "0 auto" }}>¿Aún no tienes una cuenta?<Link to={"/registro"}> Regístrate aquí</Link></p>
      </div>
      
    </form>
    </div>
      
    </>
  );
};
