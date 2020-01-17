import React from 'react';
import styled, { keyframes } from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

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
  height: 220px;
  width: 100%;
`;
const Image430 = styled(Image)`
  height: 430px;
`;
const Image200 = styled(Image)`
  height: 200px;
`;

export default function LoadingForEventsWith430and200(){
  return(
    <React.Fragment>
      <Grid item xs={4}>
        <Card>
          <Image430 />
        </Card>
      </Grid>
      <Grid item xs={8}>
        <Grid container spacing={4}>
          {[1,2,3,4].map((el, k) => (
            <Grid key={k} item xs={6}>
              <Card>
                <Image200 />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <div style={{marginTop: '1em'}}/>
    </React.Fragment>
  )
}
