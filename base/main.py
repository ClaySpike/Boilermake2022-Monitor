import serial
import db
import time
import sys

ser = serial.Serial('/dev/cu.usbserial-0001', 9600, timeout=3)

sys.stdout.write('Waiting for Arduino to boot...')
sys.stdout.flush()

init = ser.readline().decode()

if (init != "Initialization complete\r\n"):
	sys.stderr.write("Unable to initialize Arduino\n")
	sys.exit()

sys.stdout.write('done\n')
sys.stdout.flush()

curr_count = 0
temperature = 0.0
humidity = 0.0
pressure = 0.0
altitude = 0.0
sound = 0.0

ser_num = None
verbose_read = False

print("Requesting serial number...")
ser.write("get_ser\n".encode('UTF-8'))
ser.flush()

while 0==0:
	if (curr_count == 4):
		curr_count = 0

		if ser_num is None:
			continue

		db.insert_observation(temperature, humidity, pressure, altitude, sound, ser_num)

	stri = ser.readline().decode()
	# print(stri)

	if ser_num is not None:
		verbose_read = True

	sub = stri[0:4]
	if sub == "temp":
		curr_count += 1
		temp = float(stri[4:-2])
		if verbose_read:
			print("Temperature:", temp)
		temperature = temp
	elif sub == "humi":
		curr_count += 1
		humi = float(stri[4:-2])
		if verbose_read:
			print("Humidity:", humi)
		humidity = humi
	elif sub == "pres":
		curr_count += 1
		pres = float(stri[4:-2])
		if verbose_read:
			print("Pressure:", pres)
		pressure = pres
	elif sub == "alti":
		curr_count += 1
		alti = float(stri[4:-2])
		if verbose_read:
			print("Altitude:", alti)
		altitude = alti
	elif sub == 'seri':
		ser_num = str(stri[4:-2])
		print("Serial Number:", ser_num)
	elif sub == 'soun':
		sound = float(stri[4:-2])
		print("Sound Level:", sound)