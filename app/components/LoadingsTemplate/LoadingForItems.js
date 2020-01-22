import React from 'react';
import styled, { keyframes } from 'styled-components';

import Card from '@material-ui/core/Card';

const Wrapper = styled.div`
  padding: 36px 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 870px;
`;
const CardWrap = styled(Card)`
`;
const Image = styled.div`
  background: linear-gradient( to right,
    rgba(237,237,237,1) 0%,
    rgba(237,237,237,1) 41%,
    rgba(230,225,230,1) 51%,
    rgba(230,225,230,1) 54%,
    rgba(237,237,237,1) 62%,
    rgba(237,237,237,1) 100% );
  background-attachment: fixed;
  background-position-x: 0;
  background-size: 200vw;
  animation: ${keyframes`
        from{background-position-x:0;}50%{background-position-x:-200%;}
        to{background-position-x:-200%;}
      `} 2s linear infinite;
  display: block;
  border-radius: 12px;
  margin-bottom: 24px;
  height: 220px;
  width: 100%;
`;
const Title = styled(Image)`
  border-radius: 24px;
  height: 22px;
  width: 200px;
  margin-bottom: 12px;
`;
const SubTitle = styled(Image)`
  border-radius: 24px;
  width: 314px;
  height: 12px;
  display: inline-block;
  margin-right: 15px;
  line-height: 19px;
  margin-bottom: 8px;
`;
const Cat = styled(SubTitle)`
  display: block;
  width: 100px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 0;
  line-height: 16px;
`;
const Circle = styled(Image)`
  width: 70px;
  height: 70px;
  border-radius: 50%;
`;

export default function LoadingForEvents(){
  return(
    <React.Fragment>
      {[1,2,3,4,5,6].map((el, k) => (
        <Wrapper key={k}>
          <div>
            <Cat />
            <Title />
            <SubTitle />
          </div>
          <div>
            <Circle />
          </div>
        </Wrapper>
      ))}
      <div style={{marginTop: '1em'}}/>
    </React.Fragment>
  )
}
