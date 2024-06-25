import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import InicioSesion from './componentes/InicioSesion/InicioSesion.js';
import Perfil from './componentes/Perfil/Perfil.js';
import CRUDUsuarios from './componentes/CRUDS/CRUDUsuarios/CrudUsuarios.js';
import CRUDProductos from './componentes/CRUDS/CRUDProductos/CrudProductos.js';
import Registro from './componentes/Registrarse/Registrarse.js';
import Index from './componentes/Index/Index.js'
import ActualizarPerfil from './componentes/Perfil/ActualizarPerfil.js';
import CerrarSesion from './componentes/Perfil/CerrarSesion.js';
import Tienda from './componentes/Tienda/Tienda.js';
import Pagar from './componentes/Tienda/Pagar.js';
import { useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);

  const updateStockAfterPayment = (cartItems) => {
    setCart([]);
    // Aquí puedes actualizar el stock del servidor si es necesario
  };

  return (
    <Router>
      <Switch>
        <Route path="/inicio-sesion" component={InicioSesion} />
        <Route path="/perfil" component={Perfil} />
        <Route path="/crud-usuarios" component={CRUDUsuarios} />
        <Route path="/crud-productos" component={CRUDProductos} />
        <Route path="/actualizar-perfil" component={ActualizarPerfil} />
        <Route path="/registrarse" component={Registro} />
        <Route path="/cerrar-sesion" component={CerrarSesion} />
        <Route path="/tienda">
          <Tienda cart={cart} setCart={setCart} />
        </Route>
        <Route path="/pagar">
          <Pagar cart={cart} updateStockAfterPayment={updateStockAfterPayment} />
        </Route>
        <Route path="/" component={Index} />
      </Switch>
    </Router>
  );
}

export default App;
