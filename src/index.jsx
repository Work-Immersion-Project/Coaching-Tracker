import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./sagas";

import AppContainer from "./components/AppContainer";
import reducers from "./reducers";

const saga = createSagaMiddleware();
let middlewares = [saga];
let enhancers = [applyMiddleware(...middlewares)];
if (process.env.NODE_ENV === "development") {
  enhancers.push(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
const store = createStore(reducers, compose(...enhancers));
saga.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.querySelector("#root")
);
