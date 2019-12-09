import React from 'react';
import styled from 'styled-components';
import {style} from '../../theme';
import {Link} from 'react-router-dom';
import {Input} from 'antd';
import {BilegoIconFacebook, BilegoIconVk} from '../../theme/BilegoIcons';
import IconButton from '@material-ui/core/IconButton';

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
  <a href="#">
    <StyledIconButton className="bilego-button" aria-label="vk">
      {BilegoIconVk}
    </StyledIconButton>
  </a>
);
const facebook = (
  <a href="#">
    <StyledIconButton className="bilego-button" aria-label="facebook">
      {BilegoIconFacebook}
    </StyledIconButton>
  </a>
);

export default function Top4(props){
  const {baseNameForRouting} = props;

  return(
    <div>
      <Logo>
        <Link to={`/${baseNameForRouting}`}>Logo</Link>
      </Logo>
      <Subscribe className="bilego-subscribe">
        <div>Подписаться на рассылку:</div>
        <Input.Search
          placeholder="Enter your e-mail"
          enterButton="Send"
          size="large"
          onSearch={value => console.log(value)}
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