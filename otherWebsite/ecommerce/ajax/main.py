from Prueba import *
import sys
import json
SQLEngine = Prueba()
def validate_login(name,password):
    customer = SQLEngine.select("SELECT Customer.Id,Customer.Name_Customer FROM Customer WHERE Name_customer = '%s' and Password_customer = '%s';" %(name,password))
    #customer = SQLEngine.select("SELECT Customer.Id, Customer.Validate_permission FROM Customer;")
    if customer:
        var = json.dumps((customer[0]))
        return var
    else:
        return json.dumps(False)
def list_product_all():
    Products = SQLEngine.select("SELECT Product.Id, Stock_quant.Quantity, Stock_quant.Discount,Stock_quant.Price, Product.Name_product, Category.Description_category, Maker.Name_maker  FROM Stock_quant INNER JOIN Product ON Stock_quant.Product_id = Product.Id INNER JOIN Maker ON Product.Maker_id = Maker.Id      INNER JOIN Category ON Product.Category_id = Category.Id;")
    var = json.dumps(Products)
    return var
def product_detail(Product_id):
    Products = SQLEngine.select("SELECT Product.Id, Stock_quant.Quantity, Stock_quant.Discount,Stock_quant.Price, Product.Name_product, Category.Description_category, Maker.Name_maker  FROM Stock_quant INNER JOIN Product ON Stock_quant.Product_id = Product.Id INNER JOIN Maker ON Product.Maker_id = Maker.Id      INNER JOIN Category ON Product.Category_id = Category.Id WHERE Product.Id = %s;"%Product_id)
    #print('llego paso')
    return json.dumps(Products)
#insertar productos comprados
def create_invoice(Customer_id,Payment_id, product_ids,total):
    Shop_id = 1

    sequence = SQLEngine.select("SELECT Sequence_account.Number_next, Sequence_account.prefix FROM Sequence_account;")
    Sequence_name = str(sequence[0]['prefix']) + str(sequence[0]['Number_next'])
    next=sequence[0]['Number_next'] + 1  
    SQLEngine.insert("UPDATE Sequence_account SET Number_next = %s;"%(next))

    #print(json.dumps(Sequence_name))
    result_account = SQLEngine.insert("INSERT INTO Account_invoice (Customer_id, Shop_id, Payment_id, Sub_total, Sequence_name) VALUES (%s, %s,%s, %s,'%s');"%(Customer_id,Shop_id,Payment_id,total,Sequence_name))
    for rec in product_ids:
        result = SQLEngine.insert("INSERT INTO Account_invoice_line (Account_id,Product_id ,Price, Quantity) VALUES (%s, %s, %s, %s);"%(result_account, int(rec['id']), int(rec['price']), int(rec['quantity'])))
    result_order = SQLEngine.insert("INSERT INTO Order_sale (Customer_id) VALUES (%s);"%Customer_id)
    for rec in product_ids:
        Order_line = SQLEngine.insert("INSERT INTO Order_line (Order_id,Product_id ,Quantity) VALUES (%s, %s, %s);"%(result_order, rec['id'],rec['quantity']))
        #SQLEngine.insert("INSERT INTO Order_line (Order_id,Product_id ,Quantity) VALUES (%s, %s, %s);"%(result_order, int(rec['id']) ,int(rec['quantity'])))
        quantity = SQLEngine.select("SELECT Stock_quant.Quantity, Stock_quant.Id FROM Stock_quant WHERE Product_id =  %s;"%int(rec['id']))
        #print('esta es la cantidad antes===',quantity[0]['Quantity'])
        new_quantity = quantity[0]['Quantity'] - rec['quantity']
        SQLEngine.insert("UPDATE Stock_quant SET Quantity = %s WHERE Product_id = %s;"%(new_quantity, int(rec['id'])  )) 
def NewUserOne(Name,password):
    SQLEngine.insert("INSERT INTO Customer(Customer.Name_customer,Customer.Password_customer,Customer.Validate_permission)  VALUES('%s','%s',0);"%(Name,password))
    return json.dumps("SE Agrego uno usuario")
def Users():
    #customer = SQLEngine.select("SELECT Customer.Id,Customer.Name_Customer FROM Customer WHERE Name_customer = '%s' and Password_customer = '%s';" %(name,password))
    customer = SQLEngine.select("SELECT Customer.Id,Customer.Name_Customer FROM Customer;")
    if customer:
        var = json.dumps((customer))
        return var
    else:
        return json.dumps(False)
def Usersall(name):
    customer = SQLEngine.select("SELECT Customer.Id,Customer.Name_Customer FROM Customer WHERE Name_customer = '%s';" %(name))
    #customer = SQLEngine.select("SELECT Customer.Id,Customer.Name_Customer FROM Customer;")
    if customer:
        var = json.dumps((customer))
        return var
    else:
        return json.dumps(False)
