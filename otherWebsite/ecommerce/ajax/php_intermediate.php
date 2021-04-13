<?php
  switch($_GET["acción"]){
    case 'Login':
      $arg = $_POST['Proceso'];
      $arg2 = $_POST['User'];
      $arg3 = $_POST['Contraseña'];
      
      exec("python main.py $arg $arg2 $arg3", $output);
      echo $output[0];
    break;
    case 'ListProduct':
      $arg = $_POST['Proceso'];
      exec("python main.py $arg" , $output);
      echo  $output[0];
    break;
    case 'DetailProduct':
      $arg = $_POST['Proceso'];
      $arg2 = $_POST['IdProducto'];
      exec("python main.py $arg $arg2" , $output);
      echo  $output[0];
    break;
    //Peticion para el carrito de compras
    case 'Cart':
      $arg = $_POST['Proceso'];
      $arg2 = $_POST['IDCliente'];
      exec("python main.py $arg $arg2" , $output);
      echo  $output[0];
    break;
    case 'invoices':
      $arg = $_POST['Proceso'];
      #$arg2 = $_POST['IdProducto'];
      $arg2 = $_POST['IDCliente'];
      exec("python main.py $arg $arg2" , $output);
      echo  $output[0];
    break;
    case 'Package':
      $arg = $_POST['Proceso'];
      $arg2 = $_POST['IDCliente'];
      exec("python main.py $arg $arg2" , $output);
      echo  $output[0];
    break;
    case 'PayPackageProduct':
      $arg = $_POST['Proceso'];
      $arg2 = $_POST['IDCliente'];
      $arg3 = $_POST['IDProducto'];
      exec("python main.py $arg $arg2 $arg3" , $output);
      echo  $output[0];
    break;
    case 'UpProduct':
      $arg = $_POST['Proceso'];
      $arg2 = $_POST['NameProduct'];
      $arg3 = $_POST['Producer'];
      $arg4 = $_POST['Price'];
      $arg5 = $_POST['Discount'];
      $arg6 = $_POST['Quantity'];
      $arg7 = $_POST['Category'];
      $arg8 = $_POST['Description'];
      $arg9 = $_POST['Specification'];
      exec("python main.py $arg $arg2 $arg3 $arg4 $arg5 $arg6 $arg7 $arg8 $arg9" , $output);
      echo  $output[0];
    break;
  };
?>






