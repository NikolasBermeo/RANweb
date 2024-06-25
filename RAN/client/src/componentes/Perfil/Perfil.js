import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Perfil.css';
import './CerrarSesion';
import CerrarSesion from './CerrarSesion';

const Perfil = () => {
  const history = useHistory();
  const [usuario, setUsuario] = useState({});
  const [error, setError] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const response = await axios.get('http://localhost:3001/perfil', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        });
        setUsuario(response.data);
      } catch (error) {
        console.error('Error al obtener perfil:', error);
        setError('Error al obtener el perfil del usuario');
        // Si hay un error al obtener el perfil, redirigir al usuario a la página de inicio de sesión
        history.push('/inicio-sesion');
      }
    };

    obtenerPerfil();
  }, [history]);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderBotonesExtra = () => {
    if (usuario.Rol === 2) {
      return (
        <div>
          <button className='btn-perfil' onClick={() => history.push('/crud-usuarios')}>USUARIOS</button>
          <button className='btn-perfil' onClick={() => history.push('/crud-productos')}>PRODUCTOS</button>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}

      <div>
        <header>
          <a href="../index" className="logo">
            <img className="logo" src="../../../assets/img/ran__1_-removebg-preview.png" alt="Logo" />
          </a>
          
          <nav className="head_titu">
            <a href="/index" className="incioh">INICIO</a>
            <a href="#sobreno">ACERCA DE</a>
            <a href="#footer">CONTACTO</a>
            <a href="tienda/tienda1/index.php">PLANTAS</a>
            <a href="/cerrar-sesion">CERRAR SESION</a>
            <div className="usuario-icono" onClick={toggleMenu}>
              {/* Icono de usuario */}
              <img className="icono-usuario" src="../../../assets/img/iconos/user.png" alt="Usuario" />
              {/* Menú desplegable */}
              <div className={`menu-desplegable ${menuVisible ? 'active' : ''}`}>
                {renderBotonesExtra()}
                <button className='btn-perfil' onClick={() => history.push('/actualizar-perfil')}>ACTUALIZAR PERFIL</button>

                <CerrarSesion></CerrarSesion>
              </div>
            </div>
          </nav>
         
          <button id="toggle-nav" className="toggle-nav-btn">☰</button>
          <section className="textos-header">
            <h2>{usuario.NombreUsuario}</h2>
          </section>
        </header>
      </div>
    </div>
  );
};

export default Perfil;
