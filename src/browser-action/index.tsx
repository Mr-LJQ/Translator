import React from "react";
import { createRoot } from "react-dom/client";
import { Popup } from "./Popup";
import "../index.css";

const root = document.getElementById("root")!;
root.classList.add("w-44", "m-1", "text-sm");
createRoot(root).render(<Popup />);
