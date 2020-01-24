import React from 'react';
import styled, { keyframes } from 'styled-components';

import Grid from '@material-ui/core/Grid';
import {LoadingForEvents} from "./index";
import Divider from "@material-ui/core/Divider";

const Wrap = styled.div`
  overflow: hidden;
  .MuiPaper-elevation1{
    box-shadow: none;
  }
  padding: 24px;
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
const Slider = styled(Image)`
  height: 360px;
  margin: 0;
  border-radius: 0;
`;
const Title = styled(Image)`
  border-radius: 24px;
  height: 38px;
  display: inline-block;
  margin-bottom: 0;
  width: 25%;
`;
const Text = styled(Image)`
  height: 300px;
`;
const Padding = styled.div`
  padding-top:48px;
`;

export default function LoadingSingleItem(){
  return(
    <React.Fragment>
      <Slider />
      <Wrap>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Title />
          </Grid>
          <LoadingForEvents />
          <Grid item xs={12}>
            <Divider />
            <Padding />
            <Title style={{width: '35%'}} />
            <Text />
          </Grid>
        </Grid>
      </Wrap>
    </React.Fragment>
  )
}