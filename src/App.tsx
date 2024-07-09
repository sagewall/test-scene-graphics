import Color from "@arcgis/core/Color";
import Graphic from "@arcgis/core/Graphic";
import Collection from "@arcgis/core/core/Collection";
import Point from "@arcgis/core/geometry/Point";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import { ArcgisMap, ArcgisScene } from "@arcgis/map-components-react";
import { useState } from "react";
import "./App.css";

const viewStyles = {
  display: "block",
  height: "200px",
  width: "100%",
};

function App() {
  const [latitude, setLatitude] = useState(34.0564505);
  const [longitude, setLongitude] = useState(-117.1957098);

  const point = new Point({
    latitude,
    longitude,
  });

  const simpleMarkerSymbol = new SimpleMarkerSymbol();

  const pointGraphic = new Graphic({
    geometry: point,
    symbol: simpleMarkerSymbol,
  });

  const graphicsCollection = new Collection();
  graphicsCollection.add(pointGraphic);

  const [graphics, setGraphics] =
    useState<Collection<Graphic>>(graphicsCollection);

  function handleGraphicsChange() {
    const newSimpleMarkerSymbol = simpleMarkerSymbol.clone();
    newSimpleMarkerSymbol.color = new Color([
      randomColor(),
      randomColor(),
      randomColor(),
      1,
    ]);

    const newPointGraphic = graphicsCollection.getItemAt(0).clone();
    newPointGraphic.symbol = newSimpleMarkerSymbol;

    const newGraphics = new Collection();
    newGraphics.add(newPointGraphic);
    setGraphics(newGraphics);
  }

  function handleMove() {
    setLatitude(latitude + 0.00001);
    setLongitude(longitude + 0.00001);
  }

  function randomColor() {
    return Math.floor(Math.random() * 256);
  }

  return (
    <>
      <button onClick={handleGraphicsChange}>Change graphics color</button>
      <button onClick={handleMove}>Slightly move map</button>
      <h2>ArcgisScene</h2>
      <ArcgisScene
        basemap="gray-vector"
        center={
          new Point({
            latitude,
            longitude,
          })
        }
        graphics={graphics}
        ground="world-elevation"
        style={viewStyles}
        zoom={17}
      ></ArcgisScene>
      <h2>ArcgisMap</h2>
      <ArcgisMap
        basemap="gray-vector"
        center={
          new Point({
            latitude,
            longitude,
          })
        }
        graphics={graphics}
        style={viewStyles}
        zoom={17}
      ></ArcgisMap>
    </>
  );
}

export default App;
