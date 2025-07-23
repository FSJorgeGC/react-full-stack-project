import { Link } from 'react-router-dom';
import './header.css'; // Assuming you have a CSS file for styling
import Logo from '../assets/LOGO.svg'; // Adjust the path as necessary
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx'; // Import your AuthContext

export const Header = () => {
    const { isLoggedIn } = useContext(AuthContext); // Assuming you have an AuthContext to check login status

    return (
        <header>
            <Link to="/"><img src={Logo} alt="Logo" className="logo" style={{ width: '250px', height: 'auto' }}/></Link>
            <div className='header-links'>
                <Link to="/inicio">Inicio</Link>
                {isLoggedIn && <Link to="/perfil">Perfil</Link>}
                <Link to="/login">Login</Link>
                <Link to="/registro">Registro</Link>
                <Link to="/buscador">Buscador</Link>
            </div>
        </header>
    );
}
