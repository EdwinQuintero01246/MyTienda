//para iniciar datos u objetos cuando se recarga la pagina
$(document).ready(function() {
    //Interractidad pagian de Store contenido
    var URLactual = window.location.pathname;
    if(URLactual=='/MyTienda%20Edwin/otherWebsite/ecommerce/Stores-Contents.html'){
        var TypeStores = sessionStorage.getItem("TypeStore"); 
        if(TypeStores==1){
            $('#AddressStoreContents').append($(`<li class="breadcrumb-item active">Tiendas Físicas</li>`));
            $('#StoresConteTiendaTitle').html($(`
                <h2 class="title col-4">Tienda Numero #</h2>
                <div class="dropdown col-3" wfd-id="140">
                    <div class="dropdown-toggle2" data-toggle="dropdown" style=" margin-bottom: 12px; " wfd-id="142">seleccione la tienda</div>
                    <div class="dropdown-menu dropdown-menu-right" wfd-id="141">
                        <a href="#1" class="dropdown-item">Tienda # 1</a>
                        <a href="#2" class="dropdown-item">Tienda # 2</a>
                        <a href="#3" class="dropdown-item">Tienda # 3</a>
                    </div>
                </div>
            `));
            $('#StoresConteTiendaBuy').html($(`
                <h2 class="col-12">Compras</h2>
                <input class="col-lg-3 form-control" type="text" name="" id="" placeholder="Nombre Producto">
                <input class="col-lg-3 form-control" type="text" name="" id="" placeholder="Fabricante">
                <input class="col-lg-2 form-control" type="number" name="" id="" placeholder="Precio" disabled>
                <input class="col-lg-2 form-control" type="number" name="" id="" placeholder="Cantidad">
                <button class="col-lg-2 btn12">Generar Compra</button>
            `));
            $('#DetailStoresConteTiendaBuy').html($(`
                <table class="table table-bordered col-lg-12">
                    <thead class="thead-dark">
                        <tr>
                            <th>Nombre Productos</th>
                            <th>Fabricante</th>
                            <th>Cantidad existencia</th>
                            <th>Precio de venta</th>
                        </tr>
                    </thead>
                    <tbody class="align-middle" id="ProductShoreHouseBUY">
                        
                    </tbody>
                </table>
            `));
        };
        if(TypeStores==2){
            $('#AddressStoreContents').append($(`<li class="breadcrumb-item active">Empresas</li>`))
            document.getElementById('DetailStoresConteTiendaBuy').style.display = "none";
        };
        if(TypeStores==3){
            $('#AddressStoreContents').append($(`<li class="breadcrumb-item active">Tiendas En Línea</li>`))
            document.getElementById('DetailStoresConteTiendaBuy').style.display = "none";
        };
        if(TypeStores==4){
            $('#AddressStoreContents').append($(`<li class="breadcrumb-item active">Fabricantes</li>`))
            document.getElementById('DetailStoresConteTiendaBuy').style.display = "none";
        };
        if(TypeStores==1 || TypeStores ==2 || TypeStores ==3){
        $('#DetailStoresStoreHouse').html($(`
            <h2 class="col-12">Inventario</h2>
            <table class="table table-bordered col-lg-12">
                <thead class="thead-dark">
                    <tr>
                        <th>Nombre Productos</th>
                        <th>Fabricante</th>
                        <th>Cantidad existencia</th>
                        <th>Precio de venta</th>
                        <th>Pedido</th>
                    </tr>
                </thead>
                <tbody class="align-middle" id="ProductShoreHouseProduct">
                    
                </tbody>
            </table>
        `));
        };
        if(TypeStores==4){
            $('#DetailStoresStoreHouse').html($(`
                <h2 class="col-12">Mi Almacen</h2>
                <table class="table table-bordered col-lg-12">
                    <thead class="thead-dark">
                        <tr>
                            <th>Nombre Productos</th>
                            <th>Fabricante</th>
                            <th>Cantidad existencia</th>
                            <th>Precio de venta</th>
                            <th>Pedido</th>
                        </tr>
                    </thead>
                    <tbody class="align-middle" id="ProductShoreHouseProduct">
                        
                    </tbody>
                </table>
            `));
            $('#OrderProducerStoresCont').html($(`
                <h2 class="col-lg-12">Pedido Fabricante</h2>
                <input class="col-lg-6 form-control" type="text" name="" id="" placeholder="Nombre Producto">
                <input class="col-lg-6 form-control" type="text" name="" id="" placeholder="Fabricante">
                <input class="col-lg-3 form-control" type="number" name="" id="" placeholder="Cantidad">
                <button class="col-lg-9 btn12">Generar Pedido</button>
        `));
        };     
    };


})
//funcion interactiva de newProducto cuando se realize algun cambio esto esta en nuevo producto, con un onchange()
function CambioDatosNewProduct(){
    //ver como se mira en nombre del producto 
    $('#NombreProducto').html($(`<h2 id="NombreProducto">${$('#NameProduct').val()}</h2>`));
    //ver como se mira en nombre del fabricante 
    var combo = document.getElementById("FabricanteNewProduct-select");
    var selected = combo.options[combo.selectedIndex].text;
    $('#FabricanteStyle2-1').html($(`<h4 id="FabricanteStyle2-1">${selected}</h4>`));
    //ver como se mira el precio 
    $('#PrecioProducto').html($(`<p id="PrecioProducto">$${$('#PriceProduct').val()}<span id="DescuentoProducto"></span></p>`));
    //ver como se mira el descuento
    $('#DescuentoProducto').html($(`<span id="DescuentoProducto">$ ${$('#DesProduct').val()}</span>`));
    //ver como se mira Cantidad para este producto 
    $('#CantidadProducto').val($('#QuantityProduct').val());
    //ver como se mira la descripcion de este producto
    $('#DescripciónProducto').html($(`<p id="DescripciónProducto">${$('#DescriptionProduct').val()}</p>`));
}
//funcion interactiva de newProducto cuando se realize algun cambio 
function CambioDatosNewProductEsp(){
    //ver como se mira la especificación de este producto
    $('#SpecificProduct').append($(`<li>${$('#EspProduct').val()}</li>`));
    //$('#EspProduct').val('');
}

