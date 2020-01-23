import React from 'react';
import {BilegoIconFacebook, BilegoIconVk} from '../../theme/bilegoIcons';

// todo: https://habr.com/ru/post/250021/
export function Vk(props){
  const {site, link, descr} = props,
    share = ''

  return (
    <a href={share}>
      <StyledIconButton className="bilego-button" aria-label="vk">
        {BilegoIconVk}
      </StyledIconButton>
    </a>
  )
}
const Facebook = (
  <a href="http://www.facebook.com/sharer.php?u=_URL_&t=_DESCTEXT_">
    <StyledIconButton className="bilego-button" aria-label="facebook">
      {BilegoIconFacebook}
    </StyledIconButton>
  </a>
);