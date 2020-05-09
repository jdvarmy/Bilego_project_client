import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import ReactMapGL, { FlyToInterpolator, Marker, Popup } from 'react-map-gl';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import { MapDefaultPin } from '../../components/MapPins';
import Typography from '@material-ui/core/Typography';
import { easeCubic } from 'd3-ease';

import css from '../../theme/style';

const Padding = styled.div`
  padding-top:48px;
`;
const SPopup = styled(Popup)`
  text-align: center;
  color: ${css.$black};
  div{
    color: ${css.$black};
  }
`;

@inject('mapStore')
@observer
class Address extends Component {
  @observable viewport = {
    width: '100%',
    height: 308,
    pitch: 45,
    zoom: 16,
    bearing: 17.6,
    transitionDuration: 1800,
    transitionInterpolator: new FlyToInterpolator(),
    transitionEasing: easeCubic
  };

  componentDidMount() {
    const {item} = this.props;
    this.setViewport({
      ...this.viewport,
      latitude: item.latitude !== undefined && item.latitude*1,
      longitude: item.longitude !== undefined && item.longitude*1
    })
  }

  @action setViewport = (viewport) => {
    this.viewport = viewport;
  };

  render() {
    const {mapStore:{ REACT_APP_MAPBOX_TOKEN, mapStyle }, item} = this.props;

    return (
      <React.Fragment>
        <Grid style={{padding: '20px'}} container spacing={4}>
          <Grid item xs={12}>
            <Typography component="h3" variant="h2">Карта</Typography>
          </Grid>
        </Grid>
        <ReactMapGL
          {...this.viewport}
          mapStyle={mapStyle}
          mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
          onViewportChange={this.setViewport}
        >
          <Marker latitude={item.latitude*1} longitude={item.longitude*1} offsetLeft={-28} offsetTop={-34}>
            <MapDefaultPin />
          </Marker>
          <SPopup
            latitude={item.latitude*1}
            longitude={item.longitude*1}
            closeButton={false}
            closeOnClick={false}
            offsetTop={-29}
            anchor="bottom" >
            <h4>{item.title}</h4>
            <div>{item.address}</div>
          </SPopup>
        </ReactMapGL>
        <Padding />
      </React.Fragment>
    );
  }
}

export default Address;
