import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

function CRUDProductos() {
  const [ProductoID, setProductoID] = useState("");
  const [NombreProducto, setNombreProducto] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [Precio, setPrecio] = useState("");
  const [Stock, setStock] = useState("");
  const [CategoriaID, setCategoriaID] = useState("");
  const [ImagenFile, setImagenFile] = useState(null);
  const [usuariosLista, setUsuariosLista] = useState([]);
  const [editar, setEditar] = useState(false);

  useEffect(() => {
    getUsuarios();
  }, []);

  const getUsuarios = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/productos");
      setUsuariosLista(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error.message);
    }
  };

  const add = async () => {
    try {
      const formData = new FormData();
      formData.append("Imagen", ImagenFile);
      formData.append("ProductoID", ProductoID);
      formData.append("NombreProducto", NombreProducto);
      formData.append("Descripcion", Descripcion);
      formData.append("Precio", Precio);
      formData.append("Stock", Stock);
      formData.append("CategoriaID", CategoriaID);

      await Axios.post("http://localhost:3001/productos/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      getUsuarios();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registro exitoso</strong>",
        html: "<i>El producto <strong>" + NombreProducto + "</strong> fue registrado</i>",
        icon: "success",
        timer: 3000,
      });
    } catch (error) {
      console.error("Error al registrar producto:", error.message);
      alert("Hubo un error al registrar el producto");
    }
  };

  const deleteProducto = (val) => {
    Swal.fire({
      title: "¿Confirmar eliminación?",
      html: "<i>¿Realmente desea eliminar al producto <strong>" + val.NombreProducto + "</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, eliminar!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Axios.delete(`http://localhost:3001/productos/delete/${val.ProductoID}`);
          getUsuarios();
          limpiarCampos();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: val.NombreProducto + " fue eliminado.",
            showConfirmButton: false,
            timer: 2000,
          });
        } catch (error) {
          console.error("Error al eliminar producto:", error.message);
          alert("Hubo un error al eliminar el producto");
        }
      }
    });
  };

  const limpiarCampos = () => {
    setEditar(false);
    setProductoID("");
    setNombreProducto("");
    setDescripcion("");
    setPrecio("");
    setStock("");
    setCategoriaID("");
    setImagenFile(null);
  };

  const editarProducto = (val) => {
    setEditar(true);
    setProductoID(val.ProductoID);
    setNombreProducto(val.NombreProducto);
    setDescripcion(val.Descripcion);
    setPrecio(val.Precio);
    setStock(val.Stock);
    setCategoriaID(val.CategoriaID);
    // Si necesitas manejar la imagen en la edición, añádela aquí.
  };

  const update = async () => {
    try {
      await Axios.put("http://localhost:3001/productos/update", {
        ProductoID: ProductoID,
        NombreProducto: NombreProducto,
        Descripcion: Descripcion,
        Precio: Precio,
        Stock: Stock,
        CategoriaID: CategoriaID,
        // Si necesitas manejar la imagen en la actualización, añádela aquí.
      });

      getUsuarios();
      Swal.fire({
        title: "<strong>Actualización del producto exitosa</strong>",
        html: "<i>El producto <strong>" + NombreProducto + "</strong> fue actualizado</i>",
        icon: "success",
        timer: 3000
      });
    } catch (error) {
      console.error("Error al actualizar producto:", error.message);
      alert("Hubo un error al actualizar el producto");
    }
  };

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">GESTIÓN DE PRODUCTOS</div>
        <div className="card-body">
        <div className="input-group mb-3">
  <span className="input-group-text">ID de Producto</span>
  <input
    type="text"
    value={ProductoID}
    onChange={(e) => setProductoID(e.target.value)}
    className="form-control"
    disabled={editar}
  />
</div>
<div className="input-group mb-3">
  <span className="input-group-text">Nombre de Producto</span>
  <input
    type="text"
    value={NombreProducto}
    onChange={(e) => setNombreProducto(e.target.value)}
    className="form-control"
  />
</div>
<div className="input-group mb-3">
  <span className="input-group-text">Descripción</span>
  <input
    type="text"
    value={Descripcion}
    onChange={(e) => setDescripcion(e.target.value)}
    className="form-control"
  />
</div>
<div className="input-group mb-3">
  <span className="input-group-text">Precio</span>
  <input
    type="text"
    value={Precio}
    onChange={(e) => setPrecio(e.target.value)}
    className="form-control"
  />
</div>
<div className="input-group mb-3">
  <span className="input-group-text">Stock</span>
  <input
    type="text"
    value={Stock}
    onChange={(e) => setStock(e.target.value)}
    className="form-control"
  />
</div>
<div className="input-group mb-3">
  <span className="input-group-text">Categoría</span>
  <input
    type="text"
    value={CategoriaID}
    onChange={(e) => setCategoriaID(e.target.value)}
    className="form-control"
  />
</div>
<div className="input-group mb-3">
  <span className="input-group-text">Imagen</span>
  <input
    type="file"
    onChange={(e) => setImagenFile(e.target.files[0])}
    className="form-control"
  />
</div>
        </div>
        <div className="card-footer text-muted">
          {editar ?
            <div>
              <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
              <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
            </div> :
            <button className='btn btn-success' onClick={add}>Registrar</button>
          }
        </div>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre Producto</th>
            <th scope="col">Descripción</th>
            <th scope="col">Precio</th>
            <th scope="col">Stock</th>
            <th scope="col">Categoría</th>
            <th scope="col">Imagen</th>
          </tr>
        </thead>
        <tbody>
          {usuariosLista.map((val, key) => (
            <tr key={val.ProductoID}>
              <th scope="row">{key + 1}</th>
              <td>{val.NombreProducto}</td>
              <td>{val.Descripcion}</td>
              <td>{val.Precio}</td>
              <td>{val.Stock}</td>
              <td>{val.CategoriaID}</td>
              <td>
                <img src={`data:image/png;base64,${val.Imagen}`} alt="Imagen de producto" />
              </td>
              <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-info" onClick={() => editarProducto(val)}>Editar</button>
                  <button type="button" className="btn btn-danger" onClick={() => deleteProducto(val)}>Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CRUDProductos;
