import serial

ser = serial.Serial('/dev/cu.usbserial-0001')

while 0==0:
	stri = ser.readline().decode()
	sub = stri[0:4]
	if sub == "temp":
		temp = float(stri[4:-2])
		print("Temperature: ", temp)
	elif sub == "humi":
		humi = float(stri[4:-2])
		print("Humidity: ", humi)
	elif sub == "pres":
		pres = float(stri[4:-2])
		print("Pressure: ", pres)
	elif sub == "alti":
		alti = float(stri[4:-2])
		print("Altitude: ", alti)
