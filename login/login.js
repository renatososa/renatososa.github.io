  var GoogleAuth;
  const SCOPE = 'https://www.googleapis.com/auth/drive.metadata.readonly';
  const usersURL = "https://636028deca0fe3c21aadc3f6.mockapi.io/JAPusers";
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
      $('#sign-in-or-out-button').click(function() {
        handleAuthClick();
      });
      $('#revoke-access-button').click(function() {
        revokeAccess();
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

  function revokeAccess() {
    GoogleAuth.disconnect();
  }

  function setSigninStatus() {
    var user = GoogleAuth.currentUser.get();
    var isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {
        $('#sign-in-or-out-button').html('Salir');
        var user = GoogleAuth.currentUser.get();
        var profile = user.getBasicProfile();
        localStorage.setItem("email", profile.getEmail());
        localStorage.setItem("sesion", 1);
        localStorage.setItem("name", profile.getName());
    } else {
      $('#sign-in-or-out-button').html('Ingresar con google');
    }
  }
  function updateSigninStatus() {
    setSigninStatus();
  }

  function login(){
    var email = document.getElementById("floatingInput").value;
    localStorage.setItem("sesion", 1);
    localStorage.setItem("email", email);
    localStorage.setItem("name", email.split("@")[0]);
    searchUserByEmail(email);
    

    if(email.split("@")[0] === "renato.sosast"){
      localStorage.setItem("userID", 1);
    }
    else{
      localStorage.setItem("userID", 0);
    }
  }

  function searchUserByEmail(email){
    
    let type = { method: "GET", headers: {"Content-type": "application/json; charset=UTF-8"}};
    
    fetchJSONData(usersURL, type).then(function(resultObj){
      
      if (resultObj.status === "ok")
        {
          
            let users = resultObj.data;
            let findEmail = false;
            for(let i = 0; i < users.length; i++){ 
               if(users[i].email == email){
                findEmail = true;
               } 
            }
            if(!findEmail){
              alert("No se encontró ninguna usuario");
              addUser(correo);
            }
        }
    });
}
  let fetchJSONData = function(url, type){
    
    let result = {};
    return fetch(url, type)
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
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}
function addUser(correo){
  let type = { method: "POST", body: JSON.stringify({Nombre: "", Segundo_nombre: "", Apellido: "", Segundo_apellido: "", email: correo, telefono: ""}),
  headers: {"Content-type": "application/json; charset=UTF-8"}};
  fetchJSONData(usersURL, type)
  .then(function(resultObj){
      if(resultObj.status=="ok"){
        alert("Add ok");
      }
  });
}