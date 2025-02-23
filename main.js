import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

// Create base map
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: fromLonLat([69.3451, 30.3753]),  // Centered on Pakistan
    zoom: 5
  })
});

// Add Pakistan boundaries
const pakistanBoundaries = new VectorLayer({
  source: new VectorSource({
    url: 'path/to/pakistan-boundaries.geojson',
    format: new GeoJSON()
  })
});

map.addLayer(pakistanBoundaries);


// Style for provinces
const provinceStyle = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.4)'
  }),
  stroke: new Stroke({
    color: '#005900',
    width: 2
  })
});

// Add provincial boundaries
const provincialBoundaries = new VectorLayer({
  source: new VectorSource({
    url: './data/pakistan_provinces.geojson',
    format: new GeoJSON()
  }),
  style: provinceStyle
});

map.addLayer(provincialBoundaries);