import { Link } from 'react-router-dom';
import './header.css'; // Assuming you have a CSS file for styling
import Logo from '../assets/LOGO.svg'; // Adjust the path as necessary

export const Header = () => {
    return (
        <header>
            <img src={Logo} alt="Logo" className="logo" style={{ width: '250px', height: 'auto' }}/>
            <div className='header-links'>
                <Link to="/inicio">Inicio</Link>
                <Link to="/perfil">Perfil</Link>
                <Link to="/login">Login</Link>
                <Link to="/registro">Registro</Link>
                <Link to="/generos">Géneros</Link>
            </div>
        </header>
    );
}
