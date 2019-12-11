import React from 'react';
import styled from 'styled-components';
// import image from '../../theme/images/screen-2.jpg';

const Wrap = styled.div`
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
`;

export default function NoContent(){
  return(
    <Wrap>No content</Wrap>
  )
}