const titulo = document.getElementById('tituloDos')
const h1 = document.createElement('h1')
h1.innerText = "Comprar Online"
titulo.append(h1)

const listaProductos = document.querySelector('#contenedorProducto')
const listaCarrito = document.querySelector('#contenedorCarrito')
const contadorCarrito = document.querySelector('#contador')
const totalCarrito = document.querySelector('#totaldelCarrito')
const vaciar = document.querySelector('#vaciar')

let baseDatos = []

fetch('./stock.json')
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data)
        baseDatos = data

        baseDatos.forEach((item) => {
            const div = document.createElement('div')
            div.classList.add('PRODUCTO')
            div.innerHTML = `
        <img src=${item.img} alt="">
        <h3> ${item.linea}</h3>
        <p>${item.nombre}</p>
        <p class="precioProducto">${item.precio}</p>
        <button onclick="agregarAlCarrito(${item.id})" class="botonAgregar">Agregar</button>
        `
            listaProductos.append(div)
        })

    })

const agregarAlCarrito = (productoId) => {
    const carritoId = carrito.find((producto) => producto.id === productoId)

    if (carritoId) {
        carritoId.cantidad += 1
        showMensaje(carritoId.nombre)
    } else {
        const { id, linea, nombre, precio } = baseDatos.find((producto) => producto.id === productoId)

        const carritoId = {
            id,
            linea,
            nombre,
            precio,
            cantidad: 1
        }
        carrito.push(carritoId)
        showMensaje(nombre)
    }

    localStorage.setItem('carrito', JSON.stringify(carrito))
    console.log(carrito)

    verCarrito()
    verContador()
    verTotal()
}
const showMensaje = (nombre) => {
    Toastify({
        text: 'Se agrego un articulo al carrito',
        duration: 2000,
        gravity: 'bottom',
        className: 'codertoast',
        style: {
            background: "linear-gradient(to left,  #005bb0, #05a1df)",
        }
    }).showToast()

}

const eliminarDelCarrito = (id => {
    const item = carrito.find((PRODUCTO) => PRODUCTO.id === id)
    const eliminado = carrito.indexOf(item)
    carrito.splice(eliminado, 1)

    localStorage.setItem('carrito', JSON.stringify(carrito))

    verCarrito()
    verContador()
    verTotal()

    Toastify({
        text: 'El producto se ha eliminado',
        duration: 1500,
        gravity: 'bottom',
        className: 'codertoast',
        style: {
            background: "linear-gradient(to right,  #9b2424, #dd5555af)",
        },
    }).showToast()
})

const verCarrito = () => {
    listaCarrito.innerHTML = ' '

    carrito.forEach((item) => {
        const div = document.createElement('div')
        div.classList.add('productoEnCarrito')

        div.innerHTML = `
        <h3> ${item.linea}</h3>
        <p>${item.nombre}</p>
        <p>${item.cantidad}</p>
        <p class="precioProducto">${item.precio}</p>
        <button onclick="eliminarDelCarrito(${item.id})" class="botonEliminar"> Eliminar 
            `
        listaCarrito.append(div)
    })
}

const verContador = () => {
    contadorCarrito.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad, 0)
}

const verTotal = () => {
    let total = 0
    carrito.forEach((PRODUCTO) => {
        total += PRODUCTO.precio * PRODUCTO.cantidad
    })
    totalCarrito.innerText = total
}

const carrito = JSON.parse(localStorage.getItem('carrito')) || []
verCarrito()
verContador()
verTotal()

Swal.fire('Bienvenido a tu nuevo colchón')