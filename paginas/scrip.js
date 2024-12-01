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

