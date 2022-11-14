var firstName;
var secondName;
var firstSurname;
var secondSurname;
var phone;
var emailUpdate;
var photoSrc;
var imgPerfil;


document.addEventListener("DOMContentLoaded", function(e){
    firstName = document.getElementById("firstName");
    secondName = document.getElementById("secondName");
    firstSurname = document.getElementById("firstSurname");
    secondSurname = document.getElementById("secondSurname");
    phone = document.getElementById("phone");
    emailUpdate = document.getElementById("email");
    photoSrc = document.getElementById("photo");
    imgPerfil = document.getElementById("imgPerfil");
    let type = { method: "GET", headers: {"Content-type": "application/json; charset=UTF-8"}};
    let userID = localStorage.getItem("userID");
    fetchJSONData(usersURL+"/"+ userID, type).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            let user = resultObj.data;
            emailUpdate.value = user.email;
            firstName.value = user.Nombre;
            firstSurname.value = user.Apellido;
            secondName.value = user.Segundo_nombre;
            secondSurname.value = user.Segundo_apellido;
            phone.value = user.Telefono;
            imgPerfil.src = user.img;
        }
        else{
            console.log("Error con el usuario");
        }
    });
    document.getElementById("formulario").addEventListener("submit", handleSubmit);
});

function handleSubmit(event) {
    event.preventDefault();
    surnameValidation();
    phoneValidation();
    if(emailValidation()&&nameValidation()&&surnameValidation()&&phoneValidation()){
        event.preventDefault();
        updateUser(localStorage.getItem("userID"));
        submitTimer = setTimeout(() => {
        this.submit();
        }, 500)
    }
}

function updateUser(id){
    let imgName = "img/"+photoSrc.value.split("\\")[2]
    if(photoSrc.value.split("\\")[2]==undefined)
        imgName = imgPerfil.src;
let type = { method: "PUT", body: JSON.stringify({Nombre: firstName.value, Apellido: firstSurname.value, 
    Segundo_nombre: secondName.value, Segundo_apellido: secondSurname.value, Telefono: phone.value, email: emailUpdate.value, img: imgName}),
headers: {"Content-type": "application/json; charset=UTF-8"}};
fetchJSONData(usersURL+"/"+id, type)
.then(function(resultObj){
    if(resultObj.status=="ok"){
        console.log("Todo ok");
    }
    else   
        console.log("Error al actualizar usuario");
});
}

function emailValidation(){
    return elementValidation(emailUpdate)
}
function nameValidation(){
    return elementValidation(firstName)
}
function surnameValidation(){
    return elementValidation(firstSurname)
}
function phoneValidation(){
    return elementValidation(phone)
}

function elementValidation(element){
    if(!element.checkValidity()){
        element.nextElementSibling.style.display = "block"
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
    }
    else{
        element.nextElementSibling.style.display = "none"
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
    }
    return element.checkValidity()
}