# Fitbit Heart Rate MQTT
Fitbit app to read HR values and publish via mqtt.

## Hardware requirements
- Smartwatch [Fitbit Sense](https://www.fitbit.com/global/it/products/smartwatches/sense)
- A phone with the fitbit app (Compation APP) paired to the smartwatch
- A PC to run the python script

## Software Architecture
The project is divided in two main components that work together to achive the data communication via [MQTT](https://mqtt.org/)
- Fitbit app
  - Smartwatch app
  - Companion app
- Python script

### Fitbit App
The Fitbit App will read the data and send via websocket to the python script running on PC. According to the [Fitbit Communications Guide](https://dev.fitbit.com/build/guides/communications/) the watch cannot directly send data through the internet, so it needs to transfer data before to the companion app and then it could use websockets.

#### Smartwatch App
The app running on the smartwatch will read the heart rate and send it to the companion app via the socket that pair them.

#### Companion App
The companion app is running on the phone and is listening to the socket for the incoming data. When new data are ready, they are sent to the python script via websocket.

### Message Forwarder
The python script running on a pc, that is listening to the websocket. Once data arrive, they are published on the MQTT topic

## How to use
- Clone the repository
- Install the app on fitbit. There are two different ways:
  - Via [Fitbit Studio](https://studio.fitbit.com/), the web-based SDK with GUI
  - Via the SDK available on npm
- Run the app on the swartwatch
- Set the websocket server url on the companion app
- Install [python requirements](mqttMessageForwarder/requirements.txt) with `pip install -r requirements.txt`
- Set the configuration for the message forwarder in [mqttConfig.json](mqttMessageForwarder/mqttConfig.json)
- Run the [python script](mqttMessageForwarder/main.py)
- Enable data trasfer on the companion app