//funcion el que realiza las talla de este producto, el cual habilita o deshabilita cada una 
//dependiendo el parametro que le hemos enviado
function ProductSize(x){
    var XX=x;
    //$('#AddTalla').html($(``));
    if(XX==1){
        $('#AddTalla').append($(`<button type="button" class="btn">U</button>`));
        document.getElementById("btn-size-Unica").disabled = true;
        document.getElementById("btn-size-Pequeña").disabled = true;
        document.getElementById("btn-size-Mediana").disabled = true;
        document.getElementById("btn-size-Grande").disabled = true;
        document.getElementById("btn-size-Extra").disabled = true;
        document.getElementById("btn-size-Ninguna").disabled = true;
    }
    if(XX==2){
        $('#AddTalla').append($(`<button type="button" class="btn">S</button>`));
        document.getElementById("btn-size-Pequeña").disabled = true;
        document.getElementById("btn-size-Unica").disabled = true;
        document.getElementById("btn-size-Ninguna").disabled = true;
    }
    if(XX==3){
        $('#AddTalla').append($(`<button type="button" class="btn">M</button>`));
        document.getElementById("btn-size-Mediana").disabled = true;
        document.getElementById("btn-size-Unica").disabled = true;
        document.getElementById("btn-size-Ninguna").disabled = true;
    }
    if(XX==4){
        $('#AddTalla').append($(`<button type="button" class="btn">L</button>`));
        document.getElementById("btn-size-Grande").disabled = true;
        document.getElementById("btn-size-Unica").disabled = true;
        document.getElementById("btn-size-Ninguna").disabled = true;
    }
    if(XX==5){
        $('#AddTalla').append($(`<button type="button" class="btn">XL</button>`));
        document.getElementById("btn-size-Extra").disabled = true;
        document.getElementById("btn-size-Unica").disabled = true;
        document.getElementById("btn-size-Ninguna").disabled = true;
    }
    if(XX==6){
        $('#AddTalla').append($(`<button type="button" class="btn">N</button>`));
        document.getElementById("btn-size-Ninguna").disabled = true;
        document.getElementById("btn-size-Unica").disabled = true;
        document.getElementById("btn-size-Pequeña").disabled = true;
        document.getElementById("btn-size-Mediana").disabled = true;
        document.getElementById("btn-size-Grande").disabled = true;
        document.getElementById("btn-size-Extra").disabled = true;
    }
}



