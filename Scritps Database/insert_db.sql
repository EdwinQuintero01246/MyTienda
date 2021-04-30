USE recorFiledb; 


INSERT INTO Payment (Description_payment)
    VALUES ('Tarjeta de credito');

INSERT INTO Sequence_account (Number_to,Number_next,Number_from,prefix)
    VALUES (1,1,500,'FAC-001-000');

INSERT INTO Customer (Name_customer,Password_customer,Validate_permission)
    VALUES ('Chino','123cuatr0',1);


INSERT INTO Shop (Location_description)
    VALUES ('Tienda de ventas de consolas'),
        ('Electrodomesticos San Juan');


INSERT INTO Maker (Name_maker)
    VALUES ('Sony'),
        ('Microsoft'),
        ('DELL'),
        ('HP'),
        ('ACER'),
        ('JBC'),
        ('RCA');


INSERT INTO Category (Description_category)
    VALUES ('Celulares'),
        ('Portatiles'),
        ('Servidores'),
        ('Equipo de oficina'),
        ('Equipo de sobre mesa'),
        ('Entretenimiento'),
        ('Camaras'),
        ('Equipo de audio');


INSERT INTO Product (name_product, Category_id, Maker_id)
    VALUES ('Camara x2B',7,1),
        ('Hp pavilion red',2,4),
        ('CPU core i7 pro mac',4,3),
        ('Teatro en casa',8,6),
        ('PS4 PRO',6,1);


INSERT INTO Stock (Name_stock)
    VALUES ('Almacen Principal');

INSERT INTO Stock_quant (Stock_id,Product_id,Quantity,Price)
    VALUES (1,1,100,200),
        (1,2,200,200);