import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import {Style, Fill, Stroke} from 'ol/style';


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
    url: 'public/pakistan-boundaries.geojson',
    format: new GeoJSON()
  })
});

map.addLayer(pakistanBoundaries);


// Style for provinces
const provinceStyle = new Style({
  fill: new Fill({
    color: 'rgba(250, 5, 5, 0.4)'
  }),
  stroke: new Stroke({
    color: '#FF0000',
    width: 2
  })
});

// Add provincial boundaries
const provincialBoundaries = new VectorLayer({
  source: new VectorSource({
    url: '.public/pakistan_provinces.geojson',
    format: new GeoJSON()
  }),
  style: provinceStyle
});

map.addLayer(provincialBoundaries);