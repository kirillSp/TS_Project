import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";


test("render without error", () => {
    let div = document.createElement("div");
    let root = ReactDOM.createRoot(div);
    root.render(<App />)
});