//funcion el que realiza el color de este producto, el cual habilita o deshabilita cada una 
//dependiendo el parametro que le hemos enviado
function ProductColor(x){
    var XX=x;
    if(XX==1){
        $('#AddColor').append($(`<button type="button" class="btn">White</button>`));
        document.getElementById("btn-Color-Blanco").disabled = true;
    }
    if(XX==2){
        $('#AddColor').append($(`<button type="button" class="btn">Black</button>`));
        document.getElementById("btn-Color-Negro").disabled = true;
    }
    if(XX==3){
        $('#AddColor').append($(`<button type="button" class="btn">Blue</button>`));
        document.getElementById("btn-Color-Azul").disabled = true;
    }
    if(XX==4){
        $('#AddColor').append($(`<button type="button" class="btn">Red</button>`));
        document.getElementById("btn-Color-Rojo").disabled = true;
    }
    if(XX==5){
        $('#AddColor').append($(`<button type="button" class="btn">Yellow</button>`));
        document.getElementById("btn-Color-Amarillo").disabled = true;
    }
    if(XX==6){
        $('#AddColor').append($(`<button type="button" class="btn">Green</button>`));
        document.getElementById("btn-Color-Verde").disabled = true;
    }
    if(XX==7){
        $('#AddColor').append($(`<button type="button" class="btn">Pink</button>`));
        document.getElementById("btn-Color-Rosado").disabled = true;
    }
    if(XX==8){
        $('#AddColor').append($(`<button type="button" class="btn">Orange</button>`));
        document.getElementById("btn-Color-Naranja").disabled = true;
    }if(XX==9){
        $('#AddColor').append($(`<button type="button" class="btn">Purple</button>`));
        document.getElementById("btn-Color-Morado").disabled = true;
    }if(XX==10){
        $('#AddColor').append($(`<button type="button" class="btn">IMG</button>`));
        document.getElementById("btn-Color-Imagen").disabled = true;
    }
}



// optiene esta variable si se habilita el checkbox, para realizar el descuento 
var checkbox = document.getElementById('discount');
//pasamos a realizar el evento
checkbox.addEventListener( 'change', function() {

    if(this.checked) {
        //si esta precionado realiza esta opción
       $('#DLInput').html($(`
            <label>Precio Anterior</label>
            <input id="DesProduct" class="form-control" onchange="CambioDatosNewProduct()" type="number" placeholder="Precio Anterior">
       `));
       
    $('#PrecioProducto').html($(`<p id="PrecioProducto">${$('#PriceProduct').val()}<span id="DescuentoProducto"></span></p>`));
    $('#DescuentoProducto').html($(`<span id="DescuentoProducto">$ ${$('#DesProduct').val()}</span>`));
    }else{
        $('#DLInput').html($(`
            <label>Precio Anterior</label>
            <input id="DesProduct" disabled class="form-control" onchange="CambioDatosNewProduct()" type="number" placeholder="Precio Anterior">
       `));
    }
});

// optiene esta variable si se habilita el checkbox, para realizar la información extra 
var checkbox = document.getElementById('Info-xtra');
//pasamos a realizar el evento
checkbox.addEventListener( 'change', function() {
    if(this.checked) {
        //si esta precionado realiza esta opción
       $('#DesText').html($(`
       <textarea class="textareas" id="DescriptionProduct" onchange="CambioDatosNewProduct()" placeholder="Descripción"></textarea>
       `));
       $('#EspText').html($(`
       <textarea class="textareas" id="EspProduct" onchange="CambioDatosNewProductEsp()" placeholder="Especificación"></textarea>
       `));
    }else{
        $('#DesText').html($(`
            <textarea class="textareas" id="DescriptionProduct" onchange="CambioDatosNewProduct()" disabled placeholder="Descripción"></textarea>  
        `));
        $('#EspText').html($(`
        <textarea class="textareas" id="EspProduct" disabled onchange="CambioDatosNewProductEsp()" placeholder="Especificación"></textarea>
        `));
    }
});

