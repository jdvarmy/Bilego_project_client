import React, { Component } from 'react';
import { action, observable } from 'mobx';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactMapGL, { FlyToInterpolator, Marker, Popup } from 'react-map-gl';
import { inject, observer } from 'mobx-react';

import Typography from '@material-ui/core/Typography';
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
const Dot = styled.span`
  display: inline-block;
  margin: 0 5px 1px 15px;
  vertical-align: middle;
  border-radius: 50%;
  background-color: ${css.$red};
  width: 8px;
  height: 8px;
`;
const Wrap = styled.div`
  margin-top: ${css.sizes.base};
  display: flex;
  align-items: center;
  .MuiTypography-body2{
    color: ${css.$second}!important;
  }
  .MuiTypography-caption{
    color: ${css.$greydark};
  }
  .MuiTypography-subtitle1{
    margin-bottom: ${css.sizes.xs}!important;
    color: ${css.$red}!important;
  }
  .MuiTypography-subtitle2{
    margin-bottom: ${css.sizes.xs}!important;
  }
  p{
    color: ${css.$black}!important;
  }
`;
const Image = styled.div`
  height: 80px;
  width: 80px;
  overflow: hidden;
  border-radius: 100%;
  position: relative;
  border: 1px solid ${css.$grey};
  margin-right: ${css.sizes.md};
  div{
    height: 100%;
    background-image: url('${p=>(p.img)}');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
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
      latitude: event.item.latitude && event.item.latitude*1,
      longitude: event.item.longitude && event.item.longitude*1
    })
  }

  @action setViewport = (viewport) => {
    this.viewport = viewport;
  };

  render() {
    const {mapStore:{REACT_APP_MAPBOX_TOKEN, mapStyle}, singleEventStore:{event}, globalStore:{baseNameForRouting}} = this.props;
    const itemImage = event.item.images && event.item.images.thumbnail
      ? event.item.images.thumbnail
      : event.item.images && event.item.images.medium
        ? event.item.images.medium
        : undefined;

    return (
      <Box>
        <ReactMapGL
          {...this.viewport}
          mapStyle={mapStyle}
          mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
          onViewportChange={this.setViewport}
        >
          <Marker latitude={event.item.latitude*1} longitude={event.item.longitude*1} offsetLeft={-28} offsetTop={-34}>
            <MapDefaultPin />
          </Marker>
          <SPopup
            latitude={event.item.latitude*1}
            longitude={event.item.longitude*1}
            closeButton={false}
            closeOnClick={false}
            offsetTop={-29}
            anchor="bottom" >
            <h4><Link to={`/${baseNameForRouting}/item/${event.item.name}`}>{event.item.title}</Link></h4>
            <div>{event.item.address}</div>
          </SPopup>
        </ReactMapGL>
        <Wrap>
          <Image img={itemImage}>
            <div className="event-image"/>
          </Image>
          <div>
            <Typography component="span" variant="caption">{event.item.categories && event.item.categories[0] && event.item.categories[0].name}</Typography>
            <Link to={`/${baseNameForRouting}/item/${event.item_name}`}><Typography component="p" variant="subtitle1">{event.item_title}</Typography></Link>
            <Typography component="p" variant="subtitle2">{event.item.address} {
              event.item.metro && event.item.metro.length > 0 &&
              event.item.metro.map( m => <React.Fragment key={m.number}><Dot/>{m.number}</React.Fragment>)
            }</Typography>
            {event.item.telephone && <Typography component="p" variant="body2">{event.item.telephone}</Typography>}
            {event.item.web && <Typography component="p" variant="body2">{event.item.web}</Typography>}
          </div>
        </Wrap>
      </Box>
    );
  }
}

export default AddressWidthMap;
