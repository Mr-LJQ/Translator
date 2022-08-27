import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { View } from "./components";
import "../index.css";

const root = document.getElementById("root")!;
root.classList.add("px-2", "pb-2");
createRoot(root).render(
  <StrictMode>
    <View />
  </StrictMode>
);
