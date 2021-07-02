import React from "react";
import ReactDOM from "react-dom";
import "../index.css";

import View from "./View"

//避免内部滚动条影响到外部滚动条，只能够减低灵敏度，实际上还是会影响到
document.addEventListener("scroll", function (event) {
  event.stopPropagation();
});
const root = document.getElementById("root");
root?.classList.add("p-2")
ReactDOM.render(<View />, root);

