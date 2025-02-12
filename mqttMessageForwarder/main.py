import asyncio
import json
import websockets
import os
import paho.mqtt.client as mqtt

WEBSOCKET_PORT = 7890

MQTT_BROKER = os.getenv("MQTT_BROKER", "localhost")
MQTT_PORT = int(os.getenv("MQTT_PORT", 1883))
MQTT_TOPIC = os.getenv("MQTT_TOPIC", "NP_UNIPR_AROUSAL")

MAX_AROUSAL_DEVIATION = int(os.getenv("MAX_AROUSAL_DEVIATION", 10))
BASE_HEART_RATE = int(os.getenv("BASE_HEART_RATE", 60))

def heartRateToArousal(heartRate):
    arousal = (1/MAX_AROUSAL_DEVIATION**2) * (heartRate - BASE_HEART_RATE)**2
    return arousal if arousal <= 1 else 1

async def main():
    async with websockets.serve(handleMessage, '0.0.0.0', WEBSOCKET_PORT):
        await asyncio.Future()

async def handleMessage(websocket):
    async for message in websocket:
        message = json.loads(message)
        arousal = heartRateToArousal(int(message["heartRate"]))
        print(f"HR {message['heartRate']} -> arousal {arousal}")
        client.publish(
            topic=MQTT_TOPIC,
            payload=json.dumps({ "arousal": arousal })
        )

if __name__ == "__main__":
    print(f"Connecting to MQTT broker {MQTT_BROKER} on port {MQTT_PORT} and topic {MQTT_TOPIC}")
    print(f"Max arousal deviation: {MAX_AROUSAL_DEVIATION}, base heart rate: {BASE_HEART_RATE}")

    client = mqtt.Client()
    client.connect(host=MQTT_BROKER, port=MQTT_PORT)

    asyncio.run(main())
