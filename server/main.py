from flask import Flask, jsonify
import mysql.connector

app = Flask(__name__)

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

@app.route("/")
def read_root():
    return jsonify({"Hello": "World"})

@app.route("/humidity", methods=["GET"])
def get_hum():
    mydb = init_db_connection()
    cursor = mydb.cursor()
    try:
        cursor.execute("SELECT humid FROM tb_cuaca")
        result = cursor.fetchall()
        return jsonify({"Humidity": [row[0] for row in result]})
    except mysql.connector.Error as e:
        return jsonify({"error": str(e)})
    finally:
        cursor.close()

@app.route("/temperature", methods=["GET"])
def get_temp():
    mydb = init_db_connection()
    cursor = mydb.cursor()
    try:
        cursor.execute("SELECT suhu FROM tb_cuaca")
        result = cursor.fetchall()
        return jsonify({"Temperature": [row[0] for row in result]})
    except mysql.connector.Error as e:
        return jsonify({"error": str(e)})
    finally:
        cursor.close()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
