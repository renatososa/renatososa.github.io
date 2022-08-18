function login_1(){
        if(document.getElementById("login").text === "Salir"){
        localStorage.setItem("email", null);
        window.location = "index.html";
        }
        else{
            window.location = "login.html";
        }
}

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

const email = localStorage.getItem("email");
const PSW = localStorage.getItem("PSW");
const login_btn = document.getElementById("login");
const login_menu = document.getElementById("login_menu");
if(email!=null && PSW!=null && email!="null"){
    const menu = 
    `<a class="nav-link">Renato</a>
    <ul class="navbar-nav w-100 justify-content-between">
        <li class="nav-item">
            <a class="nav-link" href="my-profile.html">Mi perfil</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" id="login" onclick="login_1()">Salir</a>
        </li>
    </ul>
    `
    login_menu.innerHTML = menu;
}
else{
    const menu = 
    `
    <a class="nav-link" id="login" onclick="login_1()">Login</a>
    `
    login_menu.innerHTML = menu;
}
