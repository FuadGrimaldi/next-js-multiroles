from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector

app = FastAPI()

# Tambahkan middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ganti "*" dengan domain spesifik jika perlu
    allow_credentials=True,
    allow_methods=["*"],  # Ganti dengan metode spesifik jika perlu
    allow_headers=["*"],  # Ganti dengan header spesifik jika perlu
)

mydb = None

def init_db_connection():
    global mydb
    if mydb is None or not mydb.is_connected():
        mydb = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="test"
        )
    return mydb

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/humidity")
def get_hum():
    mydb = init_db_connection()
    cursor = mydb.cursor()
    try:
        cursor.execute("SELECT humid FROM tb_cuaca")
        result = cursor.fetchall()
        return {"Humidity": [row[0] for row in result]}
    except mysql.connector.Error as e:
        return {"error": str(e)}
    finally:
        cursor.close()

@app.get("/temperature")
def get_temp():
    mydb = init_db_connection()
    cursor = mydb.cursor()
    try:
        cursor.execute("SELECT suhu FROM tb_cuaca")
        result = cursor.fetchall()
        return {"Temperature": [row[0] for row in result]}
    except mysql.connector.Error as e:
        return {"error": str(e)}
    finally:
        cursor.close()
