import React from 'react';
import styled, { keyframes } from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

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
  // margin: 25px auto;
  border-radius: 12px;
  height: 65px;
  width: 100%;
  text-align: center;
`;
const Title = styled(Image)`
  border-radius: 24px;
  height: 38px;
  margin-bottom: 16px;
  width: 80%;
`;
const Content = styled(Image)`
  width: 96%;
  height: 209px;
`;
const SubTitle = styled(Image)`
  height: 35px;
  width: 40%;
  border-radius: 24px;
`;
const IImage = styled(Image)`
  height: 228px;
  width: 100%;
`;
const ITitle = styled(Image)`
  width: 56%;
  border-radius: 24px;
  height: 22px;
`;
const ISubTitle = styled(Image)`
  width: 86%;
  border-radius: 24px;
  height: 12px;
`;
const Map = styled(Image)`
  width: 98%;
  height: 288px;
  margin: 0 auto;
`;

const Padding = styled.div`
  padding-top:48px;
`;

export default function LoadingContent(){
  return(
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <Divider />
        <Padding />
      </Grid>
      <Grid item xs={8}>
        <Divider />
        <Padding />
        <Title />
        <div style={{marginTop: '1em'}}/>
        <Content />
        <Padding />
        <div>
          <SubTitle />
          <div style={{marginTop: '1em'}}/>
          <Grid container spacing={4} justify="center" alignItems="center">
            <Grid item xs={6}>
              <IImage />
            </Grid>
            <Grid item xs={6}>
              <ITitle />
              <div style={{marginTop: '1em'}}/>
              <ISubTitle />
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div style={{marginTop: '3em'}}/>
        <Map />
        <Padding />
      </Grid>
    </Grid>
  )
}
