import React from 'react';
import styled from 'styled-components';
import image from './lama-llama-pistolet-me-solo.jpg';

const Wrap = styled.div`
  min-height: 533px;
  background-image: url('${p => (p.img)}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export default function NoContent(){
  return(
    <Wrap img={image}/>
  )
}
