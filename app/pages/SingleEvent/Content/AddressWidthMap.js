import React, { Component } from 'react';
import { action, observable } from 'mobx';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactMapGL, { FlyToInterpolator, Marker, Popup } from 'react-map-gl';
import { inject, observer } from 'mobx-react';

import Box from '@material-ui/core/Box';
import { MapDefaultPin } from '../../../components/MapPins';
import { easeCubic } from 'd3-ease';

import css from '../../../theme/style';

const SPopup = styled(Popup)`
  text-align: center;
  color: ${css.$black};
  div{
    color: ${css.$black};
  }
`;

@inject('mapStore', 'singleEventStore', 'globalStore')
@observer
class AddressWidthMap extends Component {
  @observable viewport = {
    width: '100%',
    height: 288,
    zoom: 16,
    pitch: 45,
    bearing: 17.6,
    transitionDuration: 1800,
    transitionInterpolator: new FlyToInterpolator(),
    transitionEasing: easeCubic
  };

  componentDidMount() {
    const {singleEventStore:{event}} = this.props;
    this.setViewport({
      ...this.viewport,
      latitude: event.item.map.latitude && event.item.map.latitude*1,
      longitude: event.item.map.longitude && event.item.map.longitude*1
    })
  }

  @action setViewport = (viewport) => {
    this.viewport = viewport;
  };

  render() {
    const {mapStore:{REACT_APP_MAPBOX_TOKEN, mapStyle}, singleEventStore:{event}, globalStore:{baseNameForRouting}} = this.props;

    return (
      <Box>
        <ReactMapGL
          {...this.viewport}
          mapStyle={mapStyle}
          mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
          onViewportChange={this.setViewport}
        >
          <Marker latitude={event.item.map.latitude*1} longitude={event.item.map.longitude*1} offsetLeft={-28} offsetTop={-34}>
            <MapDefaultPin />
          </Marker>
          <SPopup
            latitude={event.item.map.latitude*1}
            longitude={event.item.map.longitude*1}
            closeButton={false}
            closeOnClick={false}
            offsetTop={-29}
            anchor="bottom" >
            <h4><Link to={`/${baseNameForRouting}/item/${event.item_name}`}>{event.item_title}</Link></h4>
            <div>{event.item.address}</div>
          </SPopup>
        </ReactMapGL>
      </Box>
    );
  }
}

export default AddressWidthMap;
