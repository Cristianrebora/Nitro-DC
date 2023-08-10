
const iconMenu = document.getElementById('icon-menu');
const containerProducts = document.getElementById('container-products');
const modal = document.getElementById('ventanaModal');
const carrito = document.getElementById('carrito');
const showTotal = document.getElementById('total');
const spanClose = document.getElementsByClassName('close')[0];
const containerCart = document.querySelector('.modal-body');
let productosCarrito = [];

renderizarProductos();
cargarEventos();

function cargarEventos() {
    iconMenu.addEventListener('click', showMenu);

    document.addEventListener('DOMContentLoaded', () => {
        productosCarrito = JSON.parse(localStorage.getItem('productosLS')) || [];

        mostrarProductosCarrito();
    });

    containerProducts.addEventListener('click', agregarProducto);

    containerCart.addEventListener('click', eliminarProducto);

    carrito.onclick = function () {
        modal.style.display = 'block';
    };

    spanClose.onclick = function () {
        modal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

function eliminarProducto(e) {
    if (e.target.classList.contains('eliminar-producto')) {
        const productoId = parseInt(e.target.getAttribute('id'));
        // console.log(productoId);

        productosCarrito = productosCarrito.filter((producto) => producto.id !== productoId);
        guardarProductosLocalStorage();
        console.log(productosCarrito);

        mostrarProductosCarrito();
    }
}

function calcularTotal() {
    let total = productosCarrito.reduce((sumaTotal, producto) => sumaTotal + producto.subtotal, 0);
    // console.log(total);

    showTotal.innerHTML = `Total a Pagar: $ ${total}`;
}

function agregarProducto(e) {
    e.preventDefault();
    // console.log(e.target);

    if (e.target.classList.contains('agregar-carrito')) {
        const productoAgregado = e.target.parentElement;
        // console.log(productoAgregado);

        leerDatosProducto(productoAgregado);
    }
}

class Producto {
    constructor(imagen, nombre, precio, id) {
        this.imagen = imagen;
        this.nombre = nombre;
        this.precio = precio;
        this.id = id;
        this.cantidad = 1;
        this.subtotal = 0;
    }

    obtenerTotal() {
        this.subtotal = this.precio * this.cantidad;
    }
}

function leerDatosProducto(producto) {
    
    const datosProducto = new Producto(
        producto.querySelector('img').src,
        producto.querySelector('h4').textContent,
        Number(producto.querySelector('p').textContent.replace('$', '')),
        parseInt(producto.querySelector('a').getAttribute('id'))
    );

    datosProducto.obtenerTotal();
    // console.log(datosProducto);

    agregarAlCarrito(datosProducto);
}

function agregarAlCarrito(productoAgregar) {
    // console.log(productosCarrito);
    const existeEnCarrito = productosCarrito.some((producto) => producto.id === productoAgregar.id);
    // console.log(existeEnCarrito);

    if (existeEnCarrito) {
        // Creamos un nuevo array con los productos del carrito actualizados
        const productos = productosCarrito.map((producto) => {
            if (producto.id === productoAgregar.id) {
                producto.cantidad++;
                producto.subtotal = producto.precio * producto.cantidad;

                // retornamos el objeto producto(cantidad y subtotal actualizados)
                return producto;
            } else {
                // retornamos el producto que estaba en el carrito sin actualizar ya que no coincide con el nuevo producto agregado
                return producto;
            }
        });

        // productosCarrito = [...productos]; // ... Spread Operator será estudiado en próximas clases
        productosCarrito = productos; // reasignamos con el array productos devuelto por el metodo "map"
    } else {
        productosCarrito.push(productoAgregar); // agregamos el nuevo producto ya que no se encontraba dentro de productosCarrito
    }

    guardarProductosLocalStorage();

    console.log(productosCarrito);
    mostrarProductosCarrito();
}

function guardarProductosLocalStorage() {
    localStorage.setItem('productosLS', JSON.stringify(productosCarrito));
}

function mostrarProductosCarrito() {
    limpiarHTML();

    productosCarrito.forEach((producto) => {
        const { imagen, nombre, precio, cantidad, subtotal, id } = producto;

        const div = document.createElement('div');
        div.classList.add('contenedor-producto');
        div.innerHTML = `
			<img src="${imagen}" width="100">
			<P>${nombre}</P>
			<P>$${precio}</P>
			<P>${cantidad}</P>
			<P>$${subtotal}</P>
			<a href="#" class="eliminar-producto" id="${id}"> X </a>
		`;

        containerCart.appendChild(div);
    });

    calcularTotal();
}

function limpiarHTML() {
    while (containerCart.firstChild) {
        containerCart.removeChild(containerCart.firstChild);
    }
}

function showMenu() {
    let navbar = document.getElementById('myTopnav');

    if (navbar.className === 'topnav') {
        navbar.className += ' responsive';
    } else {
        navbar.className = 'topnav';
    }
}

function renderizarProductos() {
    productos.forEach((producto) => {
        const divCard = document.createElement('div');
        divCard.classList.add('card');
        divCard.innerHTML += `
			<img src=./img/${producto.img} alt=${producto.nombre} />
			<h4>${producto.nombre}</h4>
			<p>$${producto.precio}</p>
			<a id=${producto.id} class="boton agregar-carrito" href="#">Agregar</a>
        `;

        containerProducts.appendChild(divCard);
    });
}
function showLoginPopup() {
    const loginPopup = document.getElementById("loginPopup");
    loginPopup.style.display = "block";
   }
  
  /**
   * Popup para logearse
   */
  
  function mostrarPopup() {
      var overlay = document.createElement('div');
      overlay.classList.add('overlay');
  
      var popup = document.createElement('div');
      popup.classList.add('popup');
  
      var usernameLabel = document.createElement('label');
      usernameLabel.textContent = "Nombre de usuario: ";
      var usernameInput = document.createElement('input');
      usernameInput.type = 'text';
  
      var passwordLabel = document.createElement('label');
      passwordLabel.textContent = "Contraseña: ";
      var passwordInput = document.createElement('input');
      passwordInput.type = 'password';
  
      var submitButton = document.createElement('button');
      submitButton.textContent = "Iniciar sesión";
      submitButton.addEventListener('click', function() {
        var username = usernameInput.value;
        var password = passwordInput.value;
  
  
        if (username === "" && password === "") {
          alert("Inicio de sesión exitoso");
        } else {
          alert("Credenciales inválidas"); 
        }
  
        overlay.remove();
      });
  
      popup.appendChild(usernameLabel);
      popup.appendChild(usernameInput);
      popup.appendChild(document.createElement('br'));
      popup.appendChild(passwordLabel);
      popup.appendChild(passwordInput);
      popup.appendChild(document.createElement('br'));
      popup.appendChild(submitButton);
  
      overlay.appendChild(popup);
  
      document.body.appendChild(overlay);
    }
  
  
  
  //  Función para ocultar el pop-up de inicio de sesión
   function hideLoginPopup() {
     const loginPopup = document.getElementById("loginPopup");
     loginPopup.style.display = "none";
   }
  
  //  Función para mostrar el pop-up de crear cuenta
   function showCreateAccountPopup() {
     const createAccountPopup = document.getElementById("createAccountPopup");
     createAccountPopup.style.display = "block";
   }
  
   // Función para ocultar el pop-up de crear cuenta
   function hideCreateAccountPopup() {
    const createAccountPopup = document.getElementById("createAccountPopup");
     createAccountPopup.style.display = "none";
   }
   function openPopup() {
     document.getElementById("popup").style.display = "block";
   }
  
   // Función para el inicio de sesión
  function login(event) {
     event.preventDefault(); // Evitar que el formulario se envíe automáticamente
  
     // Obtener los valores de los campos de entrada
    let username = document.getElementById("username").value;
   let password = document.getElementById("password").value;
  
     // Validar los datos de inicio de sesión 
     if (username === "usuario" && password === "contraseña") {
       alert ("Inicio de sesión exitoso");
      hideLoginPopup();
  
    } else {
      alert ("Nombre de usuario o contraseña incorrectos");
      // Mostrar un mensaje de error 
     }
   }
   function closePopup() {
     document.getElementById("Popup").style.display = "none";
   }
  
   // Asignar la función al botón de inicio de sesión
  var loginBtn = document.getElementById("loginBtn");
   loginBtn.addEventListener("click", showLoginPopup);
  
  // Asignar la función al botón de crear cuenta
  var createAccountBtn = document.getElementById("createAccountBtn");
   createAccountBtn.addEventListener("click", showCreateAccountPopup);
  
   function closePopup() {
    document.getElementByclass("close").style.display = "none";
   }
   const users = {};
   function createAccountBtn() {
    const username = prompt("Ingrese un nombre de usuario:");
     const password = prompt("Ingrese una contraseña:");
  
     if (username && password) {
       if (users[usuario]) {
      alert("El nombre de usuario ya existe. Por favor, elija otro.");
      } else {
        users[usuarioNuevo] = { password: contraseñaNueva };
         alert("Cuenta creada exitosamente");
       }
     } else {
       alert("Debe proporcionar un nombre de usuario y una contraseña válida.");
     }
   }
  
   var loginBtn = document.getElementById("loginBtn");
   loginBtn.addEventListener("click", showLoginPopup);
  
  // Asignar la función de inicio de sesión al formulario dentro del pop-up de inicio de sesión
   var loginForm = document.querySelector("#loginPopup form");
   loginForm.addEventListener("submit", login);
    function closePopup() {
    document.getElementByclass("close").style.display = "none";}