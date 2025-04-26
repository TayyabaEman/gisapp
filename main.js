import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import {Fill, Stroke, Style} from 'ol/style';

// Create a base map layer using OpenStreetMap
const baseLayer = new TileLayer({
  source: new OSM(),
});

// Style for Pakistan boundary
const pakistanStyle = new Style({
  fill: new Fill({
    color: 'rgba(241, 8, 8, 0.4)'
  }),
  stroke: new Stroke({
    color: '#FF0000',
    width: 2
  })
});

// Style for provinces
const provinceStyle = new Style({
  fill: new Fill({
    color: 'rgba(5, 158, 31, 0.4)'
  }),
  stroke: new Stroke({
    color: '#008000',
    width: 1
  })
});

// Create vector layer for Pakistan boundary
const pakistanLayer = new VectorLayer({
  source: new VectorSource({
    url: '/pakistan.geojson', // Path to your Pakistan GeoJSON file
    format: new GeoJSON()
  }),
  style: pakistanStyle
});

// Create vector layer for provinces
const provincesLayer = new VectorLayer({
  source: new VectorSource({
    url: '/pakistan_provinces.geojson', // Path to your provinces GeoJSON file
    format: new GeoJSON()
  }),
  style: provinceStyle
});

// Create the map
const map = new Map({
  target: 'map',
  layers: [
    baseLayer,
    pakistanLayer,
    provincesLayer
  ],
  view: new View({
    center: fromLonLat([69.3451, 30.3753]), // Center on Pakistan
    zoom: 5
  })
});
