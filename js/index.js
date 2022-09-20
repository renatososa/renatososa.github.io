document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    
});

function login(){
    if(localStorage.getItem("sesion") === '1'){
    localStorage.setItem("sesion", 0);
    window.location = "index.html";
    }
    else{
        window.location = "login.html";
    }
}

const email = localStorage.getItem("email");
const sesion = localStorage.getItem("sesion");
const nombre = localStorage.getItem("name");
const login_menu = document.getElementById("login_menu");
if(sesion==='1'){
    const menu = 
    `<li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    ` + nombre + `
    </a>
    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
      <li><a class="dropdown-item" href=""my-profile.html">Mi carrito</a></li>
      <li><a class="dropdown-item" href=""my-profile.html">Mi perfil</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item cursor-active" id="login" onclick="login()">Salir</a></li>
    </ul>
  </li>
    
    `
    login_menu.innerHTML = menu;
}
else{
    const menu = 
    `
    <a class="nav-link cursor-active" id="login" onclick="login()">Login</a>
    `
    login_menu.innerHTML = menu;
}
