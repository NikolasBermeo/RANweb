import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Importa useHistory
import './Registrarse.css'
const FormularioRegistro = () => {
    const history = useHistory(); // Obtiene la instancia de useHistory
    const [formData, setFormData] = useState({
    Nombres: '',
    Apellidos: '',
    Correo: '',
    NombreUsuario: '',
    Contrasena: '',
    TipoDocumento: '',
    Documento: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envía los datos del formulario al servidor
      const response = await axios.post('http://localhost:3001/registrar', formData);
      console.log(response.data); // Maneja la respuesta del servidor

      // Redirige al usuario a la ruta '/inicio-sesion' después del registro exitoso
      history.push('/inicio-sesion');
    } catch (error) {
      console.error('Error al registrar:', error);
    }
    // Reinicia el estado del formulario
    setFormData({
      Nombres: '',
      Apellidos: '',
      Correo: '',
      NombreUsuario: '',
      Contrasena: '',
      TipoDocumento: '',
      Documento: ''
    });
  };

  return (
    <section className='fondos'>
       <a href="index.php" className="logo">
            <img className="logo" src="../../assets/img/ran__1_-removebg-preview.png" alt="Logo" />
          </a>
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleSubmit} className="formulario">
            <h2 className="titu">Registro</h2>
            <div className="inputboxr">
              <label>Nombres</label>
              <input
                type="text"
                name="Nombres"
                value={formData.Nombres}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inputboxr">
              <label>Apellidos</label>
              <input
                type="text"
                name="Apellidos"
                value={formData.Apellidos}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inputboxr">
              <label>Correo</label>
              <input
                type="email"
                name="Correo"
                value={formData.Correo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inputboxr">
              <label>Usuario</label>
              <input
                type="text"
                name="NombreUsuario"
                value={formData.NombreUsuario}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inputboxr">
              <label>Contraseña</label>
              <input
                type="password"
                name="Contrasena"
                value={formData.Contrasena}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inputboxr">
              <label>Tipo de documento</label>
              <select
                name="TipoDocumento"
                value={formData.TipoDocumento}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione el tipo de documento</option>
                <option value="1">Cédula de Ciudadanía</option>
                <option value="2">Tarjeta de Identidad</option>
              </select>
            </div>
            <div className="inputboxr">
              <label>Documento</label>
              <input
                type="text"
                name="Documento"
                value={formData.Documento}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="titu">
              Crear cuenta
            </button>
            <p className='pr'>
              ¿Ya tiene cuenta? <a className='ar' href="/inicio-sesion">Iniciar sesión</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormularioRegistro;