# Python code to demonstrate
# converting string to json 
# using json.loads
import json
  
##### inititialising json object
ini_string = {'nikhil': 1, 'akash' : 5, 
              'manjeet' : 10, 'akshat' : 15}
####  
##### printing initial json
####ini_string = json.dumps(ini_string)
####print ("initial 1st dictionary", ini_string)
####print ("type of ini_object", type(ini_string))
####  
##### converting string to json
####final_dictionary = json.loads(ini_string)
####  
##### printing final result
####print ("final dictionary", str(final_dictionary))
####print ("type of final_dictionary", type(final_dictionary))

ini_string =[{IDUser:1,IDCarts:1,NameProduct:Laptop inspiron 15,Producer:DELL,Price:1000,Quantity:3},{IDUser:1,IDCarts:2,NameProduct:P30 lite,Producer:HUAWEI,Price:200,Quantity:2},{IDUser:1,IDCarts:1,NameProduct:Camara,Producer:Canon,Price:300.0,Quantity:1},{IDUser:1,IDCarts:1,NameProduct:Camara,Producer:Canon,Price:300.0,Quantity:1}]

print(ini_string)



####from MySQLEngine import *
####import configparser
####SQLEngine = MySQLEngine()
####SQLEngine.start()
####import json

#import time

#app = Flask(__name__)
#app.secret_key = 'my_secret_key'
#csrf = CsrfProtect(app)

from flask import Flask, render_template, make_response
from flask import redirect, request, jsonify, url_for


import io
import os
import uuid

import numpy as np


import json
import sys

def contraseñaExi(p):
    dict = {"val1":"this is x", "val2":True}
    return json.dumps('usuario exitoso')
def contraseñaFall(p):
    dict = {"val1":"this is x", "val2":True}
    return json.dumps('no encontado')
def ListProductP():
    dict = [{
        "Producto": "Camara",
        "Fabricante": "Cannon",
        "color": ["white", "red", "Black"],
        "Precio": 5500},{
        "Producto": "Camara",
        "Fabricante": "Cannon",
        "color": ["white", "red", "Black"],
        "Precio": 5500}]
    return json.dumps(dict)
def DetailProduct():
    #sys.argv[2] es el IDProducto
    dict = {
        "Producto": "Camara",
        "Fabricante": "Cannon",
        "color": ["white", "red", "Black"],
        "Precio": 5500}
    return json.dumps(dict)
def Cart(IdCl):
    IdCliente = IdCl
    return json.dumps(IdCliente)
def invoices_list(Invo):
    invoice = Invo
    return json.dumps(invoice)
def Packages_list(Packa):
    Packages = Packa
    return json.dumps("Packages")
def PayPackageProduct(Packa):
    Packages = Packa
    return json.dumps("pago paquetes Packages")
def UpProductNew(Name, Producer, Price, Discount, Quantity, Category, Description, Specification):
    NameProducts = Name
    ProducerProducts = Producer
    Phy_Price = Price
    Phy_Discount = Discount
    Phy_Quantity = Quantity
    Phy_Category = Category
    Phy_Description = Description
    Phy_Specification = Specification
    return json.dumps("Subir producto nuevo")
def ShoresBuyList(IdCliente,IdShores):
    print("LLenado de compras ")
def ShoresStocktakingList(IdCliente,IdShores):
    print("LLenado de inventario ")



if sys.argv[1] == 'Login':
    print( contraseñaFall(sys.argv[2]))

#print (len(sys.argv),sys.argv)





    
if sys.argv[1] == 'ListProd':
    print(ListProductP())
if sys.argv[1] == 'DetailProduct':
    print(DetailProduct())
if sys.argv[1] == 'Cart':
    print(Cart(sys.argv[2]))
if sys.argv[1] == 'invoices':
    print(invoices_list(sys.argv[2]))
if sys.argv[1] == 'Packages':
    print(Packages_list(sys.argv[2]))
if sys.argv[1] == 'PayPackageProducts':
    print(PayPackageProduct(sys.argv[2]))
if sys.argv[1] == 'UpProduct':
    print( UpProductNew(sys.argv[2],sys.argv[3],sys.argv[4],sys.argv[5],sys.argv[6],sys.argv[7],sys.argv[8],sys.argv[9]))
if sys.argv[1] == 'ShoresBuyList':
    print( ShoresBuyList(sys.argv[2],sys.argv[3]))
if sys.argv[1] == 'ShoresStocktakingList':
    print( ShoresStocktakingList(sys.argv[2],sys.argv[3]))



#INSERT INTO Customer (Name_customer) VALUES ('1llllllllllllllll'),('1-2-afc'),('2-asdasdasdasd2-afc');