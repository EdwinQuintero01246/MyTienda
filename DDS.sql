DROP DATABASE IF EXISTS  Ventas;
CREATE DATABASE Ventas CHARACTER SET utf8;
USE Ventas;

CREATE TABLE IF NOT EXISTS TipoCliente (
  IDTipoCiente INT AUTO_INCREMENT PRIMARY KEY,
  Tipo ENUM('online','tienda'),
  Descripcion VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Cliente (
  IDCliente INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(100),
  Apellifo VARCHAR(100),
  Telefono VARCHAR(100),
  correo VARCHAR(100),
  IDTipoCliente INT,
    FOREIGN KEY (IDTipoCliente) REFERENCES TipoCliente(IDTipoCiente) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Tarjeta (
  IDTarjeta INT AUTO_INCREMENT PRIMARY KEY,
  numero VARCHAR(100),
  nombre VARCHAR(100),
  Apellido VARCHAR(100),
  vencimiento TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  IDCliente INT,
  Tipo ENUM('Credito','Debito'),
  FOREIGN KEY (IDCliente) REFERENCES Cliente(IDCliente) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Tienda (
  IDTienda INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(100),
  Direccion VARCHAR(100),
  Telefono VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Fabricante (
  IDFabricante INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  descripcion VARCHAR(100),
  ubicacion VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Categoria (
  IDCategoria INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  Descripcion VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Producto (
  IDProducto INT AUTO_INCREMENT PRIMARY KEY,
  imagen BLOB NOT NULL,
  nombre VARCHAR(100),
  descripcion VARCHAR(100),
  precio NUMERIC,
  IDCategoria INT,
  IDFabricante INT,
  FOREIGN KEY (IDCategoria) REFERENCES Categoria(IDCategoria) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (IDFabricante) REFERENCES Fabricante(IDFabricante) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS PedidoCliente(
  IDPedidoCliente INT AUTO_INCREMENT PRIMARY KEY,
  IDCliente INT,
  IDTienda INT,
  IDProducto INT,
  Cantidad NUMERIC,
  fecha TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  FOREIGN KEY (IDCliente) REFERENCES Cliente(IDCliente) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (IDTienda) REFERENCES Tienda(IDTienda) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Factura (
  IDFactura INT AUTO_INCREMENT PRIMARY KEY,
  Cantidad NUMERIC,
  Precio NUMERIC,
  ISV DECIMAL(2,2),
  FechaEmisionFactura TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  IDPedidoCliente INT UNIQUE,
   FOREIGN KEY (IDPedidoCliente) REFERENCES PedidoCliente(IDPedidoCliente) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Contrato (
  IDContrato INT AUTO_INCREMENT PRIMARY KEY,
  fechaInicio TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  fechaFinal TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  IDCliente INT UNIQUE,
  IDTienda INT,
  cuenta VARCHAR(100),
  facturacion TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  FOREIGN KEY (IDCliente) REFERENCES Cliente(IDCliente) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (IDTienda) REFERENCES Tienda(IDTienda) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Venta (
  IDVenta INT AUTO_INCREMENT PRIMARY KEY,
  Descripcion VARCHAR(100),
  Fecha TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  IDFactura INT,
  FOREIGN KEY (IDFactura) REFERENCES Factura(IDFactura) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Remitente (
  IDRemitente INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(100),
  Apellifo VARCHAR(100),
  Direccion VARCHAR(100),
  Telefono VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS VentaPorRemitente (
  IDVenta INT,
  IDRemitente INT,
   FOREIGN KEY (IDVenta) REFERENCES Venta(IDVenta) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (IDRemitente) REFERENCES Remitente(IDRemitente) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Stock (
  IDStock INT AUTO_INCREMENT PRIMARY KEY,
  IdTienda INT UNIQUE,
  IDProducto INT,
  cantidad INT,
  FOREIGN KEY (IdTienda) REFERENCES Tienda(IdTienda) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (IDProducto) REFERENCES Producto(IDProducto) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Almacen (
  IDAlmacen INT AUTO_INCREMENT PRIMARY KEY,
  Direccion VARCHAR(100),
  Telefono VARCHAR(100),
  IDProducto INT,
  Cantidad INT,
  FOREIGN KEY (IDProducto) REFERENCES Producto(IDProducto) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Pedido (
  IDPedido INT AUTO_INCREMENT PRIMARY KEY,
  IdTienda INT,
  IDAlmacen INT,
  Cantidad NUMERIC,
  Estado ENUM('En progreso','Completado') NOT NULL,
  IDProducto INT,  
  FOREIGN KEY (IdTienda) REFERENCES Tienda(IdTienda) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (IDAlmacen) REFERENCES Almacen(IDAlmacen) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Paquete (
  IDPaquete INT AUTO_INCREMENT PRIMARY KEY,
  peso NUMERIC,
  altura NUMERIC,
  ancho NUMERIC,
  largo NUMERIC,
  Cantidad INT,
  IDProducto INT,
  FOREIGN KEY (IDProducto) REFERENCES Producto(IDProducto) ON DELETE CASCADE ON UPDATE CASCADE
);

 -- Busca si el cliente es en linea y si lo es retorna 1 con el id del cliente; sino retorna 0 y el id del cliente
DELIMITER $$ 
DROP PROCEDURE IF EXISTS sp_searchAdmin;
CREATE PROCEDURE sp_searchAdmin(
    IN idTarjeta INT, 
    IN idCliente INT, 
    IN numero VARCHAR(20), 
    IN nombre VARCHAR(20), 
    IN Apellido VARCHAR(20), 
    IN vencimiento VARCHAR(20), 
    IN tipo VARCHAR(20), 
    OUT result BIT,
    OUT id_user INT
)BEGIN
        DECLARE id_Cliente INT;
        DECLARE finished INT DEFAULT 0;

        DECLARE cursorUser
                CURSOR FOR 
                    SELECT IDCliente FROM Cliente;

        DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;

        OPEN cursorUser;
            getUser: LOOP 
                FETCH cursorUser INTO id_Cliente;
                IF finished = 1 THEN
                    LEAVE getUser;
                END IF;

                IF (id_Cliente = idCliente AND tipo = 1) THEN
                    SET result = 1;
                    SET idCliente = id_Cliente;
                    LEAVE getUser;
                ELSE 
                    SET result = 0;
                    SET idCliente = id_Cliente;
                END IF;
            END LOOP getUser;
        CLOSE cursorUser;  
END $$

---si el cliente tiene contrato debe pagar mensualmente con su numero de cuenta, si no su pago lo realiza con su tarjeta de credito o debito.
---retorona 1 si el cliente tiene contrato con el id del cliente, sino retorna 0 con su idcliente
DELIMITER $$ 
DROP PROCEDURE IF EXISTS sp_searchClient;
CREATE PROCEDURE sp_searchClient(
    IN idCliente INT,  
    OUT result BIT,
    OUT id_user INT
)BEGIN
        DECLARE id_Cliente INT;
        DECLARE finished INT DEFAULT 0;

        DECLARE cursorUser
                CURSOR FOR 
                    SELECT IDCliente FROM Contrato;

        DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;

        OPEN cursorUser;
            getUser: LOOP 
                FETCH cursorUser INTO id_Cliente;
                IF finished = 1 THEN
                    LEAVE getUser;
                END IF;

                IF (id_Cliente = idCliente) THEN
                    SET result = 1;
                    SET idCliente = id_Cliente;
                    LEAVE getUser;
                ELSE 
                    SET result = 0;
                    SET idCliente = id_Cliente;
                END IF;
            END LOOP getUser;
        CLOSE cursorUser;  
END $$

---retorna la cantidad total de producto que existe en el almacen con su id
DELIMITER $$ 
DROP PROCEDURE IF EXISTS sp_searchProductA;
CREATE PROCEDURE sp_searchProductA(
    IN idAlmacen INT, 
    IN idProducto INT,
    OUT _cantidad INT,
    OUT id_producto INT,
    OUT id_Almacen INT,
    OUT id_Sto INT
)BEGIN
        DECLARE canti INT;
        DECLARE idprod INT;
        DECLARE idalm INT;
        DECLARE idsto INT;
        DECLARE finished INT DEFAULT 0;

        DECLARE cursorUser
                CURSOR FOR 
                    SELECT Almacen.Cantidad, Almacen.IDProducto, Almacen.IDAlmacen, Stock.IDStock                    
                    FROM Almacen 
                    INNER JOIN Pedido ON Pedido.IDAlmacen = Almacen.IDAlmacen 
                    INNER JOIN Tienda ON Tienda.IDTienda = Pedido.IDTienda 
                    INNER JOIN Stock ON Tienda.IDTienda = Stock.IDTienda
                    WHERE Almacen.IDProducto = idProducto AND Almacen.IDAlmacen = idAlmacen;

        DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;

        OPEN cursorUser;
            getUser: LOOP 
                FETCH cursorUser INTO canti, idprod, idalm,idsto;
                IF finished = 1 THEN
                    LEAVE getUser;
                ELSE 
                    SET _cantidad = canti;
                    SET id_producto = idprod;
                    SET id_Almacen = idalm;
                    SET id_Sto = idsto;
                    LEAVE getUser;
                END IF;
            END LOOP getUser;
        CLOSE cursorUser;  
END $$          
DELIMITER $$ 
DROP TRIGGER IF EXISTS PedidoAlmacen;
    CREATE TRIGGER PedidoAlmacen AFTER UPDATE ON Pedido
        FOR EACH ROW
        BEGIN
            DECLARE cant INT;
            DECLARE idprod INT;
            DECLARE idalm INT;
            DECLARE idsto INT;
            CALL sp_searchProductA(OLD.IDAlmacen, OLD.IDProducto, cant, idprod, idalm,idsto);

            IF cant >= NEW.Cantidad THEN
                UPDATE Stock SET Cantidad = cant+OLD.Cantidad WHERE IDStock = idsto; 

                UPDATE Almacen SET Cantidad = cant - NEW.Cantidad 
                    WHERE IDAlmacen = OLD.IDAlmacen;
            END IF;
END $$


--retorna la cantidad total de producto que existe en la tienda con su id
DELIMITER $$ 
DROP PROCEDURE IF EXISTS sp_searchProductT;
CREATE PROCEDURE sp_searchProductT(
    IN idProducto INT,
    OUT cantidad INT,
    OUT id_stock INT,
    OUT id_tienda INT,
    OUT precio INT
)BEGIN
        DECLARE cant NUMERIC;
        DECLARE prec INT;
        DECLARE idprod INT;
        DECLARE idstock INT;
        DECLARE idtien INT;
        DECLARE finished INT DEFAULT 0;

        DECLARE cursorUser
                CURSOR FOR 
                    SELECT Stock.Cantidad, Stock.IDStock, Stock.IDTienda, Producto.precio 
                    FROM Stock 
                    INNER JOIN Producto ON Producto.IDProducto = Stock.IDProducto
                    WHERE Stock.IDProducto = idProducto;

        DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;

        OPEN cursorUser;
            getUser: LOOP 
                FETCH cursorUser INTO cant, idstock, idtien, prec;
                IF finished = 1 THEN
                    LEAVE getUser;
                ELSE
                    SET cantidad = cant;
                    SET id_stock = idstock;
                    SET id_tienda = idtien;
                    SET precio = prec;
                    LEAVE getUser;
                END IF;

            END LOOP getUser;
        CLOSE cursorUser;  
END $$

DELIMITER $$ 
DROP TRIGGER IF EXISTS PedidoCliente;
    CREATE TRIGGER PedidoCliente AFTER INSERT ON PedidoCliente
        FOR EACH ROW
        BEGIN
            DECLARE cant INT;
            DECLARE idstock INT;
            DECLARE idtiend INT;
            DECLARE prec INT;

            CALL sp_searchProductT(NEW.IDProducto, cant, idstock, idtiend, prec);
            
            IF cant <= 0 THEN
                DELETE FROM Stock Where IDStock = idstock;
            END IF;

            IF cant>=NEW.Cantidad THEN
                INSERT INTO Factura(Cantidad, Precio, ISV,IDPedidoCliente) VALUES (NEW.Cantidad, prec, 0.15,NEW.IDPedidoCliente);
                UPDATE Stock SET Cantidad = cant - NEW.Cantidad WHERE IDStock = idstock;
            END IF;
END $$
DELIMITER ;


INSERT INTO TipoCliente (Tipo,Descripcion) VALUES(0,'compra en linea');
INSERT INTO Cliente (Nombre,Apellifo,Telefono,Correo,IDTipoCliente) VALUES('David','Jacome','2222-2222','Correo',1);
INSERT INTO Tarjeta (numero,nombre,Apellido,IDCliente,Tipo) VALUES('2222-2222-2222-2222','David','Jacome',1,1);

INSERT INTO Tienda (Nombre,Direccion,Telefono) VALUES('DA','Tegucigalpa','2222-2222');
INSERT INTO Contrato (IDCliente,IDTienda,cuenta) VALUES(1,1,'1234214214123');

INSERT INTO Fabricante (Nombre,Descripcion,ubicacion) VALUES('Dell','sdas','Tegucigalpa');
INSERT INTO Categoria (nombre,Descripcion) VALUES('Laptop','dasdasd');
INSERT INTO Producto (nombre,imagen,descripcion,precio,IDCategoria,IDFabricante) VALUES('Computadora','adsadad','asdad',30000,1,1);
INSERT INTO Stock (IDTienda,IDProducto,cantidad) VALUES(1,1,100);
INSERT INTO Almacen (Direccion,Telefono,IDProducto,Cantidad) VALUES('Tegucigalpa','2222-2222',1,50);

INSERT INTO Pedido (IDTienda,IDAlmacen,Cantidad,IDProducto,Estado) VALUES(1,1,3,1,1);
INSERT INTO PedidoCliente (IDCliente,IDTienda,IDProducto,Cantidad) VALUES(1,1,1,15);

INSERT INTO Venta (Descripcion,IDFactura) VALUES(1,1,'1234214214123');
INSERT INTO Paquete (peso,altura,ancho,largo,Cantidad,IDProducto) VALUES(1,1,'1234214214123');
INSERT INTO VentaPorRemitente (IDVenta,IDRemitente) VALUES(1,1,'1234214214123');
INSERT INTO Remitente (Nombre,Apellifo,Direccion,Telefono) VALUES(1,1,'1234214214123');
