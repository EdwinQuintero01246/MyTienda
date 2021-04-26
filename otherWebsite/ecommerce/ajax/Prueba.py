import pymysql
#from MySQLEngine import *
#import configparser
#SQLEngine = MySQLEngine()
#SQLEngine.start()

class Prueba:
    def __init__(self):
        self.Connection = pymysql.connect(
            host='localhost',
            user='root',
            password='2020',
            database='recorfiledb',
            port = 3312,
            cursorclass=pymysql.cursors.DictCursor
        )
        self.cursor = self.Connection.cursor()
        #print("Conexión establecida")

    def select(self,query,fetchOne=False):
        self.cursor.execute(query)
        #print('este es el resultado----------------->', self.cursor.fetchall())
        data = self.cursor.fetchall()
        if fetchOne:
            return self.cursor.fetchone()
        else:
            return data

    def insert(self,query):
        self.cursor.execute(query)
        self.Connection.commit()
        #print("Data Inserted Successfully")
        return self.cursor.lastrowid




