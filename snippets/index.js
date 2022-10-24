const URL = "https://japceibal.github.io/emercado-api/products/50921.json";
const URL_c = "https://japceibal.github.io/emercado-api/products_comments/50921.json";
localStorage.setItem("sesion", 1);
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            let product = resultObj.data;
            let examples = product.images;
            document.getElementById("name").innerHTML = product.name;
            document.getElementById("cost").innerHTML = product.currency + ' ' + product.cost;
            document.getElementById("description").innerHTML = "<p> "+product.description+" </p>";
            document.getElementById("main_product_image").src = examples[0];
            var text = "";
            for(let i = 0; i < examples.length; i++){
                text += `
                <li><img onclick="changeImage(this)" src="`+examples[i]+`" width="70">
                </li>`;
            }
            document.getElementById("thumbnail").innerHTML = text;
        }            
    });
    getJSONData(URL_c).then(function(resultObj){
      if (resultObj.status === "ok")
      {
          let comments = resultObj.data;
          let text = "";
          let local_coment = localStorage.getItem("comment_"+localStorage.getItem("prodID"));
          
          if(local_coment!='null'&&local_coment!=null)
          {   
              comments = comments.concat(JSON.parse(local_coment));
          }
          
          for(let i = 0; i < comments.length; i++){
              let stars = "";
              for(let j = 0; j < 5; j++){
                  if(j+1<=comments[i].score)
                      stars += `<span class="fa fa-star checked"></span> `
                  else
                  stars += `<span class="fa fa-star"></span> `
              }
              text+=`
              <li  class="list-group-item"> <strong>` +comments[i].user+ `</strong> - ` +comments[i].dateTime+ ` - ` +stars+
              `<br> <p>` +comments[i].description+ 
              `</p></li>
              `
          }
          document.getElementById("contenedor").innerHTML = text;
            
      }
  });
  document.getElementById("enviar").addEventListener("click", function(){
    /*let local_coment = localStorage.getItem("comment_"+localStorage.getItem("prodID"));*/
    
    if(localStorage.getItem("sesion")==='1'){
        const usuario = localStorage.getItem("name");
        const opinion= document.getElementById("comentario").value;
        const puntuacion = document.getElementById("puntuacion").value;
        const hoy = new Date();
        const fecha = hoy.getFullYear() + "-" + hoy.getMonth() + 1+"-"+hoy.getDate()+" "+hoy.getHours()+":"+hoy.getMinutes()+":"+hoy.getSeconds();
        let comment = {user:usuario, description:opinion, score: puntuacion, dateTime:fecha}
        let local_coment = localStorage.getItem("comment_"+localStorage.getItem("prodID"));
        let comment_array = new Array();
        
        if(local_coment!='null'&&local_coment!=null)
        {
            comment_array = JSON.parse(local_coment);
        }
        comment_array.push(comment);
        localStorage.setItem("comment_"+localStorage.getItem("prodID"), JSON.stringify(comment_array));
    }            
    else{
        alert("Debe ingresar con un usuario para realizar un comentario");            
    }
    document.getElementById("comentario").value = "";
    document.getElementById("puntuacion").value = 1;
    location.reload();

});
});

let getJSONData = function(url){
    let result = {};
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
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}