//esta es para habilitar los formas de pagos, ya sea paypal, cuenta o tranferencia de bancos. cuando se realiza el evento de un click
function DatosPago(x){
    $('#SelectPay').html($(``));
    var XX=x;
    if (XX==1){
        //si es uno se realiza el metodo de pago Paypal
        $('#payment-4-show').html($(``));
        $('#payment-3-show').html($(``));
        $('#contentPaymet-1').html($(`
            <div class="payment-contentH col-xl-6 col-lg-8 col-md-8 col-sm-12" id="payment-1-show" style=" background-color: #F5F5F5; padding: 12px; border-radius: 11px; ">
            <!--Formulario tarjeta de credito-->
            <form action="#" class="credit-card-div">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <div class="row ">
                            <div class="col-md-12">
                                <input type="text" Id="NumberCart" class="form-control" placeholder="Ingrese el número de tarjeta" />
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-md-3 col-sm-3 col-xs-3">
                                <span class="help-block text-muted small-font" > Mes de venc.</span>
                                <input type="text" Id="MMCart" class="form-control" placeholder="MM" />
                            </div>
                            <div class="col-md-3 col-sm-3 col-xs-3">
                                <span class="help-block text-muted small-font" >  Año de venc.</span>
                                <input type="text" Id="YYCart" class="form-control" placeholder="YY" />
                            </div>
                            <div class="col-md-3 col-sm-3 col-xs-3">
                                <span class="help-block text-muted small-font" >  CCV</span>
                                <input type="text" Id="CCVCart" class="form-control" placeholder="CCV" />
                            </div>
                            <div class="col-md-3 col-sm-3 col-xs-3">
                                <img src="img/1.png" style=" width: 50%; padding: 0px;" class="img-rounded" />
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-md-12 pad-adjust">
                                <input type="text" Id="NameCart" class="form-control" placeholder="Nombre en la Tarjeta" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 pad-adjust">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" checked class="text-muted"> Guardar detalles para pagos <a href="#"> ¿Aprender Como ?</a>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-md-6 col-sm-6 col-xs-6 pad-adjust">
                                <input type="submit"  class="btn btn-danger" value="Cancelar" />
                            </div>
                            <div class="col-md-6 col-sm-6 col-xs-6 pad-adjust">
                                <input type="button" onclick="PaymentCardSend()" class="btn btn-warning btn-block" value="Registar" />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <!--Formulario tarjeta de credito fin-->
        </div>
        `));
        var ID_USER = localStorage.getItem('IDUser');
        Datas = {'Proceso': 'GetPaypal','IdUser': ID_USER};
        $.ajax({
            url: '../ecommerce/ajax/php_intermediate.php?acción=GetPaypal',
            method:"POST",
            data:Datas,
            dataType: 'json',
            success:function(respuesta){
                //console.log(respuesta);
                $('#NumberCart').val(respuesta[0]['Number_tarjet']);
                $('#MMCart').val(respuesta[0]['Mm']);
                $('#YYCart').val(respuesta[0]['Yy']);
                $('#NameCart').val(respuesta[0]['Name_tarjet']);
                $('#CCVCart').val(respuesta[0]['Ccv']);
            }
        }); 
    }if (XX==2){
        //si es dos se realiza el metodo de pago cuenta con la empresa
        $('#contentPaymet-1').html($(``));
        $('#payment-4-show').html($(``));
        $('#payment-3-show').html($(`
            <div class="container col-xl-9 Transferencia-Central">
                <div class="row">
                    <div class="row col-12 Transferencia-dou">
                        <div class="col-12 Transferencia-banner">
                            <p>Facturas Por Numero De Cuentas</p>
                        </div>
                        <div class="col-4 TextTranfer">
                            <p>Numero de cuenta a facturar</p>
                        </div>
                        <div class="col-8">
                            <input type="text" class="col-10" name="" id="cuentaCarts" disabled Value="ejem: 123456789">
                        </div>
                    </div>
                </div>
            </div>`
        ));
        var ID_USER = localStorage.getItem('IDUser');
        Datas = {'Proceso': 'GetBuyBank','IdUser': ID_USER};
        $.ajax({
            url: '../ecommerce/ajax/php_intermediate.php?acción=GetBuyBank',
            method:"POST",
            data:Datas,
            dataType: 'json',
            success:function(respuesta){
                //console.log(respuesta);
                $('#cuentaCarts').val(respuesta[0]['Number_bank']);
            }
        });
    }if (XX==3){
        //si es tres se realiza el metodo de pago por tranferencia bancaria
        $('#contentPaymet-1').html($(``));
        $('#payment-3-show').html($(``));
        $('#payment-4-show').html($(`
            <div class="container col-xl-9 Transferencia-Central">
                <div class="row">
                    <div class="row col-12 Transferencia-dou">
                        <div class="col-12 Transferencia-banner">
                            <p>Transferencia Bancaria</p>
                        </div>
                        <div class="col-4 TextTranfer Pad">
                            <p>Tipo</p>
                        </div>
                        <div class="col-8 Pad">
                            <input type="text" class="col-10" name="" id="" disabled value="Tranferencia">
                        </div>
                        <div class="col-4 TextTranfer">
                        <p>Referencia</p> 
                        </div>
                        <div class="col-8">
                            <input type="text" class="col-10" name="" id="Refe-Banck" placeholder="Ejem. P012234">
                        </div>
                        <div class="col-4 TextTranfer">
                            <p>Numero de cuenta</p>
                        </div>
                        <div class="col-8">
                            <input type="text" class="col-10" name="" id="NumberCuenta" placeholder="ejem: 123456789">
                        </div>
                        <div class="col-4 TextTranfer">
                            <p>Monto</p>
                        </div>
                        <div class="col-8">
                            <input type="text" class="col-10" id="AmountBack" disabled placeholder="10000.00">
                        </div>
                        <div class="col-12" style="text-align: center;padding-bottom: 12px;">
                            <input type="button" class="btn" value="Enviar">
                        </div>
                    </div>
                </div>
            </div>
        `));
    };
    if (XX==11){
        methodPayment = 1;
        //si es uno se realiza el metodo de pago Paypal
        $('#payment-4-show').html($(``));
        $('#payment-3-show').html($(``));
        $('#contentPaymet-1').html($(`
            <div class="payment-contentH col-xl-12 col-lg-12 col-md-8 col-sm-12" id="payment-1-show" style=" background-color: #F5F5F5; padding: 12px; border-radius: 11px; ">
            <!--Formulario tarjeta de credito-->
            <form action="#" class="credit-card-div">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <div class="row ">
                            <div class="col-md-12">
                                <input type="text" id="NumberCart" class="form-control" disabled value="XXXX-XXXX-XXXX-XXXX" />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <!--Formulario tarjeta de credito fin-->
        </div>
        `));
        var ID_USER = localStorage.getItem('IDUser');
        Datas = {'Proceso': 'GetPaypal','IdUser': ID_USER};
        $.ajax({
            url: '../ecommerce/ajax/php_intermediate.php?acción=GetPaypal',
            method:"POST",
            data:Datas,
            dataType: 'json',
            success:function(respuesta){
                NumberCarts = $('#NumberCart').val();
                if(respuesta.length==0){
                }else{
                    $('#NumberCart').val(respuesta[0]['Number_tarjet']);
                    //console.log($('#NumberCart').val());
                    NumberCarts = $('#NumberCart').val();
                }
            }
        });
    }if (XX==22){
        methodPayment = 2;
        //si es dos se realiza el metodo de pago cuenta con la empresa
        $('#contentPaymet-1').html($(``));
        $('#payment-4-show').html($(``));
        $('#payment-3-show').html($(`
            <div class="container col-xl-12 Transferencia-Central">
                <div class="row">
                    <div class="row col-12 Transferencia-dou">
                        <div class="col-8">
                            <input type="text" class="col-10" name="" id="cuentaCarts" disabled Value="ejem: 123456789">
                        </div>
                    </div>
                </div>
            </div>`
        ));
        var ID_USER = localStorage.getItem('IDUser');
        Datas = {'Proceso': 'GetBuyBank','IdUser': ID_USER};
        $.ajax({
            url: '../ecommerce/ajax/php_intermediate.php?acción=GetBuyBank',
            method:"POST",
            data:Datas,
            dataType: 'json',
            success:function(respuesta){
                cuentaCarts = $('#cuentaCarts').val();
                //console.log(cuentaCarts);
                if(respuesta.length==0){
                }else{
                    $('#cuentaCarts').val(respuesta[0]['Number_bank']);
                    //console.log($('#cuentaCarts').val());
                    cuentaCarts = $('#cuentaCarts').val();
                }
            }
        });
    }
}

