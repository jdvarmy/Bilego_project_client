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
const Slider = styled(Image)`
  height: 375px;
  margin: 0;
  border-radius: 0;
`;
const Button = styled(Image)`
  border-radius: 24px;
  margin: 10px 0;
  height: 40px;
`;
const Meta = styled(Image)`
  border-radius: 24px;
  height: 55px;
  margin: 0;
`;
const Title = styled(Image)`
  border-radius: 24px;
  height: 38px;
  display: inline-block;
  margin: 0;
  width: 75%;
`;
const Text = styled(Image)`
  height: 300px;
`;
const Item = styled(Image)`
  display: inline-block;
  border-radius: 24px;
  width: 85%;
  height: 28px;
  margin-bottom: 0;
`;
const ItemAddr = styled(Image)`
  display: inline-block;
  border-radius: 24px;
  width: 100%;
  height: 18px;
  margin: 0;
`;
const ItemImage = styled(Image)`
  display: inline-block;
  border-radius: 100%;
  width: 65px;
  height: 65px;
  margin-bottom: 0;
`;

export default function LoadingSingleEvent(){
  return (
    <React.Fragment>
      <Slider />
      <Wrap>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button />
          </Grid>
          <Grid item xs={12}>
            <Meta />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={9}>
                <Item />
                <ItemAddr />
              </Grid>
              <Grid item xs={3}>
                <ItemImage />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Title />
            <Text />
          </Grid>
        </Grid>
      </Wrap>
    </React.Fragment>
  );
}
