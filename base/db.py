from pymongo import MongoClient
from pprint import pprint

# Create MongoDB Client
client = MongoClient("mongodb://127.0.0.1:27017")

# Select the correct database from the connection
db = client.boilermake

# test = {'serial': "Testing1234", 'temperature': 20}

# db.observations.insert_one(test)

# # Run a test query on the 'users' collection
# pprint(db.users.find_one({}))

def insert_observation(temp, hum, pres, alt, sound, ser_num):
    obs = {'sn': ser_num, 'Temperature': temp, 'Humidity': hum, "Pressure": pres, "Altitude": alt, "Sound": sound}

    db.observations.insert_one(obs)

def get_all():
    observations = []
    for obs in db.observations.find({}):
        observations.append(obs)
    
    return observations

# print(get_all())
