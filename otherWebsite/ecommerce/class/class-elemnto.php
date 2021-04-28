<?php
    class Elemento{
        protected $IDUser;
        protected $IdProducts;
        protected $NameProduct;
        protected $Producer;
        protected $Price;
        protected $Quantity;

        public function __construct(
            $Id,
            $IdProducts,
            $NameProduct,
            $Producer,
            $Price,
            $Quantity

        ){
            $this->Id= $Id;
            $this->IdProducts= $IdProducts;
            $this->NameProduct= $NameProduct;
            $this->Producer = $Producer;
            $this->Price= $Price;
            $this->Quantity= $Quantity;
        }
        public function __toString(){
            $a["Id"]=$this->Id;
            $a["IdProducts"]=$this->IdProducts;
            $a["NameProduct"]=$this->NameProduct;
            $a["Producer"]=$this->Producer;
            $a["Price"]=$this->Price;
            $a["Quantity"]=$this->Quantity;
            return json_encode($a);
        }

        public static function guardarCart(
        $Id,
        $IdCART,
        $NameProduct,
        $Fabricante,
        $Precio,
        $Cantidad){
            mkdir("../data/", 0777,true);
            $data = file_get_contents("../data/CART.json");
            $json_arr = json_decode($data, true);
            $indice = Count($json_arr);
            $codigo = $Indices + 1;
            $json_arr[] = array('IdCart'=>''.$codigo.'','IDUser'=>''.$Id.'','IdProducts'=>''.$IdCART.'','NameProduct'=>''.$NameProduct.'','Producer'=>''.$Fabricante.''
            ,'Price'=>''.$Precio.'','Quantity'=>''.$Cantidad.''
            );
            file_put_contents("../data/CART.json",json_encode($json_arr));
        }
        
        public static function verCart($IdUser){
            $archivo=json_decode(file_get_contents("../data/CART.json"),true);
            $dato=array();
            $indice=0;
            for($i=0;$i<count($archivo);$i++){
                if($IdUser==$archivo[$i]["IDUser"]){
                    $dato[$indice]=$archivo[$i];
                    $indice=$indice+1;
                }
            }
            return json_encode($dato);
        }
        public static function UpPhotoProduct($DATA){
            $URL = $DATA['Url'];
            $NameProduct = $DATA['NameProductos'];
            $Producer = $DATA['Producer'];
            $archivoSS = $DATA['image'];
            $dir = $URL.$Producer."/".$NameProduct;
            if(!file_exists($dir)){
                mkdir($dir,0777,true);
            };
            $fichero =  "C:/Users/edwin.quintero/Pictures/imagenesProduct/".$archivoSS;
            $nuevo_fichero = $dir."/producto.png";
            
            if (!copy($fichero, $nuevo_fichero)){
                echo "Error al copiar $fichero...\n";
            }
            return ($dir);
        }
    }
?>