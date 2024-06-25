const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require('bcrypt'); // https://www.npmjs.com/package/bcrypt npm i bcrypt
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());
// Datos de usuarios simulados

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "rainanectar"
});
// Iniciar y destruir secion
const verificarAutenticacion = (req, res, next) => {
  const token = req.headers.authorization;

  // Verificar si el token está presente y es válido
  if (!token) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  try {
    // Verificar si el token es válido
    const decoded = jwt.verify(token, 'secreto');
    req.user = decoded; // Almacenar la información del usuario decodificada en la solicitud
    next(); // Continuar con la siguiente middleware si el usuario está autenticado
  } catch (error) {
    // Manejar errores de token inválido
    console.error('Error de autenticación:', error);
    return res.status(401).json({ error: 'Token inválido' });
  }
};
// Ruta para iniciar sesión
app.post('/iniciar-sesion', (req, res) => {
  const { NombreUsuario, Contrasena } = req.body;

  // Consulta a la base de datos para verificar las credenciales
  const query = 'SELECT * FROM usuarios WHERE NombreUsuario = ?';
  db.query(query, [NombreUsuario], (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error en el servidor' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: 'Credenciales inválidas' });
      return;
    }

    const usuario = results[0];
    bcrypt.compare(Contrasena, usuario.Contrasena, (err, match) => {
      if (err) {
        console.error('Error al comparar la contraseña:', err);
        res.status(500).json({ error: 'Error en el servidor' });
        return;
      }

      if (!match) {
        res.status(401).json({ error: 'Credenciales inválidas' });
        return;
      }

      // Generar token de sesión
      const token = jwt.sign({ NombreUsuario: usuario.NombreUsuario }, 'secreto', { expiresIn: '1h' });

      // Inicio de sesión exitoso, envía el token como respuesta
      res.status(200).json({ token });
    });
  });
});

// Ruta protegida del perfil
// Ruta protegida del perfil
// En el lado del servidor
app.get('/perfil', verificarAutenticacion, (req, res) => {
  const { NombreUsuario } = req.user; // Obtenemos el nombre de usuario del token decodificado

  // Realizar una consulta a la base de datos para obtener el nombre de usuario y el rol
  const query = 'SELECT NombreUsuario, Rol FROM usuarios WHERE NombreUsuario = ?';
  db.query(query, [NombreUsuario], (error, results) => {
    if (error) {
      console.error('Error al obtener perfil del usuario:', error);
      res.status(500).json({ error: 'Error en el servidor' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    const { NombreUsuario, Rol } = results[0];
    res.status(200).json({ NombreUsuario, Rol });
  });
});


// Ruta para cerrar sesión
app.post('/cerrar-sesion', (req, res) => {
  // Aquí puedes invalidar el token de sesión
  // Eliminar el token del cliente también sería una buena práctica
  res.status(200).json({ mensaje: 'Sesión cerrada exitosamente' });
});

 //registrar
 app.post('/registrar', async (req, res) => {
    const {
      Nombres,
      Apellidos,
      Correo,
      NombreUsuario,
      Contrasena,
      TipoDocumento,
      Documento
    } = req.body;
  
    try {
      // Encriptar la contraseña
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(Contrasena, saltRounds);
  
      // Insertar los datos del usuario en la tabla 'usuarios'
      const query = 'INSERT INTO usuarios (Nombres, Apellidos, Correo, NombreUsuario, Contrasena, TipoDocumento, Documento, Rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      const values = [Nombres, Apellidos, Correo, NombreUsuario, hashedPassword, TipoDocumento, Documento, 1];
  
      db.query(query, values, (error, results) => {
        if (error) {
          console.error('Error al insertar datos:', error);
          res.status(500).json({ error: 'Error al registrar el usuario' });
        } else {
          res.status(200).json({ mensaje: 'Registro exitoso' });
        }
      });
    } catch (error) {
      console.error('Error al encriptar la contraseña:', error);
      res.status(500).json({ error: 'Error al registrar el usuario' });
    }
  });
  //Enpoints tienda
  app.get('/api/products', (req, res) => {
    let sql = 'SELECT * FROM productos';
    const category = req.query.category;
    if (category) {
      sql += ` WHERE CategoriaID = ${category}`;
    }
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error al obtener los productos' });
        throw err;
      }
      res.json(result);
    });
  });
  
 // Endpoint para obtener una imagen por ID
