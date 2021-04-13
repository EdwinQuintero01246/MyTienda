from MySQLEngine import *
import configparser
SQLEngine = MySQLEngine()
SQLEngine.start()
import json

#import time

#app = Flask(__name__)
#app.secret_key = 'my_secret_key'
#csrf = CsrfProtect(app)

from flask import Flask, render_template, make_response
from flask import redirect, request, jsonify, url_for


import io
import os
import uuid
#from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
#from matplotlib.figure import Figure
import numpy as np


import json
import sys
#php_Process = sys.argv[1]
#php_param = sys.argv[2]
#php_param2 = sys.argv[3]

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
    #return json.dumps(Phy_Specification)




if sys.argv[1] == 'Login':
    if sys.argv[2] == 'EdwinQuintero01246' and sys.argv[3] == '1234':
        print( contraseñaExi(sys.argv[2]) )
    if sys.argv[2] != 'EdwinQuintero01246' or sys.argv[3] != '1234':
        print( contraseñaFall(sys.argv[2]) )

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