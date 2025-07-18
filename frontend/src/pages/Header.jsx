import { Link } from 'react-router-dom';
import './header.css'; // Assuming you have a CSS file for styling

export const Header = () => {
    return (
        <header>
            <img></img>
            <div className='header-links'>
                <Link to="/inicio">Inicio</Link>
                <Link to="/perfil">Perfil</Link>
                <Link to="/login">Login</Link>
                <Link to="/registro">Registro</Link>
            </div>
        </header>
    );
}
