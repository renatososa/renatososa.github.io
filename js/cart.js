let subTotal = 0;
let costoEnvio = 0;
let total = 0;

(function () {
    'use strict'

// Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
var forms = document.querySelectorAll('.needs-validation');
// Bucle sobre ellos y evitar el envío
Array.prototype.slice.call(forms)
    .forEach(function (form) {
    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        }
        
        if(payValidation()){
        event.preventDefault();
        event.stopPropagation();
        }
        form.classList.add('was-validated');
    }, false)
    })
    
})()

document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("userID").value = localStorage.getItem("userID");
    document.getElementById("userName").value = localStorage.getItem("name");
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
                    <div class="col-2 my-1"> <img src="` + product.images[0] + `" class="img-thumbnail" style="width:4rem;"></img></div>
                    <div class="col-2 my-1"><p class="my-2">` + product.name + `</p></div>
                    <div class="col-2 my-1" ><p class="my-2" id= "cartCost` + product.id + `">` + product.currency + " " + product.cost + `</p></div>
                    <div class="col-2 my-1"><input class="my-2" type="number" min="1" name="cantidad" value="` + cartArray[i][1] + `" style="width:3rem;" id= "cartCount` + product.id + `" onchange="calcSubtotal(${product.id})"></div>
                    <div class="col-2 my-1" ><p class="subTotalItem my-2" id= "cartSubtotal` + product.id + `">` +product.currency + " " + parseInt(cartArray[i][1])*parseInt(product.cost) + `</p></div>
                    <div class="col-2">
                        <button type="button" class="btn btn-outline-danger my-2" onclick = "deleteProduct(${product.id})">
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

    setTimeout(calcSubtotalTotal, 300);
});


function deleteProduct(id){
    let cart = localStorage.getItem("cart_"+localStorage.getItem("userID"));
    let cartArray = new Array();
    cartArray = JSON.parse(cart);
    let newCartArray = cartArray.filter(product => product[0]!=id)
    localStorage.setItem("cart_"+localStorage.getItem("userID"), JSON.stringify(newCartArray));
    calcSubtotalTotal();
    window.location.reload();
}

function getProduct(id){
    let salida = undefined;
    getJSONData(PRODUCT_INFO_URL+id+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            salida = resultObj.data;
        }
    });
    return salida;
}
function calcSubtotal(id) {
    let cost = parseInt(document.getElementById("cartCost"+id).innerHTML.split(' ')[1]);
    let currency = document.getElementById("cartCost"+id).innerHTML.split(' ')[0];
    let cant = document.getElementById("cartCount"+id).value;
    if(cant<1){
        cant = 1;
        document.getElementById("cartCount"+id).value = 1;
    }
    document.getElementById("cartSubtotal"+id).innerHTML = currency + " " + cant*cost;
    calcSubtotalTotal();
}

function calcSubtotalTotal() {
    subTotal = 0;
    document.querySelectorAll('.subTotalItem').forEach(function(Item) {
        let value = Item.innerHTML.split(' ');
        if(value[0]!='USD'){
            subTotal+=parseFloat(value[1])/40; 
        }
        else{
            subTotal+=parseInt(value[1]);
        }
    });
    document.getElementById("costoSubtotal").innerHTML = "USD "+ subTotal;
    calcShippingCost();
    total = subTotal+costoEnvio;
    document.getElementById("costoTotal").innerHTML = "USD "+ total;
    document.getElementById("totalVenta").value = total;

}
function calcShippingCost(){
    document.querySelectorAll('.shipping').forEach(function(Item) {
        if(Item.checked){
            costoEnvio = parseInt(subTotal*parseFloat(Item.value));
        }
    });
    document.getElementById("costoEnvio").innerHTML = "UDS " + costoEnvio;
    total = subTotal+costoEnvio;
    document.getElementById("costoTotal").innerHTML = "USD "+ total;
}

function formaPagoCheck(){
    if(document.getElementById("eBanking").checked){
        document.getElementById("nTarjeta").disabled = true;
        document.getElementById("codSeguridad").disabled = true;
        document.getElementById("vencimientoTarjeta").disabled = true;
        document.getElementById("nCuenta").disabled = false;
    }
    else if(document.getElementById("creditCard").checked){
        document.getElementById("nTarjeta").disabled = false;
        document.getElementById("codSeguridad").disabled = false;
        document.getElementById("vencimientoTarjeta").disabled = false;
        document.getElementById("nCuenta").disabled = true;
    }
}

function payValidation(){
    let payMethodSelected = document.getElementById("payMethodSelected");
    if(document.getElementById("creditCard").checked && document.getElementById("nTarjeta").checkValidity() && document.getElementById("codSeguridad").checkValidity() && document.getElementById("vencimientoTarjeta").checkValidity()){
        payMethodSelected.innerHTML = "Se ha seleccionado <strong> tarjeta de credito </strong>";
        payMethodSelected.style.color = 'rgb(25, 135, 84)';
        return false;
    }
    else if(document.getElementById("eBanking").checked &&  document.getElementById("nCuenta").checkValidity()){
        payMethodSelected.innerHTML = "Se ha seleccionado <strong> transferencia bancaria </strong>";
        payMethodSelected.style.color = 'rgb(25, 135, 84)';
        return false;
    }
    else{
        payMethodSelected.innerHTML = "Datos incorrectos";
        payMethodSelected.style.color = 'rgb(220, 53, 69)';
        return true;
    }
}

function allValidation(){
    let shippingType = document.getElementById("premium").checkValidity();
    let dirCalle =  document.getElementById("direccion").checkValidity();
    let dirNumero = document.getElementById("numero").checkValidity();
    let dirEsquina = document.getElementById("esquina").checkValidity();

    return !payValidation() && dirCalle && dirNumero && dirEsquina && shippingType
}
