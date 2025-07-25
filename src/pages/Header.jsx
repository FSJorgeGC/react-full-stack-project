/* Header.jsx
    - Componente de encabezado de la aplicación con enlaces de navegación
    - Incluye un logo y un menú responsive
*/

import { Link } from 'react-router-dom';
import './header.css';
import Logo from '../assets/LOGO.svg';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

export const Header = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header>
            <Link to="/"><img src={Logo} alt="Logo" className="logo" /></Link>

            <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <nav className={`header-links ${menuOpen ? 'show' : ''}`}>
                <Link to="/inicio" onClick={() => setMenuOpen(false)}>Inicio</Link>
                {isLoggedIn && <Link to="/perfil" onClick={() => setMenuOpen(false)}>Perfil</Link>}
                <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/registro" onClick={() => setMenuOpen(false)}>Registro</Link>
                <Link to="/buscador" onClick={() => setMenuOpen(false)}>Buscador</Link>
            </nav>
        </header>
    );
};
    