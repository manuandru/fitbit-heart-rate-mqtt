import { display } from "display";
import * as document from "document";
import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import * as messaging from "messaging";

const hrmData = document.getElementById("hrm-data");
const hrmTimestamp = document.getElementById("hrm-timestamp");

let heartRateSensor;
let body;

if (HeartRateSensor) {
  heartRateSensor = new HeartRateSensor({ frequency: 1 });
  heartRateSensor.addEventListener("reading", handleNewHeartRateData);  
  heartRateSensor.start();
}

function handleNewHeartRateData() {
  const message = {
    heartRate: heartRateSensor.heartRate,
    timestamp: heartRateSensor.timestamp
  }
  logOnDevice(message);
  sendToCompanion(message);
}

function logOnDevice(message) {
  hrmData.text = message.heartRate;
  hrmTimestamp.text = message.timestamp;
}

function sendToCompanion(message) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(message);
  }
}

// HeartRate will be stop when body is not detected
if (BodyPresenceSensor) {
  body = new BodyPresenceSensor();
  body.addEventListener("reading", () => {
    if (!body.present) {
      heartRateSensor.stop();
    } else {
      heartRateSensor.start();
    }
  });
  body.start();
}


