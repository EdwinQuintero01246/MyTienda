//para iniciar datos u objetos cuando se recarga la pagina
$(document).ready(function() {
    //Id de usuario usando session storage
    var ID_USER = localStorage.getItem('IDUser');
    $('#GeneUserArriba').html($(`
        <i class="fa fa-envelope"></i>
        mytiendat@developer.com 
        <i class="fa fa-user"></i>
        Edwin Quintero
        <i class=""></i>
    `));
    //LLenar todos los productos
    var URLactual = window.location.pathname;
    //alert(URLactual);
    if (ID_USER == null && URLactual!= '/MyTienda%20Edwin/otherWebsite/Iniciar%20seccion/index.html'){
        window.location.assign("../Iniciar seccion/index.html");
    }
    if(URLactual=='/MyTienda%20Edwin/otherWebsite/ecommerce/product-list.html'){
        console.log("LLenado productos");
        $.ajax({
            url: '../ecommerce/ajax/php_intermediate.php?acción=ListProduct',
            //type: 'GET',
            type: 'POST',
            data:{ Proceso : 'ListProd'},
            success: function(resp){
                console.log('data-------------->',resp)
                for (var i=0; i<9;i++){
                $('#ProductListHTML').append($(`
                    <div class="col-md-4" onclick="ProductList(${i+1})">
                        <div class="product-item">
                            <div class="product-title">
                                <a href="#">Product Name</a>
                                <span class="FabricanteStyle">(Fabricante)</span>
                                <a href="#">Vendedor/Empresa</a>
                            </div>
                            <div class="product-image">
                                <a href="product-detail.html">
                                    <img src="img/product-1.jpg" alt="Product Image">
                                </a>
                                <div class="product-action">
                                    <a href="#"><i class="fa fa-cart-plus"></i></a>
                                    <a href="#"><i class="fa fa-heart"></i></a>
                                    <a href="#"><i class="fa fa-search"></i></a>
                                </div>
                            </div>
                            <div class="product-price">
                                <h3><span>$</span>99</h3>
                                <a class="btn" href=""><i class="fa fa-shopping-cart"></i>Compra ahora</a>
                            </div>
                        </div>
                    </div>
                `));
            }
            }
        });
    }
    //mostrar detalles para la compra de los productos
    if(URLactual=='/MyTienda%20Edwin/otherWebsite/ecommerce/product-detail.html'){
        console.log("Detalles Productos");
        var IdProduct = sessionStorage.getItem("IdProduct");
        console.log(IdProduct);
        if (IdProduct == null){
            window.location.assign("../ecommerce/product-list.html");
        }
        $.ajax({
            url: '../ecommerce/ajax/php_intermediate.php?acción=DetailProduct',
            //type: 'GET',
            type: 'POST',
            data:{ Proceso : 'DetailProduct', IdProducto:IdProduct},
            success: function(resp){
                console.log('data-------------->',resp);
                //localStorage.clear();
            }
        });
    }
    //LLenado del carrito de compras
    if(URLactual=='/MyTienda%20Edwin/otherWebsite/ecommerce/cart.html'){
        console.log("Carrito");
        $.ajax({
            url: '../ecommerce/ajax/php_intermediate.php?acción=Cart',
            //type: 'GET',
            type: 'POST',
            data:{ Proceso : 'Cart',IDCliente : ID_USER},
            success: function(resp){
                console.log('data-------------->',resp)
            }
        });
    }
    
    //LLenado de paquetes
    if(URLactual=='/MyTienda%20Edwin/otherWebsite/ecommerce/cart%20packages.html'){
        console.log("paquetes");
        $.ajax({
            url: '../ecommerce/ajax/php_intermediate.php?acción=Package',
            //type: 'GET',
            type: 'POST',
            data:{ Proceso : 'Packages',IDCliente : ID_USER},
            success: function(resp){
                console.log('data-------------->',resp)
            }
        });
    }
    //Ver que tienda es
    
    if(URLactual=='/MyTienda%20Edwin/otherWebsite/ecommerce/Stores-Contents.html'){
        var TypeStores = sessionStorage.getItem("TypeStore"); 
        if(TypeStores==1){
            //LLenar Compras ajax
            $('#ProductShoreHouseBUY').append($(`
                <tr>
                    <td>Camara</td>
                    <td>Sony</td>
                    <td>20</td>
                    <td>$399.99</td>
                </tr>
                <tr>
                    <td>CAPA</td>
                    <td>REdPrint</td>
                    <td>1000</td>
                    <td>$5.99</td>
                </tr>
                <tr>
                    <td>APPLE</td>
                    <td>IPhone X</td>
                    <td>15</td>
                    <td>$599.00</td>
                </tr>
                <tr>
                    <td>Hp</td>
                    <td>Asus</td>
                    <td>5</td>
                    <td>$500.00</td>
                </tr>
            `));
        };
        if(TypeStores==2){
        };
        if(TypeStores==3){
        };
        if(TypeStores==4){
        };
        //llenado de inventario ajax
        $('#ProductShoreHouseProduct').append($(`
            <tr>
                <td>Camara</td>
                <td>Sony</td>
                <td>20</td>
                <td>$399.99</td>
                <td><a href=""><button class="btn" wfd-id="94" style=" width: auto; height: auto; ">Realizar Pedido</button></a></td>
            </tr>
            <tr>
                <td>CAPA</td>
                <td>REdPrint</td>
                <td>1000</td>
                <td>$5.99</td>
                <td><a href=""><button class="btn" wfd-id="94" style=" width: auto; height: auto; ">Realizar Pedido</button></a></td>
            </tr>
            <tr>
                <td>APPLE</td>
                <td>IPhone X</td>
                <td>15</td>
                <td>$599.00</td>
                <td><a href=""><button class="btn" wfd-id="94" style=" width: auto; height: auto; ">Realizar Pedido</button></a></td>
            </tr>
            <tr>
                <td>Hp</td>
                <td>Asus</td>
                <td>5</td>
                <td>$500.00</td>
                <td><a href=""><button class="btn" wfd-id="94" style=" width: auto; height: auto; ">Realizar Pedido</button></a></td>
            </tr>
        `))
        
    };
    
})

