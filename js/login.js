function login(){
    var email = document.getElementById("floatingInput").value;
    var password = document.getElementById("floatingPassword").value;
    localStorage.setItem("email", email);
    localStorage.setItem("PSW", password);
}