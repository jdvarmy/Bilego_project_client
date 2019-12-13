import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import IconButton from '@material-ui/core/IconButton';
import { style } from '../../theme';
import { BilegoIconFacebook, BilegoIconVk } from '../../theme/bilegoIcons';

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
  // eslint-disable-next-line jsx-a11y/href-no-hash
  <a href="#">
    <StyledIconButton aria-label="vk" className="bilego-button">
      {BilegoIconVk}
    </StyledIconButton>
  </a>
);
const facebook = (
  // eslint-disable-next-line jsx-a11y/href-no-hash
  <a href="#">
    <StyledIconButton aria-label="facebook" className="bilego-button">
      {BilegoIconFacebook}
    </StyledIconButton>
  </a>
);

export default function Top4(props) {
  // eslint-disable-next-line react/prop-types
  const { baseNameForRouting } = props;

  return (
    <div>
      <Logo>
        <Link to={`/${baseNameForRouting}`}>Logo</Link>
      </Logo>
      <Subscribe className="bilego-subscribe">
        <div>Подписаться на рассылку:</div>
        <Input.Search
          enterButton="Send"
          onSearch={value => console.log(value)}
          placeholder="Enter your e-mail"
          size="large"
        />
      </Subscribe>
      <Social>
        <div>Следуй за нами:</div>
        <span>
          {vk}
          {facebook}
        </span>
      </Social>
    </div>
  );
}
