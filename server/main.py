from flask import Flask, jsonify, request
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

@app.route("/add", methods=["POST"])
def add_data():
    mydb = init_db_connection()
    cursor = mydb.cursor()
    try:
        # Get values from query parameters
        suhu = request.args.get("suhu")
        humid = request.args.get("humid")
        lux = request.args.get("lux")

        # Validate required parameters
        if suhu is None or humid is None:
            return jsonify({"error": "Both 'suhu' and 'humid' fields are required as query parameters."}), 400

        try:
            # Convert query parameters to float
            suhu = float(suhu)
            humid = float(humid)
            lux = float(lux) if lux is not None else None  # Handle optional 'lux'
        except ValueError:
            return jsonify({"error": "Parameters 'suhu', 'humid', and 'lux' must be valid numbers."}), 400

        # Insert data into the database
        query = "INSERT INTO tb_cuaca (suhu, humid, lux, ts) VALUES (%s, %s, %s, NOW())"
        cursor.execute(query, (suhu, humid, lux))
        mydb.commit()

        return jsonify({"message": "Data added successfully", "id": cursor.lastrowid}), 201

    except mysql.connector.Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
