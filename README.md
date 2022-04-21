# Fitbit HR MQTT
Fitbit app to read HR values and publish via mqtt.

## Hardware requirements
- Smartwatch [Fitbit Sense](https://www.fitbit.com/global/it/products/smartwatches/sense)
- A phone with the fitbit app (Compation APP)
- A PC to run the python script

## Software Architecture
The project is divided in two main components that work together to achive the data communication via MQTT

### Fitbit App
The Fitbit App will read the data and send via websocket to the python script running on PC. According to the [Fitbit Communications Guide](https://dev.fitbit.com/build/guides/communications/) the watch cannot directly send data through the internet, so it needs to transfer data before to the companion app and then it could use websockets.

#### Smartwatch app
