import { display } from "display";
import * as document from "document";
import { HeartRateSensor } from "heart-rate";
import * as messaging from "messaging";

const hrmAverage = document.getElementById("hrm-average-data");
const hrmValue = document.getElementById("hrm-data");
const hrmCounter = document.getElementById("hrm-counter");

let heartRateSensor;
const heartRateValues = [];
const numberOfMisurations = 60;

if (HeartRateSensor) {
  heartRateSensor = new HeartRateSensor({ frequency: 1 });
  heartRateSensor.addEventListener("reading", handleNewHeartRateData);  
  heartRateSensor.start();
}

function handleNewHeartRateData() {
  
  // Avoid screen switch off
  display.poke();
  
  if (heartRateValues.length <= numberOfMisurations) {
    hrmValue.text = heartRateSensor.heartRate;
    hrmAverage.text = "..."
    hrmCounter.text = heartRateValues.length
    heartRateValues.push(heartRateSensor.heartRate)
  } else {
    hrmValue.text = "..."
    let average = 0;
    for (let i = 0; i < heartRateValues.length; i++) {
      average += heartRateValues[i];
    }
    average = parseInt(average / heartRateValues.length);
    hrmAverage.text = average;
  }
}
