import React from "react";
import ReactDOM from "react-dom";
import store from "./features/store";
import { Provider } from "react-redux";

import "../index.css";

import { fetchStorage } from "./features/storageSlice";
import {getAnkiConnectionVersion, getDeckNames, getModelNames} from "./features/ankiSlice"

import { Options } from "./Options";

const root = document.getElementById("root");
root?.classList.add("h-100");

store.dispatch(fetchStorage())
store.dispatch(getDeckNames())
store.dispatch(getModelNames())
store.dispatch(getAnkiConnectionVersion())


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Options />
    </Provider>
  </React.StrictMode>,
  root
);
