import asyncio
import websockets
from mqtt_wrapper import MQTTWrapper
import sys

client = MQTTWrapper.fromJsonConfig(sys.path[0] + "/mqttConfig.json")

async def main():
    async with websockets.serve(handleMessage, '192.168.1.49', 7890):
        await asyncio.Future()

async def handleMessage(websocket):
    async for message in websocket:
        print(message)
        client.publish(message)

asyncio.run(main())
