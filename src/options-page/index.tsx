import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { OptionsPage } from "./components/OptionsPage";
import { fetchStorage, storageStoreSubscribe } from "./stores";
import "../index.css";

document.body.classList.add("bg-gray-200");

const root = document.getElementById("root")!;
fetchStorage();
const unsubscribe = storageStoreSubscribe(function () {
  unsubscribe();
  createRoot(root).render(
    <StrictMode>
      <OptionsPage />
    </StrictMode>
  );
});
