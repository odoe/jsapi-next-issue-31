import TileLayer from "esri/layers/TileLayer";
import ArcGISMap from "esri/Map";
import MapView from "esri/views/MapView";

import GraphicsLayer from "esri/layers/GraphicsLayer";

import Graphic from "esri/Graphic";

const map = new ArcGISMap();

const view = new MapView({
    map,
    container: "app",
    extent: {
        spatialReference: {
            wkid: 102100
        },
    },
    zoom: 5,
    center: [32.37700182573525, 51.571642079194056]
});

const createGraphicFromPoint = ({longitude, latitude}: any) => {
    return new Graphic({
        geometry: {type: 'point', longitude, latitude} as any,
        symbol: {
            type: "simple-marker",
            color: [226, 119, 40, 0.8],
            outline: {
                color: [255, 255, 255],
                width: 2
            }
        } as any
    });
};

const tileLayer = new TileLayer({url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer"});
map.add(tileLayer);

const grLayer = new GraphicsLayer();
const grLayer1 = new GraphicsLayer();
grLayer.add(createGraphicFromPoint({longitude: 37.524, latitude: 52.56}));

map.add(grLayer);
map.add(grLayer1);

view.on('click', (event) => {
    grLayer1.opacity = grLayer1.opacity - 0.1;
    grLayer1.add(createGraphicFromPoint(event.mapPoint));
    setTimeout(() => grLayer.removeAll(), 2000);
});
