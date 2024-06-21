const productosCorralon = []


let productos = JSON.parse(localStorage.getItem("productos")) || []

const agregarProducto = (nombre,cantidad) => {
     const producto = {
          id:crypto.randomUUID(),
          nombre,
          cantidad,
     }
     productos.push(producto)
     localStorage.setItem("productos",JSON.stringify(productos))
     return producto
}

const borrarProducto = (id) => {
     productos = productos.filter(producto => producto.id != id)
     localStorage.setItem("productos",JSON.stringify(productos))
}
const crearTarjetaProducto = (producto) => {
     const containerProductos = document.getElementById("containerProductos")
     const tarjeta = document.createElement("div")
     tarjeta.className = "tarjeta"
     tarjeta.id = producto.id
     tarjeta.innerHTML = `
                              <h3>${producto.titulo}</h3>
                              <textarea>${producto.cantidad_stock}</textarea>
                              <p>${producto.ubicacion}</p>
                              <span>${producto.precio}</span>    
     `
     containerProductos.append(tarjeta)
}
const traerProductos = async () => {
     const respuesta = await fetch("./productos.json")
     const productos = await respuesta.json()
     productos.forEach(producto => {
          crearTarjetaProducto(producto)
     })
}

const principal = () =>{

     productos.forEach(producto => {
          crearTarjetaProducto(producto)
     });

     const btnAgregarProducto = document.getElementById("btnAgregarProducto")
     btnAgregarProducto.addEventListener("click",()=>{
          const nombreNuevoProducto = document.getElementById("nombreNuevoProducto")
          const cantidadNuevoProducto = document.getElementById("cantidadNuevoProducto")
          const producto = agregarProducto(nombreNuevoProducto.value ,cantidadNuevoProducto.value)
          crearTarjetaProducto(producto)
          nombreNuevoProducto.value = ""
          cantidadNuevoProducto.value = ""
     })
}

principal()
