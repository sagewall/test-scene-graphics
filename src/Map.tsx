import Graphic from "@arcgis/core/Graphic";
import Collection from "@arcgis/core/core/Collection";
import Point from "@arcgis/core/geometry/Point";
import { ArcgisMap } from "@arcgis/map-components-react";
import { useRef } from "react";
import "./App.css";

interface MapProps {
  graphics?: Collection<Graphic>;
  latitude?: number;
  longitude?: number;
}

const viewStyles = {
  display: "block",
  height: "200px",
  width: "100%",
};

function Map({ graphics, latitude, longitude }: MapProps) {
  const arcgisMap = useRef<HTMLArcgisMapElement>(null);

  return (
    <ArcgisMap
      basemap="gray-vector"
      center={
        new Point({
          latitude,
          longitude,
        })
      }
      graphics={graphics}
      ref={arcgisMap}
      style={viewStyles}
      zoom={17}
    ></ArcgisMap>
  );
}

export default Map;
