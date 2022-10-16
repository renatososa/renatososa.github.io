let userID = 25801;
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL+userID+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            let articulos = resultObj.data.articles;
            let text = "";
            for(let i = 0; i <articulos.length; i++){
            text += `
            <div class="row">
                <div class="col-2"> <img src="` + articulos[0].image + `" class="img-thumbnail" style="width:4rem;"></img></div>
                <div class="col-2">` + articulos[0].name + `</div>
                <div class="col-2" id= "cartCost` + articulos[0].id + `">` + articulos[0].currency + " " + articulos[0].unitCost + `</div>
                <div class="col-2"><input name="cantidad" value="` + articulos[0].count + `" style="width:3rem;" id= "cartCount` + articulos[0].id + `" onchange="calcSubtotal(${articulos[0].id})"></div>
                <div class="col-2" id= "cartSubtotal` + articulos[0].id + `">` +articulos[0].currency + " " + parseInt(articulos[0].count)*parseInt(articulos[0].unitCost) + `</div>
                <div class="col-2"></div>
            </div>
            <hr>
            `;
            }
            document.getElementById("articulos").innerHTML +=text; 
        }
    });
});

function calcSubtotal(id) {
    let cost = parseInt(document.getElementById("cartCost"+id).innerHTML.split(' ')[1]);
    let currency = document.getElementById("cartCost"+id).innerHTML.split(' ')[0];
    let cant = document.getElementById("cartCount"+id).value;
    document.getElementById("cartSubtotal"+id).innerHTML = currency + " " + cant*cost;
}