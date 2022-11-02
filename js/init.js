const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function login(){
  if(localStorage.getItem("sesion") === '1'){
  localStorage.setItem("sesion", 0);
  //window.location = "index.html";
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
    <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
    <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
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