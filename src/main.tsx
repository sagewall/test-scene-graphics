import "@arcgis/core/assets/esri/themes/light/main.css";
import "@arcgis/map-components/dist/components/arcgis-placement";
import "@arcgis/map-components/dist/components/arcgis-scene";
import "@esri/calcite-components/dist/calcite/calcite.css";
import { setAssetPath } from "@esri/calcite-components/dist/components";
import "@esri/calcite-components/dist/components/calcite-action";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
setAssetPath("https://js.arcgis.com/calcite-components/2.8.5/assets");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
