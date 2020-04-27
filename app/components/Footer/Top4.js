import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import IconButton from '@material-ui/core/IconButton';
import { style } from '../../theme';
import { BilegoIconFacebook, BilegoIconVk, BilegoIconInstagram } from '../../theme/bilegoIcons';

import LogoImg from './Bilego-logo-slogan_white-pink.png';

const Logo = styled.div`
  margin: 40px 0 50px;
`;
const Subscribe = styled.div`
  & > div{
    color: ${style.$white};
    margin-bottom: 8px;
  }
`;
const Social = styled.div`
  margin-top: 50px;
  & > div{
    color: ${style.$white};
    margin-bottom: 8px;
  }
  & > span{
    display: block;
    margin-left: 15px;
  }
`;
const StyledIconButton = styled(IconButton)`
  &.MuiIconButton-root{
    margin: 0 5px;
    svg{
      cursor: pointer;
      vertical-align: middle;
      font-size: 1.25rem!important;
      color: ${style.$white};
      &:hover{
        fill: ${style.$red};
      }
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

export default function Top4(props) {
  // eslint-disable-next-line react/prop-types
  const { baseNameForRouting } = props;

  return (
    <div>
      <Logo>
        <Link to={`/${baseNameForRouting}`}><img alt="Bilego" src={LogoImg}/></Link>
      </Logo>
      <Subscribe className="bilego-subscribe">
        <div>Подпишитесь на акции и анонсы событий:</div>
        <Input.Search
          enterButton="Далее"
          onSearch={value => console.log(value)}
          placeholder="Электронная почта"
          size="large"
        />
      </Subscribe>
      <Social>
        <div>Следуй за нами:</div>
        <span>
          {vk}
          {facebook}
          {instagram}
        </span>
      </Social>
    </div>
  );
}
