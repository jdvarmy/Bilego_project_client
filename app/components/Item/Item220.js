import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import style from '../../theme/style';

import I220 from './images/I220.jpg';

const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
  height: 350px;
  .item-220-hover{
    background-image: url('${p => (p.image)}');
    transition: all .5s ease 0s;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    position: absolute;
    height: 205px;
    top: 0;
    border-radius: 12px;
  }
  &:hover .content {
    background-color: transparent;
    position: relative;
  }
  &:hover .item-220-hover{
    height: 100%;
    opacity: 0.3;
  }
}
`;
const Article = styled.article`
  transition: all .5s ease 0s;
  background-color: ${style.$white};
  position: relative;
  overflow: hidden;
  border-radius: 12px;
`;
const Img = styled.div`
  background-image: url('${p => (p.image)}');
  visibility: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 205px;
  border-radius: 12px;
`;
const Content = styled.div`
  z-index: 2;
  background-color: ${style.$white};
  padding: 0 20px 20px;
  .title{
    margin: 10px 0;
    font-size: 1.2em;
  }
  .address{
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    color: ${style.$greydark};
  }
`;

export default function Item220(props) {
  // eslint-disable-next-line react/prop-types
  const { title, address, name, img, baseNameForRouting } = props;

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Wrapper image={img !== undefined ? img : I220}>
      <Article>
        <Img image={img !== undefined ? img : I220} />
        {name !== undefined
        &&
        <React.Fragment>
          <Link to={`/${baseNameForRouting}/item/${name}`}>
            <div className="item-220-hover" />
          </Link>
          <Content className="content">
            <div className="title">{title}</div>
            <div className="address">{address}</div>
          </Content>
        </React.Fragment>
        }
      </Article>
    </Wrapper>
  );
}
