import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import './botones.css'; 


export const BtnLogOut = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="btn-logout-container">
        <button onClick={handleLogout} >
            Cerrar Sesión
        </button>
    </div>
    
  );
};