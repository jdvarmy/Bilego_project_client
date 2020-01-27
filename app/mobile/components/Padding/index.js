import React from 'react';
import styled from 'styled-components';
import style from '../../../theme/style';

import lama from '../Footer/images/screen-2.jpg';

const Wrapper = styled.div`
  height: 56px;
  background-image: url('${lama}');
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  div{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${style.$second};
    opacity: 0.8;
  }
  z-index: 9;
  position: absolute;
  width: 100%;
  top: 0;
`;

export default function Padding(props){
  return (
    <Wrapper>
      {props.children}
    </Wrapper>
  )
}
