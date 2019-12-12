import React, { Component } from 'react';
import { action, observable } from 'mobx';
import ReactMapGL, { Marker } from 'react-map-gl';
import { inject, observer } from 'mobx-react';

import Box from '@material-ui/core/Box';
import { MapDefaultPin } from '../../../components/MapPins';

@inject('mapStore', 'singleEventStore')
@observer
class AddressWidthMap extends Component {
  @observable viewport = {};

  componentDidMount() {
    const {event} = this.props.singleEventStore;
    this.setViewport({
      width: '100%',
      height: 288,
      latitude: event.item.map.latitude !== undefined && event.item.map.latitude*1,
      longitude: event.item.map.longitude !== undefined && event.item.map.longitude*1,
      zoom: 16
    })
  }

  @action setViewport = (viewport) => {
    this.viewport = viewport;
  };

  render() {
    const {mapStore:{REACT_APP_MAPBOX_TOKEN, mapStyle}, singleEventStore:{event}} = this.props;

    return (
      <Box>
        <ReactMapGL
          {...this.viewport}
          mapStyle={mapStyle}
          mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
          onViewportChange={this.setViewport}
        >
          <Marker latitude={event.item.map.latitude*1} longitude={event.item.map.longitude*1}>
            <MapDefaultPin />
          </Marker>
        </ReactMapGL>
      </Box>
    );
  }
}

export default AddressWidthMap;