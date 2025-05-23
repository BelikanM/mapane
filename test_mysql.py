import mysql.connector

try:
    conn = mysql.connector.connect(
        host="localhost",
        user="BelikanM",
        password="Dieu19961991??!??!",
        database="tiktok"
    )

    print("Connexion réussie à la base de données !")
    conn.close()

except mysql.connector.Error as err:
    print(f"Erreur de connexion : {err}")
