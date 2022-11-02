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