import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import {fromLonLat} from 'ol/proj';
import {Style, Fill, Stroke, Text} from 'ol/style';
import {getRenderPixel} from 'ol/render.js';
import ImageTile from 'ol/source/XYZ';
import XYZ from 'ol/source/XYZ';
import LayerSwitcher from 'ol-layerswitcher';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';




const osm = new TileLayer({
  source: new OSM(),
});

const key = 'Yes3wYWUr5LVP6q2nKmE';

const attributions =
  '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

  const aerial = new TileLayer({
    source: new XYZ({
      attributions: attributions,
      url: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=' + key,
      maxZoom: 20,
    }),
  });
  
const highlightStyle = new Style({
  fill: new Fill({
    color: '#EEE',
  }),
  stroke: new Stroke({
    color: '#3399CC',
    width: 2,
  }),
});

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
  })
});

// Add these event listeners
provinceBoundaries.getSource().on('featuresloadend', function() {
  console.log('Provinces loaded successfully');
});

provinceBoundaries.getSource().on('featuresloaderror', function() {
  console.error('Error loading provinces');
});



const usermap = new Map({
  target: 'map',
  layers: [
    osm,
    aerial,
    provinceBoundaries,
    pakistanBoundary
  ],
  view: new View({
    center: fromLonLat([69.3451, 30.3753]),
    zoom: 5.5
  })
});

const swipe = document.getElementById('swipe');

aerial.on('prerender', function (event) {
  const ctx = event.context;
  const mapSize = map.getSize();
  const width = mapSize[0] * (swipe.value / 100);
  const tl = getRenderPixel(event, [width, 0]);
  const tr = getRenderPixel(event, [mapSize[0], 0]);
  const bl = getRenderPixel(event, [width, mapSize[1]]);
  const br = getRenderPixel(event, mapSize);

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(tl[0], tl[1]);
  ctx.lineTo(bl[0], bl[1]);
  ctx.lineTo(br[0], br[1]);
  ctx.lineTo(tr[0], tr[1]);
  ctx.closePath();
  ctx.clip();
});

aerial.on('postrender', function (event) {
  const ctx = event.context;
  ctx.restore();
});

swipe.addEventListener('input', function () {
  map.render();
});


const selected = [];

const status = document.getElementById('status');

const layerSwitcher = new LayerSwitcher({
  collapsible: true,
  collapsed: false
});
map.on('singleclick', function (e) {
  map.forEachFeatureAtPixel(e.pixel, function (f) {
    const selIndex = selected.indexOf(f);
    if (selIndex < 0) {
      selected.push(f);
      f.setStyle(highlightStyle);
    } else {
      selected.splice(selIndex, 1);
      f.setStyle(undefined);
    }
  });

  status.innerHTML = '&nbsp;' + selected.length + ' selected features';
});
// Create layer groups for better organization
const baseMaps = new LayerGroup({
  title: 'Base Maps',
  layers: [osm, aerial]
});

const overlays = new LayerGroup({
  title: 'Overlays',
  layers: [provinceBoundaries, pakistanBoundary]
});

// Update map layers
const map = new Map({
  target: 'map',
  layers: [baseMaps, overlays],
  view: new View({
    center: fromLonLat([69.3451, 30.3753]),
    zoom: 5.5
  })
});

// Add layer switcher control
const LayerSwitcher = new LayerSwitcher({
  tipLabel: 'Legend',
  groupSelectStyle: 'group'
});
map.addControl(layerSwitcher);
