// Verificar si localStorage está habilitado
if (typeof(Storage) !== "undefined") {
    console.log("localStorage está habilitado");
} else {
    console.log("localStorage no está disponible");
}


// Función para generar rutas relativas
function obtenerRutaRelativa(imagen) {
    const baseActual = window.location.pathname.includes('/paginas/') ? '../' : './';
    return `${baseActual}${imagen}`;
}

// Función para rutas absolutas
function obtenerRutaAbsoluta(imagen) {
    return `${window.location.origin}/${imagen}`; // Construye una ruta absoluta basada en el dominio
}

// Ajustar la ruta base para las imágenes dependiendo del entorno de despliegue

const productosLocales = [
    {
        id: "1",
        nombre: "Cerro Azul Pan de Molde Sin TACC",
        precio: 5000,
        imagen: obtenerRutaRelativa("imagenes/cerro-azul-pan-de-molde-sin-tacc-x-450-grs.jpg"),
        descripcion: "Delicioso pan sin gluten perfecto para todos tus desayunos.",
        oferta: 25,
        categoria: "panes"
    },
    {
        id: "2",
        nombre: "Fideos Penne Rigate Libre de Gluten",
        precio: 3500,
        imagen: obtenerRutaRelativa("imagenes/penne_rigati.png"),
        descripcion: "Pasta 100% libre de gluten para tus comidas favoritas.",
        oferta: 35,
        categoria: "pastas"
    },
    {
        id: "3",
        nombre: "Crackers Clásicas SMAMS",
        precio: 2000,
        imagen: obtenerRutaRelativa("imagenes/cracker-clasicas-smams-celinda1-2169fb9d4d46ccba1216957705700661-640-0.webp"),
        descripcion: "Galletas crujientes y sabrosas, libres de gluten.",
        oferta: 15,
        categoria: "galletas"
    },
    {
        id: "4",
        nombre: "Barritas de Cereal Sin Gluten Pony",
        precio: 750,
        imagen: obtenerRutaRelativa("imagenes/Barritas de Cereal Sin tacc.jpeg"),
        descripcion: "Energía y sabor en cada bocado.",
        oferta: 10,
        categoria: "snacks"
    },
    {
        id: "5",
        nombre: "Chips de Batata",
        precio: 3500,
        imagen: obtenerRutaRelativa("imagenes/Alwa_Chips_de_Batatas_Rústicas_100__Naturales_Sin_TACC,_80_g.webp"),
        descripcion: "Crocantes y saludables, ideales para picar.",
        oferta: 15,
        categoria: "snacks"
    },
    {
        id: "6",
        nombre: "Galletas pepas Delicel",
        precio: 3500,
        imagen: obtenerRutaRelativa("imagenes/pepas-delicel.webp"),
        descripcion: "Ideales para acompañar tus desayunos o meriendas.",
        oferta: 45,
        categoria: "galletas"
    },
    {
        id: "7",
        nombre: "Cookies de Chocolate Delicel",
        precio: 3200,
        imagen: obtenerRutaRelativa("imagenes/cookies-chocolate.webp"),
        descripcion: "Galletas dulces con trozos de chocolate, libres de gluten.",
        oferta: 45,
        categoria: "galletas"
    },
    {
        id: "8",
        nombre: "Fideos Spaghetti Blue Patna",
        precio: 7000,
        imagen: obtenerRutaRelativa("imagenes/spaghettis-blue-patna-fideos-celinda-alimentos-500-g-sin-tac.jpg"),
        descripcion: "La clásica pasta ahora sin gluten.",
        oferta: 35,
        categoria: "pastas"
    },
    {
        id: "9",
        nombre: "Pan de Molde Schar",
        precio: 6735,
        imagen: obtenerRutaRelativa("imagenes/7898954933467_02.webp"),
        descripcion: "Pan de molde para sandwich sin tacc",
        oferta: 20,
        categoria: "panes"
    },
];

// Actualizar el contador del carrito
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalProductos = carrito.reduce((sum, producto) => sum + producto.cantidad, 0);
    const contadorCarrito = document.getElementById("carrito-contador");
    if (contadorCarrito) contadorCarrito.textContent = totalProductos;
}

