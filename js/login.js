function login(){
    var email = document.getElementById("floatingInput").value;
    var password = document.getElementById("floatingPassword").value;
    localStorage.setItem("email", email);
    localStorage.setItem("name", email.slice(0, 6));
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    localStorage.setItem("email", profile.getEmail());
    localStorage.setItem("name", profile.getName());
    document.location = "index.html";
  }