
document.addEventListener("DOMContentLoaded", function(e){
    let cart = localStorage.getItem("cart_"+localStorage.getItem("userID"));
    let cartArray = new Array();
    if(cart!='null'&&cart!=null)
    {
        cartArray = JSON.parse(cart);
    }
    else{
        alert("No se han seleccionado productos.");
        window.location = "categories.html";
    }
    
    for(let i = 0; i < cartArray.length; i++){
        getJSONData(PRODUCT_INFO_URL+cartArray[i][0]+EXT_TYPE).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                let product = resultObj.data;
                document.getElementById("articulos").innerHTML += `
                <div class="row">
                    <div class="col-2"> <img src="` + product.images[0] + `" class="img-thumbnail" style="width:4rem;"></img></div>
                    <div class="col-2">` + product.name + `</div>
                    <div class="col-2" id= "cartCost` + product.id + `">` + product.currency + " " + product.cost + `</div>
                    <div class="col-2"><input name="cantidad" value="` + cartArray[i][1] + `" style="width:3rem;" id= "cartCount` + product.id + `" onchange="calcSubtotal(${product.id})"></div>
                    <div class="col-2" id= "cartSubtotal` + product.id + `">` +product.currency + " " + parseInt(cartArray[i][1])*parseInt(product.cost) + `</div>
                    <div class="col-2">
                        <button type="button" class="btn btn-outline-danger" onclick = "deleteProduct(${product.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <hr>
                `;
            }
        });
    }
});
function deleteProduct(id){
    let cart = localStorage.getItem("cart_"+localStorage.getItem("userID"));
    let cartArray = new Array();
    cartArray = JSON.parse(cart);
    let newCartArray = cartArray.filter(product => product[0]!=id)
    localStorage.setItem("cart_"+localStorage.getItem("userID"), JSON.stringify(newCartArray));
    window.location.reload();
}

function getProduct(id){
    let salida = undefined;
    getJSONData(PRODUCT_INFO_URL+id+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            salida = resultObj.data;
            alert(salida);
        }
    });
    return salida;
}
function calcSubtotal(id) {
    let cost = parseInt(document.getElementById("cartCost"+id).innerHTML.split(' ')[1]);
    let currency = document.getElementById("cartCost"+id).innerHTML.split(' ')[0];
    let cant = document.getElementById("cartCount"+id).value;
    document.getElementById("cartSubtotal"+id).innerHTML = currency + " " + cant*cost;
}