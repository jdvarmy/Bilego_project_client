import React from 'react';
import styled from 'styled-components';

import image from './lama-llama-pistolet-me-solo.jpg';

const Wrap = styled.div`
  background-image: url('${p => (p.img)}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 512px;
`;

export default function NoContent(){
  return(
    <Wrap img={image} />
  )
}
