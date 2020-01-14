import React from 'react';
import styled, { keyframes } from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

const CardWrap = styled(Card)`
  margin-bottom: 30px;
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
  border-radius: 24px;
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
const Title = styled.div`
  background: linear-gradient( to right,rgba(237,237,237,1) 0%,
    rgba(237,237,237,1) 41%,
    rgba(230,225,230,1) 51%,
    rgba(230,225,230,1) 54%,
    rgba(237,237,237,1) 62%,
    rgba(237,237,237,1) 100% );
  background-attachment: fixed;
  background-position-x: 0;
  background-size: 200vw;
  border-radius: 24px;
  animation: ${keyframes`
        from{background-position-x:0;}50%{background-position-x:-200%;}
        to{background-position-x:-200%;}
      `} 2s linear infinite;
  display: block;
  border-radius: 24px;
  height: 22px;
  margin-bottom: 16px;
`;
const SubTitle = styled.div`
  background: linear-gradient( to right,rgba(237,237,237,1) 0%,
    rgba(237,237,237,1) 41%,
    rgba(230,225,230,1) 51%,
    rgba(230,225,230,1) 54%,
    rgba(237,237,237,1) 62%,
    rgba(237,237,237,1) 100% );
  background-attachment: fixed;
  background-position-x: 0;
  background-size: 200vw;
  border-radius: 24px;animation: ${keyframes`
        from{background-position-x:0;}50%{background-position-x:-200%;}
        to{background-position-x:-200%;}
      `} 2s linear infinite;
  display: block;
  border-radius: 24px;
  width: 200px;
  height: 12px;
`;

export default function LoadingForEvents(){
  return(
    <React.Fragment>
      {[1,2,3,4,5,6].map((el, k) => (
        <Grid key={k} item xs={4}>
          <CardWrap>
            <Image />
            <Title />
            <SubTitle />
          </CardWrap>
        </Grid>
      ))}
      <div style={{marginTop: '1em'}}/>
    </React.Fragment>
  )
}
