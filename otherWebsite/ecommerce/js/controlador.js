$(document).ready(function() {
    console.log($('#NameProduct').val());
})
var Specific=[];
function CambioDatosNewProduct(){
    $('#NombreProducto').html($(`<h2 id="NombreProducto">${$('#NameProduct').val()}</h2>`));
    $('#PrecioProducto').html($(`<p id="PrecioProducto">${$('#PriceProduct').val()}<span id="DescuentoProducto"></span></p>`));
    $('#DescuentoProducto').html($(`<span id="DescuentoProducto">$ ${$('#DesProduct').val()}</span>`));
    $('#CantidadProducto').val($('#QuantityProduct').val());
    console.log($('#EspProduct').val());
    //console.log('hola');
    $('#DescripciónProducto').html($(`<p id="DescripciónProducto">${$('#DescriptionProduct').val()}</p>`));

}
function CambioDatosNewProductEsp(){
    
    $('#SpecificProduct').append($(`<li>${$('#EspProduct').val()}</li>`));
    $('#EspProduct').val('');
    //Specific=[{especificacion=$('#EspProduct').val('')}];
}
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
function ProductColor(x){
    var XX=x;
    //$('#AddTalla').html($(``));
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
var checkbox = document.getElementById('discount');
checkbox.addEventListener( 'change', function() {
    if(this.checked) {
       //alert('checkbox esta seleccionado');
       $('#DLInput').html($(`
            <label>Descuento</label>
            <input id="DesProduct" class="form-control" onchange="CambioDatosNewProduct()" type="number" placeholder="Descuento">
       `));
       
    $('#PrecioProducto').html($(`<p id="PrecioProducto">${$('#PriceProduct').val()}<span id="DescuentoProducto"></span></p>`));
    $('#DescuentoProducto').html($(`<span id="DescuentoProducto">$ ${$('#DesProduct').val()}</span>`));
    }else{
        $('#DLInput').html($(`
            <label>Descuento</label>
            <input id="DesProduct" disabled class="form-control" onchange="CambioDatosNewProduct()" type="number" placeholder="Descuento">
       `));
    }
});

var checkbox = document.getElementById('Info-xtra');
checkbox.addEventListener( 'change', function() {
    if(this.checked) {
       //alert('checkbox esta seleccionado');
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
function DatosPago(x){
    var XX=x;
    if (XX==1){
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
                                <input type="text" class="form-control" placeholder="Ingrese el número de tarjeta" />
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-md-3 col-sm-3 col-xs-3">
                                <span class="help-block text-muted small-font" > Mes de venc.</span>
                                <input type="text" class="form-control" placeholder="MM" />
                            </div>
                            <div class="col-md-3 col-sm-3 col-xs-3">
                                <span class="help-block text-muted small-font" >  Año de venc.</span>
                                <input type="text" class="form-control" placeholder="YY" />
                            </div>
                            <div class="col-md-3 col-sm-3 col-xs-3">
                                <span class="help-block text-muted small-font" >  CCV</span>
                                <input type="text" class="form-control" placeholder="CCV" />
                            </div>
                            <div class="col-md-3 col-sm-3 col-xs-3">
                                <img src="img/1.png" style=" width: 50%; padding: 0px;" class="img-rounded" />
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-md-12 pad-adjust">
                                <input type="text" class="form-control" placeholder="Nombre en la Tarjeta" />
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
                                <input type="submit"  class="btn btn-warning btn-block" value="Registar" />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <!--Formulario tarjeta de credito fin-->
        </div>
        `));
    }if (XX==2){
        $('#contentPaymet-1').html($(``));
        $('#payment-4-show').html($(``));
        $('#payment-3-show').html($(`
            <div class="container col-xl-9 Transferencia-Central">
                <div class="row">
                    <div class="row col-12 Transferencia-dou">
                        <div class="col-12 Transferencia-banner">
                            <p>Facturas Por Numero De Cuentas</p>
                        </div>
                        <div class="col-4 TextTranfer Pad">
                            <p>Empresa</p>
                        </div>
                        <div class="col-8 Pad">
                            <input type="text" class="col-10" name="" id="BuscarEmpresa" onchange="BuscarEmpresa()" placeholder="Buscar Empresa">
                        </div>
                        <div class="col-4 TextTranfer">
                        <p>Usuario</p> 
                        </div>
                        <div class="col-8">
                            <input type="text" class="col-10" name="" id="" disabled placeholder="Edwin Quintero">
                        </div>
                        <div class="col-4 TextTranfer">
                            <p>Numero de cuenta a facturar</p>
                        </div>
                        <div class="col-8">
                            <input type="text" class="col-10" name="" id="cuenta" placeholder="ejem: 123456789">
                        </div>
                        <div class="col-12" style="text-align: center;padding-bottom: 12px;">
                            <input type="button" class="btn" value="Enviar">
                        </div>
                    </div>
                </div>
            </div>`
        ));
    }if (XX==3){
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
    }
}


//querySelector('input[name="horario"]:checked')