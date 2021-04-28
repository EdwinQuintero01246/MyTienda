<?php
  switch($_GET["acción"]){
    case 'Login':
      $arg = $_POST['Proceso'];
      $arg2 = $_POST['User'];
      $arg3 = $_POST['Contraseña'];
      exec("python main.py $arg $arg2 $arg3", $return);
      echo ($return[0]);
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
    
    case 'invoices':
      $arg = $_POST['Proceso'];
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
    case 'UpPhotoProduct':
      include("../class/class-elemnto.php");
      echo Elemento::UpPhotoProduct($_POST);
    break;
    case 'ShoresBuy':
      $arg = $_POST['Proceso'];
      $arg2 = $_POST['IDCliente'];
      $arg3 = $_POST['IDShores'];
      exec("python main.py $arg $arg2 $arg3" , $output);
      echo  $output[0];
    break;
    case 'ShoresStocktaking':
      $arg = $_POST['Proceso'];
      $arg2 = $_POST['IDCliente'];
      $arg3 = $_POST['IDShores'];
      exec("python main.py $arg $arg2 $arg3" , $output);
      echo  $output[0];
    break;
    case 'ADDCart':
      include("../class/class-elemnto.php");
      echo Elemento::guardarCart($_POST['Id'],$_POST['IdProducts'],$_POST['NameProduct'],$_POST['Producer'],$_POST['Price'],$_POST['Quantity']);
    break;
    //Peticion para el carrito de compras
    case 'Cart':
      include("../class/class-elemnto.php");
      echo Elemento::verCart($_POST['IdUser']);
    break;
    case 'PayProduct':
      $arg = $_POST['Proceso'];
      $arg2 = $_POST['IdUser'];
      $arg3 = $_POST['Payment'];
      $arg4 = json_encode($_POST['ObjectsJson']);
      $arg5 = $_POST['Total'];
      exec("python main.py $arg $arg2 $arg3 $arg4 $arg5" , $output);
      echo  ($output[0]);
    break;
    case 'NewUser':
      $arg = $_POST['Proceso'];
      $arg2 = $_POST['Name'];
      $arg3 = $_POST['Password'];
      exec("python main.py $arg $arg2 $arg3" , $output);
      echo  $output[0];
    break;
    case 'User':
      $arg = $_POST['Proceso'];
      $arg2 = $_POST['NameUser'];
      exec("python main.py $arg ", $return);
      echo $return[0];
    break;
    case 'Users':
      $arg = $_POST['Proceso'];
      $arg2 = $_POST['NameUser'];
      exec("python main.py $arg $arg2", $return);
      echo $return[0];
    break;
    case 'UpProduct':
      $arg = $_POST['Proceso'];
      $arg2 = $_POST['NameProduct'];
      $arg3 = $_POST['Producer'];
      $arg4 = $_POST['Price'];
      $arg5 = $_POST['Discount'];
      $arg6 = $_POST['Quantity'];
      $arg7 = $_POST['Category'];
      exec("python main.py $arg $arg2 $arg3 $arg4 $arg5 $arg6 $arg7 ", $output);
      echo  $output[0];
      #print("entro");
    break;
    case 'get_maker':
      $arg = $_POST['Proceso'];
      exec("python main.py $arg ", $return);
      echo $return[0];
      #print("entro");
    break;
    case 'get_category':
      $arg = $_POST['Proceso'];
      exec("python main.py $arg ", $return);
      echo $return[0];
    break;
    case 'RegisterCard':
      $arg = $_POST['Proceso'];
      $arg2 = $_POST['IdUser'];
      $arg3 = $_POST['TypePayment'];
      $arg4 = $_POST['NumberCart'];
      $arg5 = $_POST['CCVCart'];
      $arg6 = $_POST['MMCart'];
      $arg7 = $_POST['YYCart'];
      $arg8 = $_POST['NameCart'];
      exec("python main.py $arg $arg2 $arg3 $arg4 $arg5 $arg6 $arg7 $arg8", $return);
      echo $return[0];
    break;
    case 'RegisterBank':
      $arg = $_POST['Proceso'];
      $arg2 = $_POST['IdUser'];
      $arg3 = $_POST['TypePayment'];
      $arg4 = $_POST['NumberAcount'];
      exec("python main.py $arg $arg2 $arg3 $arg4", $return);
      echo $return[0];
    break;
    case 'GetPaypal':
      $arg = $_POST['Proceso'];
      $arg2 = $_POST['IdUser'];
      exec("python main.py $arg $arg2 ", $return);
      echo $return[0];
    break;
    case 'GetBuyBank':
      $arg = $_POST['Proceso'];
      $arg2 = $_POST['IdUser'];
      exec("python main.py $arg $arg2 ", $return);
      echo $return[0];
    break;
  };//RegisterBank
?>






