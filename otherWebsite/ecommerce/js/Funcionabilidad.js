//para iniciar datos u objetos cuando se recarga la pagina
$(document).ready(function() {
    $('#GeneUserArriba').html($(`
        <i class="fa fa-envelope"></i>
        mytiendat@developer.com 
        <i class="fa fa-user"></i>
        Edwin Quintero
        <i class=""></i>
    `));
})

// envio de datos para habilitar el ingreso al sistema por medio de Login
//se envia usuario/Email y contraseña
function Logiarse(){
    //console.log($('#login').val(),$('#password').val());
    var parametros =
    'Login='+$('#login').val()+"&"+
    'Contrasenia='+$('#password').val();
    console.log(parametros);
    //direccionar pagina
   // window.location.assign("../ecommerce/index.html");


    $.ajax({
        url:"../ecommerce/ajax/main.py/ajax-login?",
        method:"POST",
        type:'POST',
        dataType:"json",
        data:parametros,
        success:function(respuesta){
            console.log(respuesta);
        },
        error:function(respuesta){
            console.log("error");
        }
    });
    
     /*url: "/obtener_post",
                type: "POST",
                data: data,
                processData: false,
                contentType: false,
                beforeSend: function
    */
}

