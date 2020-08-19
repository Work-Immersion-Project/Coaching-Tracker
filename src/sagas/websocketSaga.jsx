import { UPDATE_WEBSOCKET } from "../types";
import { takeEvery, select } from "redux-saga/effects";
import { openWebsocketsSelector } from "../selectors";
import { config } from "../consts/config";

function* updateWebsocketSaga() {
  while (true) {
    const websockets = yield select(openWebsocketsSelector);
    yield new Promise((resolve) => {
      setTimeout(resolve, config.WS_TIMEOUT);
    });
    websockets.forEach((ws) => {
      if (ws.readyState !== WebSocket.CLOSED) {
        ws.send("keep-alive");
      }
    });
  }
}

export function* watchWebsocket() {
  yield takeEvery(UPDATE_WEBSOCKET, updateWebsocketSaga);
}
