import React from 'react';
import styled from 'styled-components';

import style from '../../theme/style';

const Wrapper = styled.div`
  width: 100%;
  background: radial-gradient(circle at right, ${style.$second} 20%, ${style.$blackdark});
  border-radius: 12px;
  
  svg {height: inherit; width: 100%; border-radius: 12px;}
  svg text {text-anchor: start;}
  svg #${p=>p.mask}-alpha {fill: white;}
  svg .title {font-size: 28px; font-weight: bold; text-transform: uppercase;}
`;
const Container = styled.figure`
  height: 300px;
  overflow: hidden;
  position: relative;
  border-radius: 12px;
  a {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
  }
  &:hover .media {transform: scale(1.1)}
`;
const Media = styled.div`
  background-image:url(${p=>(p.image)});
  background-position: center;
  background-size: cover;
  height: 100%;
  position: absolute;
  transition: transform .5s ease 0s;
  width: 100%;
  opacity: 0.7;
`;
const Figcaption = styled.figcaption`
  position: absolute;
  left: 0;
  top: 0;
  width: 42%;
  // border-radius: 12px;
  color: #252830;
  height: calc(100% - 30px);
  margin: 30px;
`;

export default function Selection(props){
  const {mask, image, title, link} = props;

  return(
    <Wrapper className="bilego-recommend" mask={mask}>
      <Container>
        <Media className="media" image={image}/>
        <Figcaption>
          <svg viewBox="0 0 200 200" version="1.1" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <mask id={`${mask}-mask`} x="0" y="0" width="100%" height="100%">
                <rect id={`${mask}-alpha`} x="0" y="0" width="100%" height="100%"/>
                {title.map((el,k)=>(
                  <text key={el} className="title" dx="10%" dy={`${2+k}.5em`}>{el}</text>
                ))}
              </mask>
            </defs>
            <rect id={`${mask}-base`} x="0" y="0" width="100%" height="100%"/>
          </svg>
        </Figcaption>
        <a href={link} />
      </Container>
    </Wrapper>
  );
}