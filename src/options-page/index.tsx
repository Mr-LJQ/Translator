import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { OptionsPage } from "./components/OptionsPage";
import { fetchStorage, storageStoreSubscribe } from "./stores";
import "../index.css";

const root = document.getElementById("root")!;
root.classList.add("h-[26rem]", "w-[30rem]");
fetchStorage();
const unsubscribe = storageStoreSubscribe(function () {
  unsubscribe();
  createRoot(root).render(
    <StrictMode>
      <OptionsPage />
    </StrictMode>
  );
});
