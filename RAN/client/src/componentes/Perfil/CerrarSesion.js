// CerrarSesion.js

import React from 'react';
import { useHistory } from 'react-router-dom';

const CerrarSesion = () => {
  const history = useHistory();

  // Función para cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem('token'); // Eliminar el token del localStorage
    history.push('/inicio-sesion'); // Redirigir al usuario a la página de inicio de sesión
  };

  return (
    
      <button className='btn-perfil' onClick={cerrarSesion}>CERRAR SESION</button>
    
  );
};

export default CerrarSesion;
