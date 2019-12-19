import { observable, action, configure } from 'mobx';
import { FlyToInterpolator } from 'react-map-gl';
import { easeCubic } from 'd3-ease';
import WebMercatorViewport from 'viewport-mercator-project';

configure({
  enforceActions: 'always'
});

class Map{
  REACT_APP_MAPBOX_TOKEN = "pk.eyJ1IjoiamR2YXJteSIsImEiOiJjazF2MHBkejcwamVnM2ZueWNieXNqd3V2In0.XdI0YE-M2c7NYL7V6VGCiA";

  mapStyle = "mapbox://styles/jdvarmy/ck1vz9g3i1d9z1dp3xdnmr9va";

  @observable viewport = {
    width: '100%',
    height: 378,
    // latitude: this.mapData.latitude,
    // longitude: this.mapData.longitude,
    zoom: 9,
    pitch: 45,
    bearing: 17.6,
    transitionDuration: 1800,
    transitionInterpolator: new FlyToInterpolator(),
    transitionEasing: easeCubic
  };

  @action
  setViewport = (viewport) => {
    this.viewport = viewport;
  };

  @action
  autoFit = (markers) => {
    if(!markers.length) return;

    let coords = [];
    markers.map(el=>{
      const c = el.events[0].i_map;
      coords.push([c.lng*1, c.lat*1]);
    });

    let {latitude, longitude, zoom} =
      coords.length > 1
      ? new WebMercatorViewport(this.viewport).fitBounds(Array.from(coords), {offset: [0, -50]})
      : {latitude: coords[0][1], longitude: coords[0][0], zoom: 16};

    const vp = {
      ...this.viewport,
      latitude,
      longitude,
      zoom,
    };
    this.setViewport(vp);
  };
}

export default new Map();