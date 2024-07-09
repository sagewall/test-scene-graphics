import Graphic from "@arcgis/core/Graphic";
import Collection from "@arcgis/core/core/Collection";
import Point from "@arcgis/core/geometry/Point";
import { ArcgisScene } from "@arcgis/map-components-react";
import { useRef } from "react";
import "./App.css";

interface SceneProps {
  graphics?: Collection<Graphic>;
  latitude?: number;
  longitude?: number;
}

const viewStyles = {
  display: "block",
  height: "200px",
  width: "100%",
};

function Scene({ graphics, latitude, longitude }: SceneProps) {
  const arcgisScene = useRef<HTMLArcgisSceneElement>(null);

  return (
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
      ref={arcgisScene}
      style={viewStyles}
      zoom={17}
    ></ArcgisScene>
  );
}

export default Scene;
