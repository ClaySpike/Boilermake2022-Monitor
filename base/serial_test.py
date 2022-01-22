import serial
from serial.tools import list_ports

for i in serial.tools.list_ports.comports():
    print(i.name, i.manufacturer, i.location, i.pid, i.serial_number, i.hwid, i.name)