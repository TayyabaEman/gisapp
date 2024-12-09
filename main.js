import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import {fromLonLat} from 'ol/proj';
import {Style, Fill, Stroke, Text} from 'ol/style';

const pakistanStyle = new Style({
  stroke: new Stroke({
    color: '#00b300 ',
    width: 2
  }),
  fill: new Fill({
    color: 'rgba(0, 0, 0, 0.1)'
  }),
  text: new Text({
    text: 'PAKISTAN',
    font: 'bold 24px Arial',
    fill: new Fill({
      color: '#000000'
    }),
    stroke: new Stroke({
      color: '#ffffff',
      width: 3
    })
  })
});

const provinceStyle = new Style({
  stroke: new Stroke({
    color: '#ff4d4d',
    width: 1.5
  }),
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.1)'
  }),
  text: new Text({
    font: 'bold 14px Arial',
    fill: new Fill({
      color: '#000000'
    }),
    stroke: new Stroke({
      color: '#ffffff',
      width: 2
    })
  })
});

// Create vector layer for Pakistan boundary
const pakistanBoundary = new VectorLayer({
  source: new VectorSource({
    url: '/pakBoundary.geojson',
    format: new GeoJSON()
  }),
  style: pakistanStyle
});
// Create vector layer for provinces
const provinceBoundaries = new VectorLayer({
  source: new VectorSource({
    url: '/provinces.geojson',
    format: new GeoJSON()
  }),
  style: function(feature) {
    const provinceName = feature.get('name'); // Assuming 'name' is the property in your GeoJSON
    provinceStyle.getText().setText(provinceName);
    return provinceStyle;
  }
});


const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    provinceBoundaries,
    pakistanBoundary
  ],
  view: new View({
    center: fromLonLat([69.3451, 30.3753]), // Pakistan's approximate center
    zoom: 5.5
  })
});
