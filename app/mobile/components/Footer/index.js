import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Input } from 'antd';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { style } from '../../../theme';
import { BilegoIconFacebook, BilegoIconVk } from '../../../theme/bilegoIcons';

import lama from './images/screen-2.jpg';

const Wrapper = styled(Grid)`
  width: 100%!important;
  margin: 0!important;
  margin-top: 25px!important;
  position: relative!important;
  .MuiGrid-root{
    position: relative;
  }
  .bilego-flex.MuiGrid-item{
    display: flex;
    align-items: center;
  }
  .ant-input-wrapper{
    position: relative;
      display: flex;
      height: 44px;
      width: 100%;
      input, button{
        position: absolute;
      }
      input {
        width: 100%;
        height: 100%;
        border-radius: 80px;
        border: 1px solid #4d4d50;
        font-size: 14px;
        padding: 0 25px;
        letter-spacing: 0.05em;
        color: ${style.$white};
        background: transparent;
      }
      button{
        top: 2px;
        right: 2px;
        width: 85px;
        border: none;
        border-radius: 80px;
        background: ${style.$red};
      }
  }
`;
const Backgr = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const SBackgr = styled(Backgr)`
  background: ${style.$second};
  opacity: 0.8;
`;
const Image = styled(Backgr)`
  background-image: url('${lama}');
  background-size: cover;
  background-position: 50% 25%;
  background-repeat: no-repeat;
`;
const Logo = styled.div`
  margin: 40px 0 50px;
`;
const Subscribe = styled.div`
  > div{
    color: ${style.$white};
    margin-bottom: 8px;
  }
`;
const Social = styled.div`
  margin-top: 50px!important;
  text-align: right!important;
  > div{
    color: ${style.$white};
    margin-bottom: 8px;
  }
  > span{
    display: block;
    margin-right: 15px;
  }
`;
const StyledIconButton = styled(IconButton)`
  margin: 0 5px!important;
  svg{
    vertical-align: middle;
    font-size: 1.25rem!important;
    color: ${style.$white};
    &:hover{
      fill: ${style.$red};
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

@inject('globalStore')
@observer
class Footer extends Component{
  render(){
    const {globalStore:{baseNameForRouting}} = this.props;

    return(
      <Wrapper container spacing={6}>
        <Image/>
        <SBackgr/>
        <Grid item xs={12}>
          <Logo>
            <Link to={`/${baseNameForRouting}`}>Logo</Link>
          </Logo>
          <Subscribe>
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
            </span>
          </Social>
        </Grid>
      </Wrapper>
    );
  }
}

export default Footer;
