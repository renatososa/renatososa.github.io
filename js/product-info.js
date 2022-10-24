document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL+localStorage.getItem("prodID")+EXT_TYPE).then(function(resultObj){
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

            let rel_prod = product.relatedProducts;
            text = "";
            let clase;
            for(let i = 0; i < rel_prod.length; i++){
                if (i===0) {
                    text+=`
                <div onclick="setProdID(${rel_prod[i].id})" class="carousel-item active cursor-active" data-bs-interval="10000">
                    <img src=` + rel_prod[i].image + ` class="d-block w-100" alt="...">
                    <div class="d-flex h-100 align-bottom justify-content-center bg-light">
                    <h5>`+rel_prod[i].name+ `</h5>
                </div>
                </div>
                `
                }
                else{
                    text+=`
                <div onclick="setProdID(${rel_prod[i].id})" class="carousel-item cursor-active" data-bs-interval="10000">
                    <img src=` + rel_prod[i].image + ` class="d-block w-100" alt="...">
                    
                    <div class="d-flex h-100 align-bottom justify-content-center bg-light">
                        <h5>`+rel_prod[i].name+ `</h5>
                    </div>
                </div>
                `
                }
                
            }
            document.getElementById("relProd_carousel").innerHTML = text;

              
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL+localStorage.getItem("prodID")+EXT_TYPE).then(function(resultObj){
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
                <li  class="list-group-item"> <small> <strong>` +comments[i].user+ `</strong> - ` +comments[i].dateTime+ ` - ` +stars+
                `<br> ` +comments[i].description+ 
                `</small></li>
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
    document.getElementById("buyNow").addEventListener("click", function(id){
        if(localStorage.getItem("sesion")==='1'){
            let cart = localStorage.getItem("cart_"+localStorage.getItem("userID"));
            let cartArray = new Array();
            if(cart!='null'&&cart!=null)
            {
                cartArray = JSON.parse(cart);
            }
            let item = cartArray.findIndex((elemento)=> elemento[0] === localStorage.getItem("prodID"))
            if(item>=0){
                cartArray[item][1] += 1;
            }
            else{
                cartArray.push([localStorage.getItem("prodID"), 1]);
            }
            localStorage.setItem("cart_"+localStorage.getItem("userID"), JSON.stringify(cartArray));
            window.location = "cart.html";
        }
        else{
            alert("Debe ingresar con un usuario para realizar la compra");            
        }

    });
    document.getElementById("addCart").addEventListener("click", function(id){
        if(localStorage.getItem("sesion")==='1'){
            let cart = localStorage.getItem("cart_"+localStorage.getItem("userID"));
            let cartArray = new Array();
            if(cart!='null'&&cart!=null)
            {
                cartArray = JSON.parse(cart);
            }
            let item = cartArray.findIndex((elemento)=> elemento[0] === localStorage.getItem("prodID"))
            if(item>=0){
                cartArray[item][1] += 1;
            }
            else{
                cartArray.push([localStorage.getItem("prodID"), 1]);
            }
            localStorage.setItem("cart_"+localStorage.getItem("userID"), JSON.stringify(cartArray));
            window.location.reload();
        }
        else{
            alert("Debe ingresar con un usuario para realizar la compra");                                             
        }

    });
});
function changeImage(element) {
    var main_prodcut_image = document.getElementById('main_product_image');
    main_prodcut_image.src = element.src;
}
function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"    
}