def insert_product(name_product, maker, price,Discount,quantity, category  ):
    Product = SQLEngine.insert("INSERT INTO Product (name_product, Category_id, Maker_id) VALUES ('%s','%s','%s');"%(name_product,category,maker))
    #SQLEngine.insert("INSERT INTO Stock_quant (Stock_id, Product_id, Discount,Quantity,Price) VALUES('%s','%s','%s','%s','%s');"%(1,Product,Discount,quantity,price))
    if int(quantity) > 0:
        SQLEngine.insert("INSERT INTO Stock_quant (Stock_id, Product_id, Discount,Quantity,Price) VALUES('%s','%s','%s','%s','%s');"%(1,Product,Discount,quantity,price))
def get_maker():
    maker = SQLEngine.select("SELECT Maker.Id, Maker.Name_maker FROM Maker;")
    return json.dumps(maker)
def get_category():
    category = SQLEngine.select("SELECT Category.Id, Category.Description_category FROM Category;")
    return json.dumps(category)
def set_payment_paypal(Customer_id,Type_Payment,Number_tarjet,Ccv,Mm, Yy, Name_tarjet):
    Paypal_tarjet = SQLEngine.insert("INSERT INTO Paypal_tarjet (Number_tarjet, Ccv, Mm,Yy,Name_tarjet) VALUES ('%s', '%s','%s','%s','%s');"%(Number_tarjet,Ccv,Mm,Yy,Name_tarjet))
    Payment = SQLEngine.insert("INSERT INTO Payment (Customer_id, Type_Payment, Paypal_tarjet_id) VALUES (%s, %s,%s);"%(Customer_id,Type_Payment,Paypal_tarjet))
def set_payment_bank(Customer_id,Type_Payment,Number_bank):
    Payment = SQLEngine.insert("INSERT INTO Payment (Customer_id, Type_Payment, Number_bank) VALUES (%s, %s,'%s');"%(Customer_id,Type_Payment,Number_bank))

def get_account_invoice_line(Customer_id):
    #Account_invoice.Date_account
    purchase = SQLEngine.select("SELECT Account_invoice_line.Quantity,Account_invoice.Sequence_name,Account_invoice_line.Price,Product.name_product FROM Account_invoice_line INNER JOIN Account_invoice ON Account_invoice_line.Account_id = Account_invoice.Id INNER JOIN Product ON Account_invoice_line.Product_id = Product.Id WHERE Account_invoice.Customer_id = %s;"%(int(Customer_id)))
    var = json.dumps(purchase)
    return var
def get_Paypal(Customer_id):
    paypal = SQLEngine.select("SELECT Paypal_tarjet.Number_tarjet, Paypal_tarjet.Ccv, Paypal_tarjet.Mm, Paypal_tarjet.Yy, Paypal_tarjet.Name_tarjet FROM Payment INNER JOIN Paypal_tarjet on Payment.Paypal_tarjet_id = Paypal_tarjet.Id  WHERE Payment.Customer_id = %s;"%(int(Customer_id)))
    var = json.dumps(paypal)
    return var
def get_BuyBank(Customer_id):
    paypal = SQLEngine.select("SELECT Payment.Number_bank FROM Payment WHERE  Customer_id = %s and Type_Payment = 'Cuenta bancaria';"%(int(Customer_id)))
    var = json.dumps(paypal)
    return var

#print(get_account_invoice_line(1))
if sys.argv[1] == 'Login':
    print(validate_login(sys.argv[2],sys.argv[3]))
if sys.argv[1] == 'ListProd':
    print(list_product_all())
if sys.argv[1] == 'Detail-Product':
    print(product_detail(sys.argv[2]))
if sys.argv[1] == 'PayProduct':
    data = sys.argv[4]
    x = data.replace("id","'id'")
    y = x.replace("price","'price'")
    z = y.replace("quantity","'quantity'")
    data1 = json.loads(json.dumps(z))
    data2 = json.loads(''.join(data1).replace("'", '"'))
    print(create_invoice(sys.argv[2],sys.argv[3],data2,sys.argv[5]))
if sys.argv[1] == 'NewUserOne':
    print(NewUserOne(sys.argv[2],sys.argv[3]))
if sys.argv[1] == 'Users':
    print(Users())
if sys.argv[1] == 'UserAll':
    print(Usersall(sys.argv[2]))
if sys.argv[1] == 'get_makers':
    print(get_maker())
if sys.argv[1] == 'get_categorys':
    print(get_category())
if sys.argv[1] == 'UpProductone':
    print(insert_product(sys.argv[2],sys.argv[3],sys.argv[4],sys.argv[5],sys.argv[6],sys.argv[7]))
if sys.argv[1] == 'RegisterCard':
    print(set_payment_paypal(sys.argv[2],sys.argv[3],sys.argv[4],sys.argv[5],sys.argv[6],sys.argv[7],sys.argv[8]))
if sys.argv[1] == 'set_payment_bank':
    print(set_payment_bank(sys.argv[2],sys.argv[3],sys.argv[4]))
if sys.argv[1] == 'invoices':
    print(get_account_invoice_line(sys.argv[2]))
if sys.argv[1] == 'GetPaypal':
    print(get_Paypal(sys.argv[2]))
if sys.argv[1] == 'GetBuyBank':
    print(get_BuyBank(sys.argv[2]))
