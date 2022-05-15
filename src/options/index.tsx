import React from "react";
import ReactDOM from "react-dom";
import store from "./features/store";
import { Provider } from "react-redux";
import { fetchAnki } from "./features/ankiSlice";
import { fetchStorage } from "./features/storageSlice";
import "../index.css";

import { Options } from "./Options";

const root = document.getElementById("root");
root?.classList.add("h-100");

store.dispatch(fetchStorage());
store.dispatch(fetchAnki());

let unsubscribe = store.subscribe(() => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Options />
      </Provider>
    </React.StrictMode>,
    root
  );
  unsubscribe()
})