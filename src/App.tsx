import Color from "@arcgis/core/Color";
import Graphic from "@arcgis/core/Graphic";
import Collection from "@arcgis/core/core/Collection";
import Point from "@arcgis/core/geometry/Point";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import type { ArcgisSceneCustomEvent } from "@arcgis/map-components";
import { ArcgisPlacement, ArcgisScene } from "@arcgis/map-components-react";
import { CalciteAction } from "@esri/calcite-components-react";
import { useRef } from "react";
import "./App.css";

const viewStyles = {
  height: "100%",
  width: "100%",
};

function App() {
  const arcgisScene = useRef<HTMLArcgisSceneElement>(null);

  const latitude = 34.0564505;
  const longitude = -117.1957098;

  const point = new Point({
    latitude,
    longitude,
  });

  const simpleMarkerSymbol = new SimpleMarkerSymbol();

  const pointGraphic = new Graphic({
    geometry: point,
    symbol: simpleMarkerSymbol,
  });

  const graphics = new Collection();
  graphics.add(pointGraphic);

  const handleArcgisViewReadyChange = (event: ArcgisSceneCustomEvent<void>) => {
    event.target.center = new Point({
      latitude,
      longitude,
    });

    event.target.view.zoom = 17;

    event.target.graphics = graphics;
  };

  const handleGraphicsChange = () => {
    if (!arcgisScene.current) {
      return;
    }
    console.log(arcgisScene.current?.graphics);
    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.color = new Color([
      randomColor(),
      randomColor(),
      randomColor(),
      1,
    ]);

    const newPointGraphic = arcgisScene.current.graphics.getItemAt(0).clone();
    newPointGraphic.symbol = newSimpleMarkerSymbol;

    const newGraphics = new Collection();
    newGraphics.add(newPointGraphic);
    arcgisScene.current.graphics = newGraphics;
  };

  const randomColor = () => {
    return Math.floor(Math.random() * 256);
  };

  return (
    <ArcgisScene
      basemap="gray-vector"
      ground="world-elevation"
      onArcgisViewReadyChange={(event) => {
        handleArcgisViewReadyChange(event);
      }}
      ref={arcgisScene}
      style={viewStyles}
    >
      <ArcgisPlacement position="top-right">
        <CalciteAction
          icon="zoom-to-object"
          scale="s"
          text="Change graphic's color"
          textEnabled
          onClick={() => {
            handleGraphicsChange();
          }}
        ></CalciteAction>
      </ArcgisPlacement>
    </ArcgisScene>
  );
}

export default App;
