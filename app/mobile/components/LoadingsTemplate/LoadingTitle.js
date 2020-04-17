import React from 'react';
import styled, { keyframes } from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { style } from '../../../theme';

const Wrap = styled.div`
  .MuiPaper-elevation1{
    box-shadow: none;
  }
  padding: 24px;
  overflow: hidden;
  margin-top: -16px;
  border-radius: 16px 16px 0 0;
  z-index: 1;
  position: relative;
  padding-top: 16px;
  background: ${style.$white};
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
  margin: 25px auto;
  border-radius: 12px;
  width: 100%;
  text-align: center;
`;
const Title = styled(Image)`
  border-radius: 24px;
  margin: 10px 0;
  height: 40px;
`;

export default function LoadingTitle(){
  return (
    <React.Fragment>
      <Wrap>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Title />
          </Grid>
        </Grid>
      </Wrap>
    </React.Fragment>
  );
}
