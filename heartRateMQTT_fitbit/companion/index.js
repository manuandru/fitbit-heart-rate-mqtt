import * as messaging from "messaging";
import { settingsStorage } from "settings";

let url;
let websocket;

// Initialize socket if it has already an url
if (settingsStorage.getItem("websocketURL")) {
  url = JSON.parse(settingsStorage.getItem("websocketURL")).name;
  websocket = new WebSocket(url);
  bindWebsocket(websocket);
  settingsStorage.setItem("sendData", true);
}

settingsStorage.addEventListener("change", (evt) => {
  if (evt?.key === 'websocketURL') {
    url = JSON.parse(evt.newValue).name;
  } else if (evt?.key === 'sendData' && url && evt.newValue == "true") {
    websocket = new WebSocket(url);
    bindWebsocket(websocket);
  } else {
    settingsStorage.setItem("sendData", false);
    websocket = null;
  }
});

messaging.peerSocket.addEventListener("message", (evt) => {
  if (evt?.data.heartRate && evt.data.timestamp) {
    const newData = JSON.stringify({
      heartRate: evt.data.heartRate,
      timestamp: evt.data.timestamp
    });
    if (websocket?.readyState === WebSocket.OPEN) {
      console.log(newData + " arrived from fitbit and send via websocket");
      websocket.send(newData);
    }
  }
});

// Just for checking status during debug
function bindWebsocket(websocket) {
  websocket.addEventListener("open", (evt) => console.log(`CONNECTED ON ${websocket.url}`));
  websocket.addEventListener("close", (evt) => console.log("DISCONNECTED"));
  websocket.addEventListener("message", (evt) => console.log(`MESSAGE: ${evt.data}`));
  websocket.addEventListener("error", (evt) => console.error(`ERROR: ${evt.data}`));
}
