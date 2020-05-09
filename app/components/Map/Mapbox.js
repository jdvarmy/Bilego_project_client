import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ReactMapGL from 'react-map-gl';

import { NoSsr } from '@material-ui/core';
import Marker from './Marker';

@inject('mapStore', 'rightPanelStore', 'globalStore')
@observer
class Mapbox extends Component {
  componentDidMount() {
    const {globalStore:{CITY, cities}, mapStore:{viewport, setViewport}} = this.props;
    const vp = {
      ...viewport,
      ...cities[CITY].mapData
    };
    setViewport(vp);
  }

  render() {
    const {mapStore:{REACT_APP_MAPBOX_TOKEN, mapStyle, viewport, setViewport, autoFit}, rightPanelStore:{markers}} = this.props;
    return (
      <NoSsr>
        <ReactMapGL
          {...viewport}
          mapStyle={mapStyle}
          mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
          onViewportChange={setViewport}
          onLoad={() => {autoFit(markers)}}
        >
          {markers.map((el, k)=>{
            const coords = {lat: el.events[0].item.latitude, lng: el.events[0].item.longitude};
            return(
              <Marker key={k} marker={el} coords={coords} />
            )
          })}
        </ReactMapGL>
      </NoSsr>
    );
  }
}

export default Mapbox;
