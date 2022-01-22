//Air pressure detection
#include "Seeed_BMP280.h"
#include <Wire.h>
 
BMP280 bmp280;

//Temperature and Humidity Sensor
#include "DHT.h"
#include <Arduino.h>
#include <U8x8lib.h>
 
#define DHTPIN 3     // what pin we're connected to
#define DHTTYPE DHT11   // DHT 11 
DHT dht(DHTPIN, DHTTYPE);
 
U8X8_SSD1306_128X64_NONAME_HW_I2C u8x8(/* reset=*/ U8X8_PIN_NONE);
 
void setup(void) {
  Serial.begin(9600);
  if (!bmp280.init()) {
    Serial.println("Device not connected or broken!");
  }
  dht.begin();
  u8x8.begin();
  u8x8.setPowerSave(0);  
  u8x8.setFlipMode(1);
}
 
void loop(void) {
 
  float temp1, humi, temp2, pres, alti;
  temp1 = dht.readTemperature();
  humi = dht.readHumidity();
  temp2 = bmp280.getTemperature();
  pres = bmp280.getPressure();
  alti = bmp280.calcAltitude(pres);
  
  Serial.print("temp");
  Serial.println(temp2);
  Serial.print("humi");
  Serial.println(humi);
  Serial.print("pres");
  Serial.println(pres);
  Serial.print("alti");
  Serial.println(alti);
  delay(10000);
}
