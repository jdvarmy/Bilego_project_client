import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import style from '../../theme/style';
import { BilegoIconFacebook, BilegoIconVk, BilegoIconTwitter } from '../../theme/bilegoIcons';
import IconButton from '@material-ui/core/IconButton';

const StyledIconButton = styled(IconButton)`
  margin: 0 5px!important;
  svg{
    cursor: pointer;
    vertical-align: middle;
    font-size: 1.25rem!important;
    color: ${style.$black};
    &:hover{
      fill: ${style.$red};
    }
  }
`;

@withRouter
@inject('globalStore', 'singleEventStore')
@observer
class Shared extends React.Component{
  render(){
    const {type, singleEventStore:{event}, globalStore:{siteAddress}, history} = this.props,
      link = siteAddress && history.location.pathname ? siteAddress + history.location.pathname : '#',
      descr = event !== undefined && event.descr ? event.descr : '',
      title = event !== undefined && event.title ? event.title : '',
      img = event !== undefined && event.img ? event.img : '';

    return (
      <React.Fragment>
        {type === 'vk' && <Vk link={link} title={title} descr={descr} media={img}/>}
        {type === 'facebook' && <Facebook link={link} descr={descr} />}
        {type === 'twitter' && <Twitter link={link} descr={descr} />}
      </React.Fragment>
    );
  }
}
export default Shared;

// https://habr.com/ru/post/250021/
function Vk(props){
  const {link, title, descr, media} = props,
    share = `http://vk.com/share.php?url=${link}&title=${title}&description=${descr}&image=${media}`;

  return (
    <a href={share} target="_blank">
      <StyledIconButton className="bilego-button" aria-label="vk">
        {BilegoIconVk}
      </StyledIconButton>
    </a>
  )
}
function Facebook(props){
  const {link, descr} = props,
    share = `http://www.facebook.com/sharer.php?u=${link}&t=${descr}`;

  return (
    <a href={share} target="_blank">
      <StyledIconButton className="bilego-button" aria-label="facebook">
        {BilegoIconFacebook}
      </StyledIconButton>
    </a>
  )
}
function Twitter(props){
  const {link, descr} = props,
    share = `http://twitter.com/share?url=${link}&text=${descr}`;

  return (
    <a href={share} target="_blank">
      <StyledIconButton className="bilego-button" aria-label="twitter">
        {BilegoIconTwitter}
      </StyledIconButton>
    </a>
  )
}