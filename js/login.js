function login(){
    var email = document.getElementById("floatingInput").value;
    var password = document.getElementById("floatingPassword").value;
    localStorage.setItem("sesion", 1);
    localStorage.setItem("email", email);
    localStorage.setItem("name", email.slice(0, 6));
}
  var GoogleAuth;
  var SCOPE = 'https://www.googleapis.com/auth/drive.metadata.readonly';
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