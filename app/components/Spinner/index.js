import React from 'react';
import styled from 'styled-components';

import { style } from '../../theme';

export default function Spinner (props) {
  const {leftPadding} = props;

  const Wrap = styled.div`
    width: 100px;
    height: 102px;
    border-radius: 100%;
    position: fixed;
    top: ${()=>{
    const w = document.documentElement.clientHeight;
    return w - 50 - (w / 100 * 50)
  }}px;
    left: calc(${()=>(leftPadding ? 50 - leftPadding : 50)}% - 50px);
  `;
  const Circle = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    div{
      width: 100%;
      height: 100%;
      border-radius: 100%;
      border: 5px solid rgba(251,29,88,0.36);
      border-right: none;
      border-top: none;
      backgroudn-clip: padding;
      box-shadow: inset 0px 0px 10px transparentize(${style.$red}, 0.85);
    }
  `;

  return(
    <Wrap className="bilego-spinner">
      {[1,2,3,4,5].map(el=>(
        <Circle key={el} className="circle">
          <div/>
        </Circle>
      ))}
    </Wrap>
  );
};