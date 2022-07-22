import asyncio
import json
import websockets
from mqtt_wrapper import MQTTWrapper
import sys

baseHeartRate = int(sys.argv[1])
maxArousalDeviation = 10
def heartRateToArousal(heartRate):
    arousal = (1/maxArousalDeviation**2) * (heartRate - baseHeartRate)**2
    return arousal if arousal <= 1 else 1

client = MQTTWrapper.fromJsonConfig(sys.path[0] + "/mqttConfig.json")

async def main():
    async with websockets.serve(handleMessage, '0.0.0.0', 7890):
        await asyncio.Future()

async def handleMessage(websocket):
    async for message in websocket:
        message = json.loads(message)
        arousal = heartRateToArousal(int(message["heartRate"]))
        print(f"HR {message['heartRate']} -> arousal {arousal}")
        client.publish(json.dumps({ "arousal": arousal }))
        

asyncio.run(main())


