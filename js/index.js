function login_1(){
        if(document.getElementById("login").text === "Logout"){
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
if(email!=null && PSW!=null && email!="null"){
    login_btn.innerHTML = "Logout";
}
else{
    login_btn.innerHTML = "Login";
}