app.get('/api/productImage/:id', (req, res) => {
  const productId = req.params.id;
  const sql = 'SELECT Imagen FROM productos WHERE ProductoID = ?';
  db.query(sql, [productId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener la imagen del producto' });
      throw err;
    }
    if (result.length > 0) {
      const image = result[0].Imagen; // BLOB de la imagen
      res.set('Content-Type', 'image/jpeg'); // Establecer el tipo de contenido de la respuesta
      res.send(image); // Enviar la imagen como respuesta
    } else {
      res.status(404).json({ error: 'Imagen no encontrada' });
    }
  });
});

  //Enpoints crud usuarios
app.post("/create", (req, res) => {
    const Nombres = req.body.Nombres;
    const Apellidos = req.body.Apellidos;
    const Correo = req.body.Correo;
    const NombreUsuario = req.body.NombreUsuario;
    const Contrasena = req.body.Contrasena;
    const TipoDocumento = req.body.TipoDocumento;
    const Documento = req.body.Documento;
    const Rol = req.body.Rol;

    // Utiliza bcrypt para hashear la contraseña
    bcrypt.hash(Contrasena, 10, (err, hash) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error interno del servidor");
            return;
        }

        db.query('INSERT INTO usuarios(Nombres,Apellidos,Correo,NombreUsuario,Contrasena,TipoDocumento,Documento,Rol) VALUES(?,?,?,?,?,?,?,?)', [Nombres, Apellidos, Correo, NombreUsuario, hash, TipoDocumento, Documento, Rol],
            (err,result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error interno del servidor");
                } else {
                    res.send(result);
                }
            }
        );
    });
});

app.get("/usuarios", (req, res) => {
        db.query('SELECT * FROM usuarios',
            (err,result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(result);
                }
            }
        );
    });
    app.put("/update", (req, res) => {
        const UsuarioID = req.body.UsuarioID;
        const Nombres = req.body.Nombres;
        const Apellidos = req.body.Apellidos;
        const Correo = req.body.Correo;
        const NombreUsuario = req.body.NombreUsuario;
        const Contrasena = req.body.Contrasena;
        const TipoDocumento = req.body.TipoDocumento;
        const Documento = req.body.Documento;
        const Rol = req.body.Rol;
    
        db.query( 'UPDATE usuarios SET Nombres=?, Apellidos=?, Correo=?, NombreUsuario=?, Contrasena=?, TipoDocumento=?, Documento=?, Rol=? WHERE UsuarioID=?',[Nombres, Apellidos, Correo, NombreUsuario, Contrasena, TipoDocumento, Documento, Rol, UsuarioID],
            (err,result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send("Error interno del servidor");
                } else {
                    res.send(result);
                }
            }
        );
    });
    
    app.delete("/delete/:UsuarioID", (req, res) => {
        const UsuarioID = req.params.UsuarioID;
    
        db.query( 'DELETE FROM usuarios WHERE UsuarioID=?',UsuarioID,
            (err,result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send("Error interno del servidor");
                } else {
                    res.send(result);
                }
            }
        );
    });
    
//Enpoints cruds productos

app.post("/productos/create", (req, res) => {
  const { NombreProducto, Descripcion, Precio, Imagen, Stock, CategoriaID } = req.body;

  db.query('INSERT INTO productos (NombreProducto, Descripcion, Precio, Imagen, Stock, CategoriaID) VALUES (?, ?, ?, ?, ?, ?)',
    [NombreProducto, Descripcion, Precio, Imagen, Stock, CategoriaID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error interno del servidor");
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/productos", (req, res) => {
  db.query('SELECT * FROM productos', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener los productos' });
    } else {
      res.json(result);
    }
  });
});

app.put("/productos/update", (req, res) => {
  const { ProductoID, NombreProducto, Descripcion, Precio, Imagen, Stock, CategoriaID } = req.body;

  db.query('UPDATE productos SET NombreProducto=?, Descripcion=?, Precio=?, Imagen=?, Stock=?, CategoriaID=? WHERE ProductoID=?',
    [NombreProducto, Descripcion, Precio, Imagen, Stock, CategoriaID, ProductoID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error interno del servidor");
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/productos/delete/:ProductoID", (req, res) => {
  const ProductoID = req.params.ProductoID;

  db.query('DELETE FROM productos WHERE ProductoID = ?', ProductoID, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error interno del servidor");
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001");
});
