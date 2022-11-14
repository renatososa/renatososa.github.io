var GoogleAuth;
const SCOPE = 'https://www.googleapis.com/auth/drive.metadata.readonly';
document.addEventListener("DOMContentLoaded", function(e){
  document.getElementById("floatingInput").addEventListener("change",()=>{
    emailValidation();
  });
  document.getElementById("floatingPassword").addEventListener("change",()=>{
    pswValidation();
  });
  document.getElementById("submit").addEventListener("click",()=>{
    if(emailValidation() && pswValidation()){
      var email = document.getElementById("floatingInput").value;
      localStorage.setItem("sesion", 1);
      localStorage.setItem("email", email);
      localStorage.setItem("name", email.split("@")[0]);
      searchAddUser(email);
      setTimeout(()=>{window.location = "index.html"}, 1000);
    }
  });
  
});

function pswValidation(){
  if(!document.getElementById("floatingPassword").checkValidity()){
    document.getElementById("pswFeedback").style.display = 'block';
    document.getElementById("floatingPassword").classList.add("is-invalid");
    document.getElementById("floatingPassword").classList.remove("is-valid");
    return false;
  }
  else{
    document.getElementById("pswFeedback").style.display = 'none';
    document.getElementById("floatingPassword").classList.remove("is-invalid");
    document.getElementById("floatingPassword").classList.add("is-valid");
    return true;
  }
}

function emailValidation(){
  if(!document.getElementById("floatingInput").checkValidity()){
    document.getElementById("emailFeedback").style.display = 'block';
    document.getElementById("floatingInput").classList.add("is-invalid");
    document.getElementById("floatingInput").classList.remove("is-valid");
    return false;
  }
  else{
    document.getElementById("emailFeedback").style.display = 'none';
    document.getElementById("floatingInput").classList.remove("is-invalid");
    document.getElementById("floatingInput").classList.add("is-valid");
    return true;
  }
}
function handleClientLoad() {
  // Load the API's client and auth2 modules.
  // Call the initClient function after the modules load.
  gapi.load('client:auth2', initClient);
}

function initClient() {
  // In practice, your app can retrieve one or more discovery documents.
  var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

  // Initialize the gapi.client object, which app uses to make API requests.
  // Get API key and client ID from API Console.
  // 'scope' field specifies space-delimited list of access scopes.
  gapi.client.init({
      clientId: '706872584156-t2fq5l8var4jcl5es1mo3fftlrkeodni.apps.googleusercontent.com',
      plugin_name: "chat",
      'discoveryDocs': [discoveryUrl],
      'scope': SCOPE
  }).then(function () {
    GoogleAuth = gapi.auth2.getAuthInstance();

    // Listen for sign-in state changes.
    GoogleAuth.isSignedIn.listen(updateSigninStatus);

    // Handle initial sign-in state. (Determine if user is already signed in.)
    var user = GoogleAuth.currentUser.get();
    setSigninStatus();

    // Call handleAuthClick function when user clicks on
    //      "Sign In/Authorize" button.
    $('#customBtn').click(function() {
      handleAuthClick();
    });
  });
}

function handleAuthClick() {
  if (GoogleAuth.isSignedIn.get()) {
        // User is authorized and has clicked "Sign out" button.
      localStorage.setItem("sesion", 0);
      GoogleAuth.signOut();
  }   else {
      // User is not signed in. Start Google auth flow.
      GoogleAuth.signIn();
  }
}

function setSigninStatus() {
  var user = GoogleAuth.currentUser.get();
  var isAuthorized = user.hasGrantedScopes(SCOPE);
  if (isAuthorized) {
      $('#spanGoogle').html('Salir');
      var user = GoogleAuth.currentUser.get();
      var profile = user.getBasicProfile();
      localStorage.setItem("email", profile.getEmail());
      localStorage.setItem("sesion", 1);
      localStorage.setItem("name", profile.getName());
      searchAddUser(profile.getEmail());
  } else {
    $('#spanGoogle').html('Ingresar');
  }
}
function updateSigninStatus() {
  setSigninStatus();
}


function searchAddUser(email){
  
  let type = { method: "GET", headers: {"Content-type": "application/json; charset=UTF-8"}};
  fetchJSONData(usersURL, type).then(function(resultObj){
      if (resultObj.status === "ok")
      {
          let users = resultObj.data
          let findUser = false;
          let userID = undefined;
          for(let i = 0; i < users.length; i++){ 
              if(users[i].email===email)
              {
                  findUser = true;
                  userID = users[i].id;
              }
          }
          if(!findUser){
            userID = users.length+1;
            addUser(email);
          }
          localStorage.setItem("userID", userID);
      }
  });
}

function addUser(email){
  let type = { method: "POST", body: JSON.stringify({Nombre: "", Apellido: "", Segundo_nombre: "", Segundo_apellido: "", 
  Telefono: "", img: "img/img_perfil.png", email: email}),
  headers: {"Content-type": "application/json; charset=UTF-8"}};
  fetchJSONData(usersURL, type)
  .then(function(resultObj){
      if(resultObj.status=="ok"){
      }
      else   
          console.log("Error al crear usuario");
  });
}