// Agregar un producto al carrito
function agregarProducto(event) {
    const producto = {
        id: event.target.getAttribute("data-id"),
        nombre: event.target.getAttribute("data-nombre"),
        precio: parseFloat(event.target.getAttribute("data-precio")),
        imagen: event.target.getAttribute("data-imagen"),
        cantidad: 1
    };

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const indice = carrito.findIndex(item => item.id === producto.id);

    if (indice !== -1) {
        carrito[indice].cantidad += 1; // Incrementar cantidad si ya existe
    } else {
        carrito.push(producto); // Agregar producto nuevo
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
    actualizarContadorCarrito();
}

// Incrementar cantidad de un producto
function incrementarCantidad(idProducto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const indice = carrito.findIndex(producto => producto.id === idProducto);

    if (indice !== -1) carrito[indice].cantidad += 1;

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
    actualizarContadorCarrito();
}

// Disminuir cantidad de un producto
function disminuirCantidad(idProducto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const indice = carrito.findIndex(producto => producto.id === idProducto);

    if (indice !== -1) {
        carrito[indice].cantidad -= 1;
        if (carrito[indice].cantidad <= 0) carrito.splice(indice, 1);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
    actualizarContadorCarrito();
}

// Eliminar un producto completamente
function eliminarProducto(idProducto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(producto => producto.id !== idProducto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
    actualizarContadorCarrito();
}

// Vaciar carrito
document.addEventListener("DOMContentLoaded", function () {
    const botonVaciar = document.getElementById("vaciar-carrito");
    if (botonVaciar) {
        botonVaciar.addEventListener("click", function () {
            localStorage.removeItem("carrito");
            actualizarCarrito();
            actualizarContadorCarrito();
        });
    }
});



function agregarImagenCarrito(imagen) {
    const esUrlCompleta = imagen.startsWith("http") || imagen.startsWith("https");
    return esUrlCompleta ? imagen : imagen; // compatibilidad
}



// Actualizar la visualización del carrito
function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const listaCarrito = document.getElementById("lista-carrito");
    const totalCompra = document.getElementById("total-compra");

    if (!listaCarrito) return console.error("No se encontró el elemento con id 'lista-carrito'.");

    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

        li.innerHTML = `
            <div>
                <img src="${agregarImagenCarrito(producto.imagen)}" alt="${producto.nombre}" style="width: 50px; height: auto; margin-right: 10px;">
                <strong>${producto.nombre}</strong><br>
                $${producto.precio} x ${producto.cantidad} = $${subtotal.toFixed(2)}
            </div>
            <div>
                <button class="btn btn-sm btn-primary" onclick="incrementarCantidad('${producto.id}')">+</button>
                <button class="btn btn-sm btn-warning" onclick="disminuirCantidad('${producto.id}')">-</button>
                <button class="btn btn-sm btn-danger" onclick="eliminarProducto('${producto.id}')">Eliminar</button>
            </div>
        `;
        listaCarrito.appendChild(li);
    });

    if (totalCompra) totalCompra.textContent = `Total: $${total.toFixed(2)}`;
}
//////////////////////
///nueva parte
//////////////////////
//Mostrar detalles del producto (productos locales o API)
function mostrarDetalleProducto(event) {
    const idProducto = event.target.getAttribute("data-id");
    // Buscar el producto en productos locales y API combinados
    const producto = [...productosLocales, ...productosAPI].find(p => p.id === idProducto);

    if (!producto) return console.error("Producto no encontrado.");

    const modalHTML = `
        <div id="modal-detalle" class="modal fade" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${producto.nombre}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100%; max-width: 300px; margin-bottom: 20px;">
                        <p>${producto.descripcion}</p>
                        <p><strong>Precio: $${producto.precio}</strong></p>
                        ${producto.oferta ? `<p class="text-success">Oferta: ${producto.oferta}% de descuento</p>` : ""}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const modalContenedor = document.createElement("div");
    modalContenedor.innerHTML = modalHTML;
    document.body.appendChild(modalContenedor);

    const modal = new bootstrap.Modal(modalContenedor.querySelector(".modal"));
    modal.show();

    modalContenedor.querySelector(".modal").addEventListener("hidden.bs.modal", () => {
        modalContenedor.remove();
    });
}

// Mostrar productos en la tienda (index.html y categorías )
function mostrarProductos(productos) {
    const contenedor = document.getElementById("productos");
    if (!contenedor) {
        console.warn("El contenedor de productos no está presente en esta página.");
        return;
    }

    const categoria = contenedor.dataset.categoria; // Leer la categoría desde el atributo

    const productosFiltrados = categoria ? productos.filter(p => p.categoria === categoria) : productos;
    contenedor.innerHTML = ""; // Limpiar el contenedor de productos

    contenedor.classList.add("row");

    productosFiltrados.forEach(producto => {
        const precioOferta = producto.oferta 
            ? producto.precio - (producto.precio * producto.oferta) / 100 
            : producto.precio;

        const card = `
            <div class="col-12 col-sm-6 col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${producto.imagen}" class="card-img-top producto-imagen" alt="${producto.nombre}" loading="lazy">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        ${producto.oferta 
                            ? `<p class="card-text text-danger"><strong>Oferta: $${precioOferta.toFixed(2)}</strong></p>
                               <p class="card-text text-muted"><span class="text-decoration-line-through">Precio Original: $${producto.precio}</span></p>` 
                            : `<p class="card-text text-dark"><strong>Precio: $${producto.precio}</strong></p>`}
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-success comprar" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${precioOferta}" data-imagen="${producto.imagen}">Comprar</button>
                        <button class="btn btn-info detalle" data-id="${producto.id}">Ver Detalle</button>
                    </div>
                </div>
            </div>
        `;
        contenedor.innerHTML += card;
    });

    // Agregar el evento para los botones "Comprar"
    document.querySelectorAll(".comprar").forEach(boton => {
        boton.addEventListener("click", agregarProducto);
    });

    // Agregar el evento para los botones "Ver Detalle"
    document.querySelectorAll(".detalle").forEach(boton => {
        boton.addEventListener("click", mostrarDetalleProducto);
    });
}


// Ajustar dinámicamente el tamaño de las imágenes
function ajustarImagen(imagen) {
    const maxWidth = 200; // Ancho máximo
    const maxHeight = 200; // Alto máximo
    if (imagen.naturalWidth > maxWidth || imagen.naturalHeight > maxHeight) {
        imagen.style.width = `${maxWidth}px`;
        imagen.style.height = `${maxHeight}px`;
        imagen.style.objectFit = "contain";
    }
}

// Función para generar un precio aleatorio dentro de un rango

function generarPrecioAleatorio() {
    // Genera un precio entre 500 y 5000 
    return Math.floor(Math.random() * (5000 - 500 + 1)) + 500;
}


// Array para almacenar productos de la API
let productosAPI = [];

// Cargar productos desde la API de Open Food Facts
async function cargarProductosDesdeAPI() {
    const url = "https://world.openfoodfacts.org/cgi/search.pl?search_terms=&search_simple=1&json=1&action=process&page_size=10";
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Procesar los productos obtenidos de la API
        productosAPI = data.products.map(producto => {
            // Verificar si ya se ha guardado un precio para el producto en localStorage
            let precio = localStorage.getItem(producto.code); // Usamos el 'code' del producto como clave

            if (!precio) {
                //  asignamos un precio aleatorio y lo guardamos en localStorage
                precio = generarPrecioAleatorio();
                localStorage.setItem(producto.code, precio);
            } else {
                // Si ya existe, usamos el precio almacenado
                precio = parseFloat(precio);
            }

            return {
                id: producto.code, // Use el 'code' del producto como ID
                nombre: producto.product_name || "Producto sin nombre", // Nombre del producto
                precio: precio, // Precio aleatorio fijado
                imagen: producto.image_url || 'default_image.jpg', //  se usa una predeterminada
                descripcion: producto.ingredients_text || 'Sin descripción disponible', // Descripción del producto
                oferta: 0 // Ofertas de producto
            };
        });

        // Mostrar los productos combinados (locales y API)
        mostrarProductos([...productosLocales, ...productosAPI]);
    } catch (error) {
        console.error("Error al cargar los productos de la API", error);
    }
}

// Inicializar productos al cargar
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("productos")) {
        cargarProductosDesdeAPI(); // Cargar productos desde la API
    }
    if (document.getElementById("lista-carrito")) {
        actualizarCarrito(); // Solo en carrito.html
    }
    actualizarContadorCarrito(); // Siempre actualizar contador
});

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector('form');
    if (formulario) {
        formulario.addEventListener('submit', function (event) {
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;

            if (!nombre || !email || !mensaje) {
                console.log('Por favor, complete todos los campos del formulario.');
                event.preventDefault(); // Evitar el envío si faltan campos
            } else {
                console.log('Formulario enviado correctamente.');
            }
        });
    }
});