//
function ValidarReGex(){
    console.log('entro');
    //console.log($('#login').val());
    //console.log($('#password').val());
}


const login = document.querySelector('#login');
const password = document.querySelector('#password');

//const regex = /[A-zA-Z0-9]\_\-\@\[a-zA-Z]\.\[a-zA-Z]{4,50}/g;
var loginX = document.getElementById('login');
loginX.addEventListener('change', e =>{
    
    const regex = /[0-9]{3}/g;
    const validationLogin = login.Value.match(regex);
    console.log(validationLogin);
});
//const formulario = document.getElementById('formulario');
//const inputs = document.querySelectorAll('#formulario input');


//querySelector('input[name="horario"]:checked')



function Passwordvalidet(X){
    var x1 = document.getElementById('passwordI');
    var x2 = document.getElementById('passwordII');
    if(X==1){
        //buttonPassword1
        x1.type = "text";
        x2.type = "text";
        var intro = document.getElementById('buttonPassword1');
        intro.style.display = "none";
        var intro2 = document.getElementById('buttonPassword2');
        intro2.style.display = "block";
    };
    if(X==2){
        x1.type = "password";
        x2.type = "password";
        var intro = document.getElementById('buttonPassword2');
        intro.style.display = "none";
        var intro2 = document.getElementById('buttonPassword1');
        intro2.style.display = "block";
    };
}
function HabilitarPassword(){
    var x1 = $('#passwordI').val();
    var x2 = $('#passwordII').val();
    if (x1==x2){
        var intro = document.getElementById('SendNewUser');
        intro.style.display = "block";
    }else{
        //SendNewUser
        var intro = document.getElementById('SendNewUser');
        intro.style.display = "none";
    }
}