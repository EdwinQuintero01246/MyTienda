DROP DATABASE recorFiledb;
CREATE DATABASE recorFiledb;

USE recorFiledb; 



CREATE TABLE Sequence_account(
    Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Number_to int,
    Number_next int,
    Number_from  int,
    prefix VARCHAR(100)
);


CREATE TABLE Customer(
    Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Name_customer VARCHAR(100),
    Password_customer VARCHAR(100),
    Validate_permission bit not null
);

CREATE TABLE Category(
    Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Description_category VARCHAR(200)
);

CREATE TABLE Maker(
    Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Name_maker VARCHAR(100)
);

CREATE TABLE Product(
    Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name_product VARCHAR(100),
    Category_id int,
    Maker_id int,
    FOREIGN KEY (Category_id) references Category(Id),
    FOREIGN KEY (Maker_id) references Maker(Id)
);


CREATE TABLE Contract_customer(
    Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Customer_id int,
    FOREIGN KEY (Customer_id) references Customer(Id)
);

CREATE TABLE Paypal_tarjet(
    Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Number_tarjet VARCHAR(100),
    Ccv VARCHAR(100),
    Mm VARCHAR(100),
    Yy VARCHAR(100),
    Name_tarjet VARCHAR(100)
);


CREATE TABLE Payment(
    Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Description_payment VARCHAR(200),
    Customer_id int,
    Type_Payment ENUM('Paypal', 'Cuenta bancaria'),
    Number_bank VARCHAR(200),
    Paypal_tarjet_id int,
    FOREIGN KEY (Customer_id) references Customer(Id),
    FOREIGN KEY (Paypal_tarjet_id) references Paypal_tarjet(Id)
);


CREATE TABLE Shop(
    Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Location_description VARCHAR(200)
);

CREATE TABLE Account_invoice(
    Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Sequence_name VARCHAR(200),
    Customer_id int,
    Date_account TIMESTAMP DEFAULT NOW(),
    Shop_id int,
    Payment_id int,
    Total float,
    Sub_total float,
    FOREIGN KEY (Customer_id) references Customer(Id),
    FOREIGN KEY (Shop_id) references Shop(Id),
    FOREIGN KEY (Payment_id) references Payment(Id)
);

CREATE TABLE Account_invoice_line(
    Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Account_id int,
    Product_id int,
    Price float,
    Quantity int,
    FOREIGN KEY (Account_id) references Account_invoice(Id),
    FOREIGN KEY (Product_id) references Product(Id)
);

CREATE TABLE Stock_production_lot(
    Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Shop_id int,
    FOREIGN KEY (Shop_id) references Shop(Id)
);

CREATE TABLE Stock_production_lot_quant(
    Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Stock_production_lot_id int,
    FOREIGN KEY (Stock_production_lot_id) references Stock_production_lot(Id)
);

CREATE TABLE Stock(
    Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Name_stock VARCHAR(100)
);

CREATE TABLE Stock_quant(
    Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Stock_id int,
    Product_id int,
    Discount int,
    Quantity int,
    Price int,
    FOREIGN KEY (Product_id) references Product(Id),
    FOREIGN KEY (Stock_id) references Stock(Id)
);

CREATE TABLE Order_sale(
    Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Maker_id int,
    Shop_id int,
    Customer_id int,
    FOREIGN KEY (Maker_id) references Maker(Id),
    FOREIGN KEY (Shop_id) references Shop(Id),
    FOREIGN KEY (Customer_id) references Customer(Id)
);

CREATE TABLE Order_line(
    Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Order_id int,
    Product_id int,
    Quantity int,
    FOREIGN KEY (Order_id) references Order_sale(Id),
    FOREIGN KEY (Product_id) references Product(Id)
);



