import React from 'react';
import styled, { keyframes } from 'styled-components';

import Grid from '@material-ui/core/Grid';

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
  height: 68px;
  width: 100%;
`;
const Dates = styled(Image)`
  width: 100px;
`;
const Time = styled(Image)`
  width: 100px;
`;
const Social = styled(Image)`
  width: 100px;
`;

export default function LoadingContentInfo(){
  return(
    <Grid container spacing={4}>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={5}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Dates />
          </Grid>
          <Grid item xs={6}>
            <Dates />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Time />
          </Grid>
          <Grid item xs={6}>
            <Social />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}