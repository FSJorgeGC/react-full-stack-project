/* Página de Inicio de Sesión */

import React, { useState, useContext } from "react";
import "./login.css";
import {AuthContext} from "../context/AuthContext.jsx";
import { data } from "react-router-dom";
import { Link } from "react-router-dom";

export const Login = () => {
  const {login} = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      console.log("Datos del formulario:", data);
      await login(data);
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
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            name="name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            name="email"
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
          name="password"
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
