// variabeles
let saldo = parseInt(localStorage.getItem("saldo")) || 0;
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// DOM
const saldoSpan = document.getElementById("saldo");
const botonesCargar = document.querySelectorAll(".botones button");
const botonesComprar = document.querySelectorAll(".comprar");
const carritoLista = document.getElementById("carrito");
const botonVaciar = document.getElementById("vaciar");

// Función para mostrar saldo
function actualizarSaldo() {
  saldoSpan.textContent = saldo;
}

// Función para agregar producto al carrito en pantalla
function agregarAlCarrito(producto) {
  const li = document.createElement("li");
  li.textContent = `${producto.nombre} - $${producto.precio}`;
  carritoLista.appendChild(li);
}

// Función para guardar el carrito en localStorage
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Inicializar interfaz
actualizarSaldo();
carrito.forEach(producto => agregarAlCarrito(producto));

// Cargar dinero
botonesCargar.forEach(boton => {
  boton.addEventListener("click", () => {
    const monto = parseInt(boton.dataset.monto);
    saldo += monto;
    actualizarSaldo();
    localStorage.setItem("saldo", saldo);
  });
});

// Comprar producto
botonesComprar.forEach(boton => {
  boton.addEventListener("click", () => {
    const precio = parseInt(boton.dataset.precio);
    const nombre = boton.dataset.nombre;

    if (saldo >= precio) {
      saldo -= precio;
      actualizarSaldo();
      localStorage.setItem("saldo", saldo);

      const producto = { nombre, precio };
      carrito.push(producto);
      guardarCarrito();
      agregarAlCarrito(producto);
    } else {
      alert("No tenés saldo suficiente para comprar esto.");
    }
  });
});

// Vaciar carrito
botonVaciar.addEventListener("click", () => {
  carrito = [];
  localStorage.removeItem("carrito");
  carritoLista.innerHTML = "";
});
