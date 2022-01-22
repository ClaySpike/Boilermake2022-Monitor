import serial
from serial.tools import list_ports
import db
import time
import sys

counter = 1
dev_array = []
for i in serial.tools.list_ports.comports():
	print(f'{counter}) {i.name}')
	dev_array.append(i.device)
	counter += 1

dev_num = -1

try:
	dev_num = int(input("Select which serial device to use: ")) - 1
except (TypeError, ValueError):
	print("Input must be a number")
	sys.exit()

if dev_num >= counter or dev_num <= 0:
	print(f"Input must be in the range 1...{counter - 1}")
	sys.exit()

dev_name = dev_array[dev_num]

print(f'Selected {dev_name}')

ser = serial.Serial(dev_name, 9600, timeout=3)

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