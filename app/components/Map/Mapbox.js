import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { MapDefaultPin } from '../../components/MapPins';
import { NoSsr } from '@material-ui/core';

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

  handlerClick = () => {
    console.log('hello')
  };

  render() {
    const {mapStore:{REACT_APP_MAPBOX_TOKEN, mapStyle, viewport, setViewport, autoFit}, rightPanelStore} = this.props;

    return (
      <NoSsr>
        <ReactMapGL
          {...viewport}
          mapStyle={mapStyle}
          mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
          onViewportChange={setViewport}
          onLoad={() => {autoFit(rightPanelStore.markers)}}
        >
          {rightPanelStore.markers.map(el=>{
            const coords = el.events[0].i_map;
            return(
              <Marker key={el.itemId} latitude={coords.lat*1} longitude={coords.lng*1} offsetLeft={-28} offsetTop={-34}>
                <MapDefaultPin onClick={this.handlerClick}/>
              </Marker>
            )
          })}
        </ReactMapGL>
      </NoSsr>
    );
  }
}

export default Mapbox;
