//para iniciar datos u objetos cuando se recarga la pagina
var methodPayment;
$(document).ready(function() {
    //Id de usuario usando session storage
    var ID_USER = localStorage.getItem('IDUser');
    var TypeUser = localStorage.getItem('TypeUser');
    var nameUser = localStorage.getItem('NameUser');
    //localStorage.removeItem('IDUser');
    //localStorage.removeItem('TypeUser');
    //localStorage.removeItem('NameUser');
    var URLactual = window.location.pathname;
    //var request = window.indexedDB.open("MyTestDatabase", 3);
    //alert(URLactual);
    if (TypeUser == 'Cliente'){
        //IDStoresHtml
        document.getElementById('IDStoresHtml').style.display = 'none';
        if (URLactual == '/MyTienda%20Edwin/otherWebsite/ecommerce/my-Stores.html' || URLactual == '/MyTienda%20Edwin/otherWebsite/ecommerce/Stores-Contents.html'){
            window.location.assign("index.html");
        };
    }
    if (TypeUser == 'Admin'){
        //IDStoresHtml
        //document.getElementById('IDStoresHtml').style.display = 'none';
        //if (URLactual == '/MyTienda%20Edwin/otherWebsite/ecommerce/my-Stores.html' || URLactual == '/MyTienda%20Edwin/otherWebsite/ecommerce/Stores-Contents.html'){
        //    window.location.assign("index.html");
        //};
    };
    $('#GeneUserArriba').html($(`
        <i class="fa fa-envelope"></i>
        mytiendat@developer.com 
        <i class="fa fa-user"></i>
        ${nameUser}
        <i class=""></i>
    `));
    //LLenar todos los productos
    
    if (ID_USER == null && URLactual!= '/MyTienda%20Edwin/otherWebsite/Iniciar%20seccion/index.html'){
        window.location.assign("../Iniciar seccion/index.html");
    }
    if(URLactual=='/MyTienda%20Edwin/otherWebsite/ecommerce/product-list.html'){
        console.log("LLenado productos");
        $.ajax({
            url: '../ecommerce/ajax/php_intermediate.php?acción=ListProduct',
            type: 'POST',
            dataType: 'json',
            data:{ Proceso : 'ListProd'},
            success: function(resp){
                console.log('data-------------->',resp)
                for (var i=0; i<resp.length;i++){
                $('#ProductListHTML').append($(`
                    <div class="col-md-4" onclick="ProductList(${resp[i].Id})">
                        <div class="product-item">
                            <div class="product-title">
                                <a href="#">${resp[i].Name_maker}</a>
                                <span class="FabricanteStyle"> (${resp[i].Name_product})</span><br>
                                <a href="#">${resp[i].Description_category}</a>
                            </div>
                            <div class="product-image">
                                <a href="product-detail.html">
                                    <img src="img/Products/${resp[i].Name_maker}/${resp[i].Name_product}/producto.png" alt="Product Image" style="height: 170px;width: auto;margin-left: auto;display: block;margin-right: auto;">
                                </a>
                                <div class="product-action" >
                                    <a href="#"><i class="fa fa-cart-plus"></i></a>
                                    <a href="#"><i class="fa fa-heart"></i></a>
                                    <a href="#"><i class="fa fa-search"></i></a>
                                </div>
                            </div>
                            <div class="product-price">
                                <h3><span>$</span>${resp[i].Price}</h3>
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
        var IdProduct = sessionStorage.getItem("IdProduct");
        if (IdProduct == null){
            window.location.assign("../ecommerce/product-list.html");
        }
        $.ajax({
            url: '../ecommerce/ajax/php_intermediate.php?acción=DetailProduct',
            method: 'POST',
            dataType: 'json',
            data:{ Proceso : 'Detail-Product', IdProducto:IdProduct},
            success: function(resp){
                var Name_maker = resp[0]['Name_maker'];
                var Name_product = resp[0]['Name_product'];
                var Price ;                
                $('#ProductDetail-contend-Image1').html($(`
                    <img src="img/Products/${resp[0].Name_maker}/${resp[0].Name_product}/producto.png" alt="Product Image">
                `));
                $('#ProductDetail-contend-title').html($(`
                    <h2>${resp[0].Name_maker}</h2>
                    <span class="FabricanteStyle2">${resp[0].Name_product}</span>
                `));
                if( resp[0]['Discount']==null){
                    Price  = resp[0]['Price'];
                    $('#ProductDetail-contend-price').html($(`
                        <h4>Price:</h4>
                        <p>$${resp[0].Price}</p>
                    `));
                }else{
                    Price  = resp[0]['Discount'];
                    $('#ProductDetail-contend-price').html($(`
                        <h4>Price:</h4>
                        <p>$${resp[0].Discount}<span>$${resp[0].Price}</span></p>
                    `));
                };
                $('#ProductDetail-contend-action').html($(`
                    <a class="btn" href="#" onclick="SaveCart(${IdProduct},'${Name_maker}','${Name_product}',${Price})"><i class="fa fa-shopping-cart"></i>Add to Carrito</a>
                    <a class="btn" href="#" onclick="BuyNow(${IdProduct},${Price})"><i class="fa fa-shopping-bag"></i>Comprar</a>
                `));
            }
        });
    }
    //LLenado del carrito de compras
    if(URLactual=='/MyTienda%20Edwin/otherWebsite/ecommerce/cart.html'){
        //console.log("Carrito");
        var ID_user = localStorage.getItem('IDUser');
        var Productos = [];
        var Productos22 = [];
        methodPayment = 0;
        var TotalProduct=0;
        var Datas = 
            'IdUser='+ ID_user;
        $.ajax({
            url: '../ecommerce/ajax/php_intermediate.php?acción=Cart',
            dataType: "json",
            data:Datas,
            type: "POST",
            success:function(resp){
                //console.log(resp);
                $('#ConteCart').html($(``));
                for(var i=0; i<resp.length;i++){
                    TotalProduct = TotalProduct + (resp[i]['Price']*resp[i]['Quantity']);
                    Productos22[i] = {"id" :resp[i]['IDUser'],'price':resp[i]['Price'],'quantity':resp[i]['Quantity']};
                    $('#ConteCart').append($(`
                        <tr>
                            <td>
                                <div class="img">
                                    <a href="#"><img src="img/product-1.jpg" alt="Image"></a>
                                    <p>${resp[i].NameProduct}</p>
                                </div>
                            </td>
                            <td>${resp[i].Producer}</td>
                            <td>$${resp[i].Price}</td>
                            <td>
                                <div class="qty">
                                    <button class="btn-minus"><i class="fa fa-minus"></i></button>
                                    <input type="text" value=${resp[i].Quantity}>
                                    <button class="btn-plus"><i class="fa fa-plus"></i></button>
                                </div>
                            </td>
                            <td><a href="#"><button onclick="PayObjectCart(${i})" class="btn" wfd-id="94" style=" width: auto; height: auto; ">Pagar YA</button></a></td>
                            <td><button><i class="fa fa-trash"></i></button></td>
                        </tr>
                    `));
                }
                console.log(Productos22);
                document.getElementById("PayAllProductsButton").addEventListener("click", function( event ) {
                    $('#PayProduct').html(`
                        <div class="cart-content">
                            <h1>Compra De Todos LosProducto</h1>
                            <p>Sub Total<span>$${TotalProduct}</span></p>
                            <p>Costo de envío<span>$No Envio</span></p>
                            <h2>Total<span>$${TotalProduct}</span></h2>
                        </div>
                        <div class="cart-btn">
                            <a href="javascript:document.location.reload()"><button><i class="fa fa-clock-o"></i> Update Carrito</button></a>
                            <button id="SendInvoiceAll"><i class="fa fa-shopping-bag"></i> Realizar Compras</button>
                        </div>
                        <div class="payment-methods">
                            <h4>Métodos de pago</h4>
                            <div class="payment-methodH">
                                <div class="custom-control custom-radio">
                                    <input type="radio" class="custom-control-input" onclick="DatosPago(11)" id="payment-1" name="payment">
                                    <label class="custom-control-label" for="payment-1"><i class="fa fa-credit-card"></i> Paypal</label>
                                </div>
                                <div id="contentPaymet-1">
                                <!--Contenido de paypal--> 
                                </div>
                            </div>
                            <div class="payment-methodH">
                                <div class="custom-control custom-radio">
                                    <input type="radio" class="custom-control-input" onclick="DatosPago(22)" id="payment-3" name="payment">
                                    <label class="custom-control-label" for="payment-3"><i class="fa fa-shopping-basket"></i> Pago con Cuenta</label>
                                </div>
                                <div class="payment-contentH" id="payment-3-show">
                                    <!--Contenido de Cuentas empresas-->
                                    
                                </div>
                            </div>
                        </div>
                    `);
                    document.getElementById("SendInvoiceAll").addEventListener("click", function( event ) {
                        if(methodPayment==0){
                            alert("seleccione un metodo de pago");
                        }else{
                        Productos = {'Proceso': 'PayProduct','IdUser': resp[0]['IDUser'],'Payment':methodPayment, "ObjectsJson": Productos22,'Total': TotalProduct};
                        //console.log(Productos,"Pradasdas");
                        $.ajax({
                            url: '../ecommerce/ajax/php_intermediate.php?acción=PayProduct',
                            method:"POST",
                            data:Productos,
                            //dataType: 'json',
                            success:function(respuesta){
                                console.log(respuesta);
                            }
                        });

                    };
                    }, false);
                  }, false);
            },
            error:function(error){
                console.log(error);
            }
        });
    }
    //new product
    
    if(URLactual=='/MyTienda%20Edwin/otherWebsite/ecommerce/NewProduct.html'){
        console.log("New Product");
        $.ajax({
            url: '../ecommerce/ajax/php_intermediate.php?acción=get_maker',
            type: 'POST',
            dataType: 'json',
            data:{ Proceso : 'get_makers'},
            success: function(resp){
                for(var i=0;i<resp.length;i++){
                    $('#FabricanteNewProduct-select').append($(`
                        <option value="${resp[i].Id}">${resp[i].Name_maker}</option>
                    `));
                }
            }
        });
        $.ajax({
            url: '../ecommerce/ajax/php_intermediate.php?acción=get_category',
            type: 'POST',
            dataType: 'json',
            data:{ Proceso : 'get_categorys'},
            success: function(resp){
                for(var i=0;i<resp.length;i++){
                    $('#CategoryProduct').append($(`
                        <option value="${resp[i].Id}">${resp[i].Description_category}</option>
                    `));
                }
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
    if(URLactual=='/MyTienda%20Edwin/otherWebsite/ecommerce/stocktaking.html'){
        console.log("almacen");
        //WarehouseContent
        $('#WarehouseContent').html($(``));
        $.ajax({
            url: '../ecommerce/ajax/php_intermediate.php?acción=ListProduct',
            type: 'POST',
            dataType: 'json',
            data:{ Proceso : 'ListProd'},
            success: function(resp){
                console.log(resp)
                for (var i=0; i<resp.length;i++){
                $('#WarehouseContent').append($(`
                    <div class="col-md-3 IntProduct">
                        <div class="product-item">
                            <div class="product-title">
                                <a href="#">${resp[i].Name_product}</a>
                                <span class="FabricanteStyle">(${resp[i].Name_maker})</span>
                            </div>
                            <div class="product-image">
                                <a href="product-detail.html">
                                    <img src="img/Products/${resp[i].Name_maker}/${resp[i].Name_product}/producto.png" alt="Product Image" style="height: 170px;width: auto;margin-left: auto;display: block;margin-right: auto;">
                                </a>
                                <div class="product-action">
                                    <a href="#"><i class="fa fa-cart-plus"></i></a>
                                    <a href="#"><i class="fa fa-heart"></i></a>
                                    <a href="#"><i class="fa fa-search"></i></a>
                                </div>
                            </div>
                            <div class="product-price">
                                <h3 style="color: white;font-size: 1.0rem;">Precio : $${resp[i].Price}</h3><br>
                                <h3 style="color: white;font-size: 1.0rem;">Descuento : $${resp[i].Discount}</h3><br>
                                <h3 style="color: white;font-size: 1.0rem;">Cantidad : ${resp[i].Quantity}</h3>
                            </div>
                        </div>
                    </div>
                `));
                $('#ProductListHTML').append($(`
                    <div class="col-md-4" onclick="ProductList(${resp[i].Id})">
                        <div class="product-item">
                            <div class="product-title">
                                <a href="#">${resp[i].Name_maker}</a>
                                <span class="FabricanteStyle"> (${resp[i].Name_product})</span><br>
                                <a href="#">${resp[i].Description_category}</a>
                            </div>
                            <div class="product-image">
                                <a href="product-detail.html">
                                    <img src="img/Products/${resp[i].Name_maker}/${resp[i].Name_product}/producto.png" alt="Product Image" style="height: 170px;width: auto;margin-left: auto;display: block;margin-right: auto;">
                                </a>
                                <div class="product-action" >
                                    <a href="#"><i class="fa fa-cart-plus"></i></a>
                                    <a href="#"><i class="fa fa-heart"></i></a>
                                    <a href="#"><i class="fa fa-search"></i></a>
                                </div>
                            </div>
                            <div class="product-price">
                                <h3><span>$</span>${resp[i].Price}</h3>
                                <a class="btn" href=""><i class="fa fa-shopping-cart"></i>Compra ahora</a>
                            </div>
                        </div>
                    </div>
                `));
            }
            }
        });
    };
    //Lenar tienda detalles
    if(URLactual=='/MyTienda%20Edwin/otherWebsite/ecommerce/Stores-Contents.html'){
        console.log("Detalles Productos");
        var IdProduct = sessionStorage.getItem("IdProduct");
        /*if (IdProduct == null){
            window.location.assign("../ecommerce/product-list.html");
        }*/
        $.ajax({
            url: '../ecommerce/ajax/php_intermediate.php?acción=ListProduct',
            type: 'POST',
            dataType: 'json',
            data:{ Proceso : 'ListProd'},
            success: function(resp){
                console.log('data-------------->',resp);
                for(var i=0;i<resp.length;i++){
                    if(resp[i]['Quantity']>10){
                        $('#ProductShoreHouseProduct').append($(`
                            <tr style="font-weight: 700;">
                                <td>${resp[i].Name_product}</td>
                                <td>${resp[i].Name_maker}</td>
                                <td>${resp[i].Quantity}</td>
                                <td>${resp[i].Price}</td>
                                <td><a href="#"><button class="btn" id="GenerarInfoPedido"  style=" width: auto; height: auto; ">Realizar Pedido</button></a></td>
                            </tr>
                        `));
                    };
                    if(resp[i]['Quantity']==0){
                        $('#ProductShoreHouseProduct').append($(`
                            <tr style="background: #FF0000;color: white;font-weight: 700;">
                                <td>${resp[i].Name_product}</td>
                                <td>${resp[i].Name_maker}</td>
                                <td>${resp[i].Quantity}</td>
                                <td>${resp[i].Price}</td>
                                <td><a href="#"><button class="btn" id="GenerarInfoPedido"  style=" width: auto; height: auto; color: #FF5555;border: 1px solid #FF5555;">Realizar Pedido</button></a></td>
                            </tr>
                        `));
                    };
                    if(resp[i]['Quantity']<=10 && resp[i]['Quantity']>=1){
                        $('#ProductShoreHouseProduct').append($(`
                            <tr style="background-color: #46D336;color: white;font-weight: 700;">
                                <td>${resp[i].Name_product}</td>
                                <td>${resp[i].Name_maker}</td>
                                <td>${resp[i].Quantity}</td>
                                <td>${resp[i].Price}</td>
                                <td><a href="#"><button class="btn" id="GenerarInfoPedido"  style=" width: auto; height: auto; color: #76DB33;">Realizar Pedido</button></a></td>
                            </tr>
                        `));
                    };
                    document.getElementById("GenerarInfoPedido").addEventListener("click", function( event ) {
                        /*if(methodPayment==0){
                            alert("seleccione un metodo de pago");
                        }else{
                        Productos = {'Proceso': 'PayProduct','IdUser': resp[0]['IDUser'],'Payment':methodPayment, "ObjectsJson": Productos22,'Total': TotalProduct};
                        //console.log(Productos,"Pradasdas");
                        $.ajax({
                            url: '../ecommerce/ajax/php_intermediate.php?acción=PayProduct',
                            method:"POST",
                            data:Productos,
                            //dataType: 'json',
                            success:function(respuesta){
                                console.log(respuesta);
                            }
                        });

                    };*/
                    console.log("EnviarProducto");
                    }, false);
                };
                /*$('#ProductShoreHouseProduct').append($(`
                    <tr style="font-weight: 700;">
                        <td>Camara</td>
                        <td>Sony</td>
                        <td>20</td>
                        <td>$399.99</td>
                        <td><a href=""><button class="btn" wfd-id="94" style=" width: auto; height: auto; ">Realizar Pedido</button></a></td>
                    </tr>
                    <tr style="background: #FF0000;color: white;font-weight: 700;">
                        <td>P30 Lite</td>
                        <td>Huawei</td>
                        <td>0</td>
                        <td>$500.00</td>
                        <td><a href=""><button class="btn" wfd-id="94" style=" width: auto; height: auto; color: #FF5555;border: 1px solid #FF5555;">Realizar Pedido</button></a></td>
                    </tr>
                    <tr style="font-weight: 700;">
                        <td>CAPA</td>
                        <td>REdPrint</td>
                        <td>1000</td>
                        <td>$5.99</td>
                        <td><a href=""><button class="btn" wfd-id="94" style=" width: auto; height: auto; ">Realizar Pedido</button></a></td>
                    </tr>
                    <tr style="font-weight: 700;">
                        <td>APPLE</td>
                        <td>IPhone X</td>
                        <td>15</td>
                        <td>$599.00</td>
                        <td><a href=""><button class="btn" wfd-id="94" style=" width: auto; height: auto; ">Realizar Pedido</button></a></td>
                    </tr>
                    <tr style="background-color: #46D336;color: white;font-weight: 700;">
                        <td>Hp</td>
                        <td>Asus</td>
                        <td>5</td>
                        <td>$500.00</td>
                        <td><a href=""><button class="btn" wfd-id="94" style=" width: auto; height: auto; color: #76DB33;">Realizar Pedido</button></a></td>
                    </tr>
                `));*/
            }
        });





        var TypeStores = sessionStorage.getItem("TypeStore"); 
        if(TypeStores==1){
            //LLenar Compras ajax
            $.ajax({
                url: '../ecommerce/ajax/php_intermediate.php?acción=ShoresBuy',
                //type: 'GET',
                type: 'POST',
                data:{ Proceso : 'ShoresBuyList',IDCliente : ID_USER,IDShores:TypeStores},
                success: function(resp){
                    console.log('data-------------->',resp);
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
                }
            });
        };
        if(TypeStores==2){
        };
        if(TypeStores==3){
        };
        if(TypeStores==4){
        };
        //llenado de inventario ajax
        /*$.ajax({
            url: '../ecommerce/ajax/php_intermediate.php?acción=ShoresStocktaking',
            //type: 'GET',
            type: 'POST',
            data:{ Proceso : 'ShoresStocktakingList',IDCliente : ID_USER,IDShores:TypeStores},
            success: function(resp){
                console.log('data-------------->',resp);
                $('#ProductShoreHouseProduct').append($(`
                    <tr style="font-weight: 700;">
                        <td>Camara</td>
                        <td>Sony</td>
                        <td>20</td>
                        <td>$399.99</td>
                        <td><a href=""><button class="btn" wfd-id="94" style=" width: auto; height: auto; ">Realizar Pedido</button></a></td>
                    </tr>
                    <tr style="background: #FF0000;color: white;font-weight: 700;">
                        <td>P30 Lite</td>
                        <td>Huawei</td>
                        <td>0</td>
                        <td>$500.00</td>
                        <td><a href=""><button class="btn" wfd-id="94" style=" width: auto; height: auto; color: #FF5555;border: 1px solid #FF5555;">Realizar Pedido</button></a></td>
                    </tr>
                    <tr style="font-weight: 700;">
                        <td>CAPA</td>
                        <td>REdPrint</td>
                        <td>1000</td>
                        <td>$5.99</td>
                        <td><a href=""><button class="btn" wfd-id="94" style=" width: auto; height: auto; ">Realizar Pedido</button></a></td>
                    </tr>
                    <tr style="font-weight: 700;">
                        <td>APPLE</td>
                        <td>IPhone X</td>
                        <td>15</td>
                        <td>$599.00</td>
                        <td><a href=""><button class="btn" wfd-id="94" style=" width: auto; height: auto; ">Realizar Pedido</button></a></td>
                    </tr>
                    <tr style="background-color: #46D336;color: white;font-weight: 700;">
                        <td>Hp</td>
                        <td>Asus</td>
                        <td>5</td>
                        <td>$500.00</td>
                        <td><a href=""><button class="btn" wfd-id="94" style=" width: auto; height: auto; color: #76DB33;">Realizar Pedido</button></a></td>
                    </tr>
                `));
            }
        });*/
        
    };
    //LLenado informacion usuario
    if(URLactual=='/MyTienda%20Edwin/otherWebsite/ecommerce/paymentWithAccount.html'){
        console.log("Usuarios");
        $.ajax({
            url: '../ecommerce/ajax/php_intermediate.php?acción=User',
            method: 'POST',
            dataType: 'json',
            data:{Proceso : 'Users', NameUser :  ""},
            success: function(data){
                console.log(data);
                for(var i=0;i<data.length;i++){
                    $('#ListUser').append($(`
                        <tr>
                            <td>000${data[i].Id}</td>
                            <td>${data[i].Name_Customer}</td>
                            <td>User</td>
                            <td id="DisplayButoon">
                            <input id="ValidetYesUser" onclick="habilitartextUserpermiso(${data[i].Id})" type="button" class="btn" value="ADD">
                            </td>
                            <td><input type="text" id="Text_${data[i].Id}" disabled></td>
                            <td><input type="button"  onclick="AutorizarCuenta(${data[i].Id})" class="button-user" value="Autorizar"></td>
                        </tr>
                    `));
                };
                document.getElementById("SeeUser").addEventListener("click", function( event ) {
                    console.log("entro");
                    $.ajax({
                        url: '../ecommerce/ajax/php_intermediate.php?acción=Users',
                        method: 'POST',
                        dataType: 'json',
                        data:{Proceso : 'UserAll', NameUser :  $('#text-user').val()},
                        success:function(respuesta){
                            console.log(respuesta);
                            for(var i=0;i<respuesta.length;i++){
                                $('#ListUser').html($(`
                                    <tr>
                                        <td>000${respuesta[i].Id}</td>
                                        <td>${respuesta[i].Name_Customer}</td>
                                        <td>User</td>
                                        <td id="DisplayButoon">
                                        <input id="ValidetYesUser" onclick="habilitartextUserpermiso(${respuesta[i].Id})" type="button" class="btn" value="ADD">
                                        </td>
                                        <td><input type="text" id="Text_${respuesta[i].Id}" disabled></td>
                                        <td><input type="button"  onclick="AutorizarCuenta(${respuesta[i].Id})" class="button-user" value="Autorizar"></td>
                                    </tr>
                                `));
                            };
                        }
                    });
                }, false);//text-user
            }
        }); 
    };
    
})

// envio de datos para habilitar el ingreso al sistema por medio de Login
//se envia Login/Email y contraseña
function Logiarse(){
    if($('#login').val()!="" && $('#password').val() !=""){
    $.ajax({
        url: '../ecommerce/ajax/php_intermediate.php?acción=Login',
        method: 'POST',
        dataType: 'json',
        data:{Proceso : 'Login', User :  $('#login').val(), Contraseña : $('#password').val()},
        success: function(data){
            console.log(((data)));
            if(data == false){
                $('#VoidFields').html($(`<span>Contraseña o usuario incorrecto</span>`));
            }
            else{
            localStorage.setItem('IDUser', data['Id']);
            localStorage.setItem('NameUser', data['Name_Customer']);
            window.location.assign("../ecommerce/index.html");
            };
        }
       });
    }
    else{
        $('#VoidFields').html($(`<span>Campos Vacios</span>`));
    }
 
    
}
//onclick para detalles de productos
function ProductList(X){
    var IdProducto = X;
    console.log(IdProducto);
    window.location.assign("../ecommerce/product-detail.html");
    sessionStorage.setItem("IdProduct",IdProducto)
}
//LLenado del compras del cliente online  
function LLenarCompras(){
    var ID_USER = localStorage.getItem('IDUser');
    console.log(ID_USER);
        $.ajax({
            url: '../ecommerce/ajax/php_intermediate.php?acción=invoices',
            type: 'POST',
            dataType:'json',
            data:{ Proceso : 'invoices',IDCliente : ID_USER},
            success: function(resp){
                console.log('data-------------->',resp)
                var Totals = 0;
                for(var i=0;i<resp.length;i++){
                    Totals = Totals + (resp[i]['Price']*resp[i]['Quantity']);
                    $('#COntentBuysList').append($(`
                        <tr>
                            <td>${i+1}</td>
                            <td>${resp[i].name_product}</td>
                            <td></td>
                            <td>$${resp[i].Price}</td>
                            <td>${resp[i].Quantity}</td>
                        </tr>
                    `));
                };
                console.log(Totals);
                $('#TotalBuyslist').append($(`<span>${Totals}</span>`));
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
    var parametros = [];
    var combo1 = document.getElementById("FabricanteNewProduct-select");
    var Fabricante = combo1.options[combo1.selectedIndex].text;
    var discount12 = $('#DesProduct').val();
    var Quantity12 = $('#QuantityProduct').val();
    var combo2 = document.getElementById("CategoryProduct");
    var Categorys = combo2.options[combo2.selectedIndex].text;
    console.log();
    if($('#PriceProduct').val()>0){
        if(discount12==""){
            discount12=0;
        }else{
            discount12=parseFloat(discount12);
        };
        if(Quantity12==""){
            Quantity12=0;
        }else{
            Quantity12=Quantity12;
        };
        console.log(discount12,Quantity12);
    parametros = {'Proceso': 'UpProductone','NameProduct' : $('#NameProduct').val(), 'Producer' : parseFloat($('#FabricanteNewProduct-select').val()), 'Price' : parseFloat($('#PriceProduct').val()),
        'Discount' : discount12, 'Quantity' : parseFloat(Quantity12), 'Category' : parseFloat($('#CategoryProduct').val())
    };
    console.log(parametros);
    $.ajax({
        url: '../ecommerce/ajax/php_intermediate.php?acción=UpProduct',
        method: 'POST',
        data: parametros,
        //dataType: 'json',
        success: function(resp){
            console.log('data-------------->',resp)
        }
    });
    };
    var data = [];
    var URL = document.getElementById('inputGroupFile01').files[0].name;
    console.log(URL);
    data = {'Url': "../img/Products/",'NameProductos' : $('#NameProduct').val(), 
        'Producer' : Fabricante, 'image': URL};
    console.log(data);
    $.ajax({
        url: '../ecommerce/ajax/php_intermediate.php?acción=UpPhotoProduct',
        method: 'POST',
        data: data,
        //dataType: 'json',
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
function SaveCart(IdProduct,Name_maker,Name_product,Price){
    //SELXQuantity
    console.log($('#SELXQuantity').val());
    var IdUser = localStorage.getItem("IDUser");
    IdUser = parseFloat(IdUser);
    console.log(IdUser);
    var Quantity = $('#SELXQuantity').val();
    Quantity = parseFloat(Quantity);
    var ADDCART = {
        'Id': IdUser,
        'IdProducts': IdProduct,
        'NameProduct': Name_product,
        'Producer': Name_maker,
        'Price': Price,
        'Quantity': Quantity
    };
    console.log("ADD A CART",ADDCART);
    $.ajax({
        url: '../ecommerce/ajax/php_intermediate.php?acción=ADDCart',
        method:"POST",
        data:ADDCART,
        //dataType: 'json',
        success:function(respuesta){
            console.log(respuesta);
        }
    });
}
//deplegar info para el pago

function PayObjectCart(X){
    //console.log(X);
    var Productos = [];
    var ID_USER = localStorage.getItem('IDUser');
    var Datas = 
        'IdUser='+ ID_USER;
    $.ajax({
        url: '../ecommerce/ajax/php_intermediate.php?acción=Cart',
        dataType: "json",
        data:Datas,
        type: "POST",
        success:function(resp){
            var Total = resp[X]['Price']*resp[X]['Quantity'];
            
            $('#PayProduct').html(`
                <div class="cart-content">
                    <h1>Compra De Producto</h1>
                    <h1>${resp[X]['Producer']} ${resp[X]['NameProduct']}</h1>
                    <p>Sub Total<span>$${Total}</span></p>
                    <p>Costo de envío<span>$No Envio</span></p>
                    <h2>Total<span>$${Total}</span></h2>
                </div>
                <div class="cart-btn">
                    <a href="javascript:document.location.reload()"><button><i class="fa fa-clock-o"></i> Update Carrito</button></a>
                    <button id="SendInvoiceone"><i class="fa fa-shopping-bag"></i> Realizar Compras</button>
                </div>
                <div class="payment-methods">
                    <h4>Métodos de pago</h4>
                    <div class="payment-methodH">
                        <div class="custom-control custom-radio">
                            <input type="radio" class="custom-control-input" onclick="DatosPago(11)" id="payment-1" name="payment">
                            <label class="custom-control-label" for="payment-1"><i class="fa fa-credit-card"></i> Paypal</label>
                        </div>
                        <div id="contentPaymet-1">
                        <!--Contenido de paypal--> 
                        </div>
                    </div>
                    <div class="payment-methodH">
                        <div class="custom-control custom-radio">
                            <input type="radio" class="custom-control-input" onclick="DatosPago(22)" id="payment-3" name="payment">
                            <label class="custom-control-label" for="payment-3"><i class="fa fa-shopping-basket"></i> Pago con Cuenta</label>
                        </div>
                        <div class="payment-contentH" id="payment-3-show">
                            <!--Contenido de Cuentas empresas-->
                            
                        </div>
                    </div>
                </div>
            `);
            document.getElementById("SendInvoiceone").addEventListener("click", function( event ) {
                if(methodPayment==0){
                    alert("seleccione un metodo de pago");
                }else{
                console.log("metodos de pago",methodPayment);
                Productos = {'Proceso': 'PayProduct','IdUser': resp[0]['IDUser'],'Payment':methodPayment, "ObjectsJson": resp[X],'Total': Total};
                console.log(Productos);
                $.ajax({
                    url: '../ecommerce/ajax/php_intermediate.php?acción=PayProduct',
                    method:"POST",
                    data:Productos,
                    dataType: 'json',
                    success:function(respuesta){
                        console.log(respuesta);
                    }
                });
            };
              }, false);
        },
        error:function(error){
            console.log(error);
        }
    });
}
function SendNewUserNor(){
    $.ajax({
        url: '../ecommerce/ajax/php_intermediate.php?acción=NewUser',
        method:"POST",
        data:{Proceso : 'NewUserOne', Name : $('#nameUser').val() , Password : $('#passwordI').val()},
        dataType: 'json',
        success:function(respuesta){
            console.log(respuesta);
        }
    });
    alert("Usuario insertado");
    location.reload();
}

function AutorizarCuenta(IdUsers){
    console.log(IdUsers);
    var Datas ={
        'Proceso' : 'set_payment_bank',
        'IdUser' : IdUsers,
        'TypePayment': 2,
        'NumberAcount': $('#Text_'+IdUsers).val()};
    console.log(Datas);
    $.ajax({
        url: '../ecommerce/ajax/php_intermediate.php?acción=RegisterBank',
        //dataType: "json",
        data:Datas,
        type: "POST",
        success:function(resp){
            console.log(resp);
        }
    });
}
//no terminado
function habilitartextUserpermiso(X){
    console.log(X);
    document.getElementById("Text_"+X).disabled = false;
}
var NumberCarts , cuentaCarts;
function BuyNow(Id,Price){
    //Payment-BuyNow
    $('#Payment-BuyNow').html(`
        <h4>Métodos de pago</h4>
        <div id="SelectPay">

        </div>
        <div class="payment-methodH">
            <div class="custom-control custom-radio">
                <input type="radio" class="custom-control-input" onclick="DatosPago(11)" id="payment-1" name="payment">
                <label class="custom-control-label" for="payment-1"><i class="fa fa-credit-card"></i> Paypal</label>
            </div>
            <div id="contentPaymet-1">
            <!--Contenido de paypal--> 
            </div>
        </div>
        <div class="payment-methodH">
            <div class="custom-control custom-radio">
                <input type="radio" class="custom-control-input" onclick="DatosPago(22)" id="payment-3" name="payment">
                <label class="custom-control-label" for="payment-3"><i class="fa fa-shopping-basket"></i> Pago con Cuenta</label>
            </div>
            <div class="payment-contentH" id="payment-3-show">
                <!--Contenido de Cuentas empresas-->
                
            </div>
        </div> 
    `);
    var ID_user = localStorage.getItem('IDUser');
    ID_user = parseFloat(ID_user);
    var Quantity = $('#SELXQuantity').val();
    Quantity = parseFloat(Quantity);
    var Productos = [];
    var Productos22 = [];
    var TotalProduct= Quantity*Price;
    var Datas = 
        'IdUser='+ ID_user;
    Productos22[0] = {"id" : Id ,'price': Price,'quantity': Quantity};
    Productos = {'Proceso': 'PayProduct','IdUser': ID_user,'Payment':methodPayment, "ObjectsJson": Productos22,'Total': TotalProduct};
    
    if(methodPayment==0 || methodPayment==undefined){
        //alert("seleccione un metodo de pago");
        $('#SelectPay').html($(`
            <span style="color: red;">Nota: seleccione un metodo de pago</span>
        `));
    }else{
        Productos = {'Proceso': 'PayProduct','IdUser': ID_user,'Payment':methodPayment, "ObjectsJson": Productos22,'Total': TotalProduct};
        if( NumberCarts=='XXXX-XXXX-XXXX-XXXX' || cuentaCarts=='ejem: 123456789'){
            alert("agregue una tarjeta antes a su forma de pagos");
        }else{
            $.ajax({
                url: '../ecommerce/ajax/php_intermediate.php?acción=PayProduct',
                method:"POST",
                data:Productos,
                //dataType: 'json',
                success:function(respuesta){
                    console.log(respuesta);
                    alert("compra exitosa");
                    window.location.assign("index.html");
                }
            });
        };

    };
}
function PaymentCardSend(){
    console.log("entro");
    var ID_USER = localStorage.getItem('IDUser');
    //NumberCart,MMCart,YYCart,,NameCart,CCVCart   $('#SELXQuantity').val()
    ID_USER = parseFloat(ID_USER);
    var Datas ={
        'Proceso' : 'RegisterCard',
        'IdUser' : ID_USER,
        'TypePayment': 1,
        'NumberCart': $('#NumberCart').val(),
        'MMCart' : $('#MMCart').val(),
        'YYCart' : $('#YYCart').val(),
        'NameCart' : $('#NameCart').val(),
        'CCVCart' : $('#CCVCart').val()};
    console.log(Datas);
    $.ajax({
        url: '../ecommerce/ajax/php_intermediate.php?acción=RegisterCard',
        //dataType: "json",
        data:Datas,
        type: "POST",
        success:function(resp){
            console.log(resp);
        }
    });
}
