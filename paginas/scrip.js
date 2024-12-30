<<<<<<< HEAD
// Verificar si localStorage está habilitado
if (typeof(Storage) !== "undefined") {
    console.log("localStorage está habilitado");
} else {
    console.log("localStorage no está disponible");
}

// Detectar la ruta base según el archivo actual
const rutaBase = window.location.pathname.includes('index.html') ? './' :
                 window.location.pathname.includes('carrito.html') ? '../' :
                 '../'; // Para panes.html y otros dentro de "paginas/"

const productosLocales = [
    {
        id: "1",
        nombre: "Cerro Azul Pan de Molde Sin TACC",
        precio: 5000,
        imagen: `${rutaBase}imagenes/cerro-azul-pan-de-molde-sin-tacc-x-450-grs.jpg`,
        descripcion: "Delicioso pan sin gluten perfecto para todos tus desayunos.",
        oferta: 25,
        categoria: "panes"
    },
    {
        id: "2",
        nombre: "Fideos Penne Rigate Libre de Gluten",
        precio: 3500,
        imagen: `${rutaBase}imagenes/penne_rigati.png`,
        descripcion: "Pasta 100% libre de gluten para tus comidas favoritas.",
        oferta: 35,
        categoria: "pastas"
    },
    {
        id: "3",
        nombre: "Crackers Clásicas SMAMS",
        precio: 2000,
        imagen: `${rutaBase}imagenes/cracker-clasicas-smams-celinda1-2169fb9d4d46ccba1216957705700661-640-0.webp`,
        descripcion: "Galletas crujientes y sabrosas, libres de gluten.",
        oferta: 15,
        categoria: "galletas"
    },
    {
        id: "4",
        nombre: "Barritas de Cereal Sin Gluten Pony",
        precio: 750,
        imagen: `${rutaBase}imagenes/Barritas de Cereal Sin tacc.jpeg`,
        descripcion: "Energía y sabor en cada bocado.",
        oferta: 10,
        categoria: "snacks"
    },
    {
        id: "5",
        nombre: "Chips de Batata",
        precio: 3500,
        imagen: `${rutaBase}imagenes/Alwa_Chips_de_Batatas_Rústicas_100__Naturales_Sin_TACC,_80_g.webp`,
        descripcion: "Crocantes y saludables, ideales para picar.",
        oferta: 15,
        categoria: "snacks"
    },
    {
        id: "6",
        nombre: "Galletas pepas Delicel",
        precio: 3500,
        imagen: `${rutaBase}imagenes/pepas-delicel.webp`,
        descripcion: "Ideales para acompañar tus desayunos o meriendas.",
        oferta: 45,
        categoria: "galletas"
    },
    {
        id: "7",
        nombre: "Cookies de Chocolate Delicel",
        precio: 3200,
        imagen: `${rutaBase}imagenes/cookies-chocolate.webp`,
        descripcion: "Galletas dulces con trozos de chocolate, libres de gluten.",
        oferta: 45,
        categoria: "galletas"
    },
    {
        id: "8",
        nombre: "Fideos Spaghetti Blue Patna",
        precio: 7000,
        imagen: `${rutaBase}imagenes/spaghettis-blue-patna-fideos-celinda-alimentos-500-g-sin-tac.jpg`,
        descripcion: "La clásica pasta ahora sin gluten.",
        oferta: 35,
        categoria: "pastas"
    },
    {
        id: "9",
        nombre: "Pan de Molde Schar",
        precio: 6735,
        imagen: `${rutaBase}imagenes/7898954933467_02.webp`,
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
    return esUrlCompleta ? imagen : `${rutaBase}${imagen}`;
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

// Mostrar productos en la tienda (index.html y categorías específicas)
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
                    </div>
                </div>
            </div>
        `;
        contenedor.innerHTML += card;
    });

    // Agregar el evento para los botones de "Comprar"
    document.querySelectorAll(".comprar").forEach(boton => {
        boton.addEventListener("click", agregarProducto);
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

// Cargar productos desde la API de Open Food Facts
async function cargarProductosDesdeAPI() {
    const url = "https://world.openfoodfacts.org/cgi/search.pl?search_terms=&search_simple=1&json=1&action=process&page_size=10";
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Procesar los productos obtenidos de la API
        const productos = data.products.map(producto => {
            // Verificar si ya se ha guardado un precio para el producto en localStorage
            let precio = localStorage.getItem(producto.code); // Usamos el 'code' del producto como clave

            if (!precio) {
                // Si no existe, asignamos un precio aleatorio y lo guardamos en localStorage
                precio = generarPrecioAleatorio();
                localStorage.setItem(producto.code, precio);
            } else {
                // Si ya existe, usamos el precio almacenado
                precio = parseFloat(precio);
            }

            return {
                id: producto.code, // Use el 'code' del producto como ID
                nombre: producto.product_name, // Nombre del producto
                precio: precio, // Precio aleatorio fijado
                imagen: producto.image_url || 'default_image.jpg', // Si no hay imagen, se usa una predeterminada
                descripcion: producto.ingredients_text || 'Sin descripción', // Descripción del producto
                oferta: 0 // Ofertas de producto
            };
        });

        // Mostrar los productos combinados (locales y API)
        mostrarProductos([...productosLocales, ...productos]); // Combina productos locales y de la API
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




=======
let carrito = [];

// Escuchar clicks en los botones "Comprar"
document.addEventListener("DOMContentLoaded", () => {
    const botonesComprar = document.querySelectorAll(".comprar");
    botonesComprar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
});

// Función para agregar un producto al carrito
function agregarAlCarrito(event) {
    const button = event.target;
    const producto = {
        id: button.getAttribute("data-id"),
        nombre: button.getAttribute("data-nombre"),
        precio: parseFloat(button.getAttribute("data-precio")),
        imagen: button.getAttribute("data-imagen"),
        cantidad: 1,
    };

    // Verificar si el producto ya está en el carrito
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push(producto);
    }

    // Guardar el carrito en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Redirigir al carrito
    window.location.href = "./paginas/carrito.html";
}

>>>>>>> 4ea12779258df5431a2840582c7ddc38abd3aec1
