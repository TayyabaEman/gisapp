import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import OSM from 'ol/source/OSM';

// Create base map
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [7500000, 3500000],  // Centered on Pakistan
    zoom: 5
  })
});

// Add Pakistan boundaries
const pakistanBoundaries = new VectorLayer({
  source: new VectorSource({
    url: 'D:\New folder\Tayyaba\vs code\WebGIS\gisapp\public',
    format: new GeoJSON()
  })
});

map.addLayer(pakistanBoundaries);
