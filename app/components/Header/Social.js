import React from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';

import style from '../../theme/style';
import { BilegoIconFacebook, BilegoIconVk, BilegoIconInstagram } from '../../theme/bilegoIcons';

const Wrapper = styled.div`
  height: ${style.$heightMenu}px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
`;
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

const vk = (
  <a href="https://vk.com/bilegoru" target="_blank">
    <StyledIconButton aria-label="vk" className="bilego-button">
      {BilegoIconVk}
    </StyledIconButton>
  </a>
);
const facebook = (
  <a href="https://www.facebook.com/bilegoru/" target="_blank">
    <StyledIconButton aria-label="facebook" className="bilego-button">
      {BilegoIconFacebook}
    </StyledIconButton>
  </a>
);
const instagram = (
  <a href="https://www.instagram.com/bilegoru/" target="_blank">
    <StyledIconButton aria-label="facebook" className="bilego-button">
      {BilegoIconInstagram}
    </StyledIconButton>
  </a>
);

export default function Social() {
  return (
    <Wrapper>
      {vk}
      {facebook}
      {instagram}
    </Wrapper>
  );
}
