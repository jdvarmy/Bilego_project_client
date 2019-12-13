import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import style from '../../theme/style';
import {inject, observer} from 'mobx-react';
// import LogoImg from './Bilego-logo-slogan.png'

const Wrapper = styled.div`
  height: ${style.$heightMenu}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

@inject('globalStore')
@observer
class Logo extends Component{
  render() {
    const { globalStore: { baseNameForRouting } } = this.props;

    return (
      <Wrapper>
        <Link to={`/${baseNameForRouting}`}>Logo</Link>
      </Wrapper>
    );
  }
}

export default Logo;
