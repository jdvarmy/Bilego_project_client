import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import { Marker as MarkerGL, Popup } from 'react-map-gl';
import { MapDefaultPin } from '../MapPins';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import css from '../../theme/style';

const SPopup = styled(Popup)`
  text-align: center;
  color: ${css.$black};
  div{
    color: ${css.$black};
  }
`;

@inject('globalStore')
@observer
class Marker extends React.Component{
  @observable visible = false;

  @action
  handleVisible = () => {
    this.visible = !this.visible;
  };

  render(){
    const { marker, coords, globalStore:{ baseNameForRouting } } = this.props;
    const { i_title, i_name } = marker.events[0];

    return (
      <>
        <MarkerGL key={marker.itemId} latitude={coords.lat*1} longitude={coords.lng*1} offsetLeft={-28} offsetTop={-34}>
          <MapDefaultPin onClick={() => this.handleVisible(marker)}/>
        </MarkerGL>
        {this.visible &&
          <SPopup
            latitude={coords.lat*1}
            longitude={coords.lng*1}
            closeButton={false}
            closeOnClick={false}
            offsetTop={-29}
            anchor="bottom" >
            <h4><Link to={`/${baseNameForRouting}/item/${i_name}`}>{i_title}</Link></h4>
          </SPopup>
        }
      </>
    )
  }
}

export default Marker;
