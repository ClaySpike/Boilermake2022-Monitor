// Unique Board Identifier
#include <ArduinoUniqueID.h>

// String library
#include <string.h>

//Air pressure detection
#include "Seeed_BMP280.h"
#include <Wire.h>

uint32_t MSL = 102009; // Mean Sea Level in Pa

BMP280 bmp280;

//Temperature and Humidity Sensor
#include "DHT.h"
#include <Arduino.h>
#include <U8x8lib.h>
 
#define DHTPIN 3     // what pin we're connected to
#define DHTTYPE DHT11   // DHT 11 
DHT dht(DHTPIN, DHTTYPE);
 
U8X8_SSD1306_128X64_NONAME_HW_I2C u8x8(/* reset=*/ U8X8_PIN_NONE);

#define GET_SERIAL ("get_serial") // Control byte to get the serial number

int incomingByte = 0; // Incoming Control Byte
int didGiveSerialNumber = 0; // Did respond with the serial number

// Sound Sensor
int soundPin = A2;

// Timeout for average value reporting
#define TIMEOUT (5000) // 5 second timeout
unsigned long previousMillis = 0;
 
void setup(void) {
  pinMode(soundPin, INPUT);
  Serial.begin(9600);
  if (!bmp280.init()) {
    Serial.println("Device not connected or broken!");
  }
  dht.begin();
  u8x8.begin();
  u8x8.setPowerSave(0);  
  u8x8.setFlipMode(1);

  u8x8.setFont(u8x8_font_chroma48medium8_r);

  u8x8.setCursor(0,0);
  u8x8.println("<Serial Number>");

  Serial.println("Initialization complete");
  previousMillis = millis();
}

void serialEvent() {
  int didGetMessage = 0;

  if (Serial.available() > 0) {
    didGetMessage = 1;
  }
  
  while (Serial.available() > 0) {
    char inChar = (char) Serial.read();
  }

  if (didGetMessage) {
    u8x8.setCursor(0,0);
    Serial.print("seri");
    for (int i = 0; i < 8; i++) {
      Serial.print(UniqueID8[i], HEX);
      u8x8.print(UniqueID8[i], HEX);
    }
    u8x8.println("");
    Serial.println("");
    didGiveSerialNumber = 1;
  }
}

float calculateAltitudeCustom(float p0, float p1, float t) {
  float C;

  C = (p0 / p1);

  C = pow(C, (1 / 5.25588)) - 1.0;

  C = (C * (t + 273.15)) / 0.0065;

  return C;
}

/* Global variables for counting cycles and totals */
double temperature = 0.0;
double humidity = 0.0;
double sound = 0.0;
double pressure = 0.0;
double altitude = 0.0;
unsigned long count = 0;
 
void loop(void) {
  u8x8.setFont(u8x8_font_chroma48medium8_r);
  u8x8.setCursor(0, 1);
 
  float temp1, humi, temp2, pres, alti, soundState;
  temp1 = dht.readTemperature();
  humi = dht.readHumidity();
  temp2 = bmp280.getTemperature();
  pres = bmp280.getPressure();
  alti = calculateAltitudeCustom(MSL, pres, temp2);
  pres /= 1000;
  soundState = (float) analogRead(soundPin) / 10; // Read sound sensor’s value

  u8x8.print("Temp: ");
  u8x8.print(temp2);
  u8x8.println("C");

  u8x8.print("Humi: ");
  u8x8.print(humi);
  u8x8.println("%");

  u8x8.print("Pres: ");
  u8x8.print(pres);
  u8x8.println("kPa");

  u8x8.print("Alti: ");
  u8x8.print(alti);
  u8x8.println("m");

  u8x8.print("Sound:");
  u8x8.println(soundState);

  temperature += temp2;
  humidity += humi;
  pressure += pres;
  altitude += alti;
  sound += soundState;

  ++count;

  if (millis() - previousMillis >= TIMEOUT) {
    Serial.print("temp");
    Serial.println(temperature / count);
    Serial.print("humi");
    Serial.println(humidity / count);
    Serial.print("pres");
    Serial.println(pressure / count);
    Serial.print("alti");
    Serial.println(altitude / count);
    Serial.print("soun");
    Serial.println(sound / count);

    temperature = 0.0;
    humidity = 0.0;
    pressure = 0.0;
    altitude = 0.0;
    sound = 0.0;
    count = 0;

    previousMillis = millis();
  }
}
