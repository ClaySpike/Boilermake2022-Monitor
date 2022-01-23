from pymongo import MongoClient
from pprint import pprint
from datetime import datetime

# Create MongoDB Client
client = MongoClient("mongodb+srv://admin:adminpassword@cluster0.1tmoe.mongodb.net/boilermake", tls=True, tlsAllowInvalidCertificates=True)
# client = MongoClient("mongodb://127.0.0.1")

# Select the correct database from the connection
db = client.boilermake

# test = {'serial': "Testing1234", 'temperature': 20}

# db.observations.insert_one(test)

# # Run a test query on the 'users' collection
# pprint(db.users.find_one({}))

def insert_observation(temp, hum, pres, alt, sound, ser_num):
    obs = {'sn': ser_num, 'temperature': temp, 'humidity': hum, "pressure": pres, "altitude": alt, "sound": sound, 'time': datetime.now()}

    db.observations.insert_one(obs)
