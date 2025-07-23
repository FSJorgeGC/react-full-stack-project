import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

// Función segura para obtener el usuario desde localStorage
const getUser = () => {
  try {
    const user = localStorage.getItem('user');
    if (!user || user === 'undefined') return null;
    return JSON.parse(user);
  } catch (error) {
    console.error('Error al parsear el usuario desde localStorage', error);
    return null;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());
  const BACKEND_API = import.meta.env.VITE_API_LOCAL;
  const isLoggedIn = !user;
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      console.log("Intentando iniciar sesión con:", credentials);

     const response = await fetch(`${BACKEND_API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const result = await response.json(); // <-- Solo una vez

      console.log("Resultado del login:", result);

      if (!response.ok) {
        throw new Error(result.msg || 'Login failed');
      }

      if (!result.data || !result.token) {
        throw new Error('Respuesta inesperada del servidor');
      }

      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.data));
      setUser(result.data);
      navigate('/perfil');


      console.log("Login exitoso:", result);

    } catch (error) {
      console.error('Login error:', error);
      throw error; // re-lanzamos para manejarlo arriba si hace falta
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login'); // opcional
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);
