/**
 * OpenMaine Mapping
 *
 * https://leafletjs.com/examples/mobile/
 * https://leafletjs.com/examples/geojson/
 * https://leafletjs.com/examples/geojson/sample-geojson.js
 * https://leafletjs.com/examples/choropleth/
 * https://docs.mapbox.com/mapbox-gl-js/example/geojson-polygon/
 */

import React from "react";
import { render } from "react-dom";

import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

import "./styles.css";

const portland = require("./data/cityHalls/portland.json");
const westbrook = require("./data/cityHalls/westbrook.json");

const aroostook = require("./data/counties/aroostook.json");
const androscoggin = require("./data/counties/androscoggin.json");
const cumberland = require("./data/counties/cumberland.json");

const Maine = {
  state: [45.137451, -68.137343],
  counties: [androscoggin, aroostook, cumberland],
  cityHalls: [portland, westbrook]
};

const tiles = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

class App extends React.Component {
  componentDidMount() {
    // Create map
    this.map = L.map("map", {
      center: Maine.state,
      zoom: 7
    });

    // Add map tiles
    L.tileLayer(tiles, {
      maxZoom: 18,
      attribution
    }).addTo(this.map);

    // Add counties to map
    L.geoJson(Maine.counties, {
      onEachFeature: (feature, layer) => {
        // Show the property name
        layer.bindPopup(feature.properties.name);
      }
    }).addTo(this.map);

    // Add city halls to map
    L.geoJson(Maine.cityHalls, {
      // Iterate through each GeoJSON feature
      onEachFeature: feature => {
        L.circle(feature.geometry.coordinates, 200)
          .bindPopup(feature.properties.name)
          .addTo(this.map);
      }
    }).addTo(this.map);

    // this.map.flyTo(portland.geometry.coordinates, 16);
  }

  render() {
    return <div id="map" title="OpenMaine Mapping" />;
  }
}

render(<App />, document.getElementById("root"));

export default App;
