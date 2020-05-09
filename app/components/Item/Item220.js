import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import style from '../../theme/style';

const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
  height: 350px;
  .item-220-hover{
    background-image: url('${p => (p.img ? p.img : '')}');
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
  background-image: url('${p => (p.img ? p.img : '')}');
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
  const { title, address, name, images, baseNameForRouting } = props;
  const img = images && images.medium
    ? images.medium
    : images && images.medium_large
      ? images.medium_large
      : undefined;

  return (
    <Wrapper img={img}>
      <Article>
        <Img img={img} />
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
