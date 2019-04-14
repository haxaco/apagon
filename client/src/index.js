import React from "react";
import ReactDOM from "react-dom";
import MainContent from "./components/MainContainer";
import "./styles/main.scss";
import * as serviceWorker from "./serviceWorker";
import {createStore, applyMiddleware} from 'redux'
import { Provider } from "react-redux";

import reduxThunk from 'redux-thunk';
import reducers from './reducers';
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <MainContent />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
