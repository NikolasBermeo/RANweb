// InicioSesion.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './InicioSesion.css'; // Importa el archivo CSS

const InicioSesion = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    NombreUsuario: '',
    Contrasena: ''
  });

  // Verificar si el usuario ya ha iniciado sesión al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      history.push('/perfil'); // Redirigir al perfil si ya ha iniciado sesión
    }
  }, [history]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/iniciar-sesion', formData);
      localStorage.setItem('token', response.data.token); // Almacena el token en localStorage
      history.push('/perfil');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Datos incorrectos, intente nuevamente');
    }
  };

  return (
    <section className='fondos'>
      <a href="index.php" className="logo">
        <img className="logo" src="../../assets/img/ran__1_-removebg-preview.png" alt="Logo" />
      </a>
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleSubmit} className="formulario">
            <h2 className="titu">Inicio de Sesión</h2>
            <div className="inputbox">
              <label className={formData.NombreUsuario ? 'active' : ''}>Usuario</label>
              <input
                type="text"
                name="NombreUsuario"
                value={formData.NombreUsuario}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inputbox">
              <label className={formData.Contrasena ? 'active' : ''}>Contraseña</label>
              <input
                type="password"
                name="Contrasena"
                value={formData.Contrasena}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="titu">
              Iniciar Sesión
            </button>
            <p className='pr'>
              ¿No tiene cuenta? <a className='ar' href="/registrarse">Registrarse</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default InicioSesion;