// envio de datos para habilitar el ingreso al sistema por medio de Login
//se envia Login/Email y contraseña
function Logiarse(){
    var parametros =
    'User='+$('#login').val()+"&"+
    'Contraseña='+$('#password').val();
    //petición para login
    $.ajax({
        url: '../ecommerce/ajax/php_intermediate.php?acción=Login',
        type: 'POST',
        data:{Proceso : 'Login', User :  $('#login').val(), Contraseña : $('#password').val()},
        success: function(data){
            console.log('data-------------->',data)
            alert(data);
            localStorage.setItem('IDUser', 0225);
            window.location.assign("../ecommerce/index.html");
        }
       });
 
 
    
}
//onclick para detalles de productos
function ProductList(X){
    var IdProducto = X;
    console.log(IdProducto);
    window.location.assign("../ecommerce/product-detail.html");
    sessionStorage.setItem("IdProduct",IdProducto)
}
//LLenado del compras del cliente online  
function LLenarPedidos(){
    var ID_USER = localStorage.getItem('IDUser');
        $.ajax({
            url: '../ecommerce/ajax/php_intermediate.php?acción=invoices',
            //type: 'GET',
            type: 'POST',
            data:{ Proceso : 'invoices',IDCliente : ID_USER},
            success: function(resp){
                console.log('data-------------->',resp)
            }
        });
}


function cerrarsesion(){
    localStorage.clear();
    window.location.assign("../Iniciar seccion/index.html");
    console.log(localStorage.getItem('IDUser'));
}
function UpPackageProduct(){
    var ID_USER = localStorage.getItem('IDUser');
    $.ajax({
        url: '../ecommerce/ajax/php_intermediate.php?acción=PayPackageProduct',
        //type: 'GET',
        type: 'POST',
        data:{ Proceso : 'PayPackageProducts',IDCliente : ID_USER, IDProducto : 25},
        success: function(resp){
            console.log('data-------------->',resp)
        }
    });
}

function UpProduct(){
    var parametros =
    'Proceso=' + 'UpProduct' + "&" + 'NameProduct=' + $('#NameProduct').val()  +"&"+
    'Producer=' + $('#FabricanteNewProduct').val() + "&" + 'Price' + $('#PriceProduct').val() +"&"+
    'Discount=' + $('#DesProduct').val()+"&" +'Quantity' + $('#QuantityProduct').val() +"&"+
    'Category=' + $('#CategoryProduct').val()+"&" +'Description' + $('#DescriptionProduct').val() +"&"+
    'Specification=' + $('#EspProduct').val()
    ;
    //console.log(parametros);
    
    $.ajax({
        url: '../ecommerce/ajax/php_intermediate.php?acción=UpProduct',
        //type: 'GET',
        type: 'POST',
        data:{ Proceso : 'UpProduct',NameProduct : $('#NameProduct').val(),
        Producer : $('#FabricanteNewProduct').val(), Price : $('#PriceProduct').val(),
        Discount : $('#DesProduct').val(), Quantity : $('#QuantityProduct').val(),
        Category : $('#CategoryProduct').val(), Description : $('#DescriptionProduct').val(),
        Specification : $('#EspProduct').val()
        }, 
        success: function(resp){
            console.log('data-------------->',resp)
        }
    });
}


function MyStores(X){
    var TypeStores = X;
    console.log(TypeStores);
    window.location.assign("Stores-Contents.html");
    sessionStorage.setItem("TypeStore",TypeStores);
    if(TypeStores==1){
        //document.getElementById("AddressStoreContents").append(`<li class="breadcrumb-item active">Tiendas Físicas</li>`);
        $('#AddressStoreContents').append($(`<li class="breadcrumb-item active">Tiendas Físicas</li>`))
    }
}
