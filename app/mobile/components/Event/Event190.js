import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import style from '../../../theme/style';

const Div = styled.div`
  z-index: 2;
  position: absolute!important;
  background: transparent;
  color: white!important;
  left: 20px;
`;
const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
  height: 190px;
  border-radius: 12px;
`;
const Image = styled.div`
  background-image: url('${p => (p.img)}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 190px;
  transition: transform .5s ease 0s;
`;
const Hover = styled.div`
  background: radial-gradient(circle at right, transparent 40%, black);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  position: absolute;
  height: 190px;
  top: 0;
`;
const Content = styled(Div)`
  bottom: 40px;
`;
const Title = styled.div`
  font-size: 1.5em;
  line-height: 1.15em;
  display: inline-block;
  a{
    color: ${style.$white}
  }
`;

export default function Event190(props) {
  const { image, title, link } = props;

  return (
    <Wrapper>
      <Image img={image} />
      <Link to={link}>
        <Hover />
      </Link>
      <Content>
        <Title><Link to={link}>{title}</Link></Title>
      </Content>
    </Wrapper>
  );
}
