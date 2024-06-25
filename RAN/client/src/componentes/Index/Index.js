import React, { useEffect, useState } from 'react';
import './Index.css';

function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si hay un token JWT en el localStorage para determinar si el usuario está autenticado
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

 

  return (
    <div>
      <header>
        <a href="index.php" className="logo">
          <img className="logo" src="../../assets/img/ran__1_-removebg-preview.png" alt="Logo" />
        </a>
        <nav className="head_titu">
          <a href="http://localhost:3000" className="incioh">INICIO</a>
          <a href="#sobreno">ACERCA DE</a>
          {isLoggedIn ? (
            <>
              <a href='/perfil'>PERFIL</a>
              <a href='/cerrar-sesion'>CERRAR SESIÓN</a>
            </>
          ) : (
            <a href="/inicio-sesion">INICIAR SESIÓN</a>
          )}
          <a href="#portafolio">SERVICIOS</a>
          <a href="#footer">CONTACTO</a>
          <a href="/tienda">PLANTAS</a>
        </nav>
        <button id="toggle-nav" className="toggle-nav-btn">☰</button>
        <section className="textos-header">
          <h1>RAN</h1>
          <h2>R A I N  A N E C T A R</h2>
        </section>
        <div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      </header>

      <main>
        {/* Contenido de la sección "¿QUIENES SOMOS?" */}
        <section className="contenedor sobre-nosotros" id="sobreno"> 
          <h2 className="titulo-index">¿QUIENES SOMOS?</h2>
          <div className="contenedor-sobre-nosotros">
            <img src="../../../assets/img/vectores/orquidea.png" alt="" className="imagen-about-us" />
            <div className="contenido-textos">
              <h3><span>1</span>MISIÓN</h3>
              <p className="parrafo">Crear en las nuevas generaciones una mas cultura ambiental por medio de aplicativos digitales con el fin de recalcar la importancia de la naturaleza.</p>
              <h3><span>2</span>VISIÓN</h3>
              <p className="parrafo">RAN se ve como una de las empresas mas influyentes en la industria de la naturaleza y software llegando a ser una de las empresas mas exitosas en este ámbito.</p>
            </div>
          </div>
        </section>

        {/* Contenido de la sección "PLANTAS" */}
        <section id="portafolio" className="portafolio">
          <div className="contenedor">
            <h2 className="titulo-index">PLANTAS</h2>
            <div className="galeria-port">
              {/* Contenido de la galería de plantas */}
              <div className="imagen-port" id="po1">
                <img src="../../assets/img/plantas/suculentas.jpg" alt="Suculentas"/>
                <div className="hover-galeria" id="im1">
                  <a href="/tienda?category=1">
                    <img className='logo3' src="../../assets/img/iconos/cactus (1).png" alt="Suculentas"/>
                  </a>
                  <p>suculentas</p>
                </div>
              </div>
              <div className="imagen-port" id="po2">
                <img src="../../assets/img/plantas/arreglofloral.jpg" alt="Arreglos"/>
                <div className="hover-galeria"id="im2" >
                  <a href="/tienda?category=2">
                    <img  src="../../assets/img/iconos/flores.png" alt="Arreglos"/>
                  </a>
                  <p>Arreglos</p>
                </div>
              </div>
              <div className="imagen-port" id="po3">
                <img src="../../assets/img/plantas/carnivora.png" alt="Carnivoras"/>
                <div className="hover-galeria" id="im3">
                  <a href="/tienda?category=3">
                    <img  src="../../assets/img/iconos/carne.png" alt="Carnivoras"/>
                  </a>
                  <p>CARNIVORAS</p>
                </div>
              </div>
              <div className="imagen-port" id="po4">
                <img src="../../assets/img/fondos/portada.jpg" alt="Jardin"/>
                <div className="hover-galeria" id="im4">
                  <a href="/tienda?category=4">
                    <img src="../../assets/img/iconos/carne.png" alt="Jardin"/>
                  </a>
                  <p>jardin</p>
                </div>
              </div>
              <div className="imagen-port" id="po5">
                <img src="../../assets/jardinb/interior.jpeg" alt="Interior"/>
                <div className="hover-galeria" id="im5">
                  <a href="/tienda?category=5">
                    <img src="../../assets/img/iconos/monstera.png" alt="Interior"/>
                  </a>
                  <p>interior</p>
                </div>
              </div>
              <div className="imagen-port" id="po6">
                <img src="../../assets/img/plantas/Imagen1.jpg" alt="Orquideas"/>
                <div className="hover-galeria" id="im6">
                  <a href="/tienda?category=6">
                    <img src="../../assets/img/iconos/orquid.png" alt="Orquideas"/>
                  </a>
                  <p>orquidea</p>
                </div>
              </div>  
            </div>
          </div>
        </section>
      </main>

      {/* Pie de página */}
      <footer id="footer">
        <div className="contenedor-footer">
          <div className="content-foo">
            <h4>Correo</h4>
            <p>ranreinanectar@gmail.com</p>
          </div>
          <div className="content-foo">
            <h4>Instagram</h4>
            <a href="https://www.instagram.com/_rannewlife/?igshid=YmMyMTA2M2Y%3D" target="_blank" rel="noreferrer" className="iconoinsta">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
          <div className="content-foo">
            <h4>Facebook</h4>
            <a href="https://web.facebook.com/profile.php?id=100091260855667" target="_blank" rel="noreferrer" className="iconoinsta">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          </div>
        </div>
        <h2 className="titulo-final">&copy; RAN | <br />José Luis Cancelado Castro <br /> Estefany Daniela Martinez Niño<br />Nicolas Andres Bermeo Rodriguez<br />Juan Diego Salcedo García</h2>
      </footer>
    </div>
  );
}

export default Index;
