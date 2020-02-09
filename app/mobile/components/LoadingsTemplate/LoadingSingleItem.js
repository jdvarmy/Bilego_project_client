import React from 'react';
import styled, { keyframes } from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { style } from '../../../theme';

const Wrap = styled.div`
  .MuiPaper-elevation1{
    box-shadow: none;
  }
  padding: 16px;
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

const ImageEvent = styled.div`
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
  height: 190px;
  width: 100%;
`;
const TitleEvent = styled.div`
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
  height: 18px;
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
  border-radius: 24px;
  animation: ${keyframes`
        from{background-position-x:0;}50%{background-position-x:-200%;}
        to{background-position-x:-200%;}
      `} 2s linear infinite;
  display: block;
  border-radius: 24px;
  width: 200px;
  height: 12px;
`;
const CardWrap = styled.div`
  overflow: hidden;
  margin: 0 0 20px;
`;
const TitleE = styled(Image)`
  display: inline-block;
  border-radius: 24px;
  height: 31px;
  width: 38%;
  margin-bottom: 16px;
  margin-top: 10px;
`;

export default function LoadingSingleEvent(){
  return (
    <React.Fragment>
      <Slider />
      <Wrap>
        <TitleE />
        <Grid container spacing={0}>
          {[1,2].map((el, k) => (
            <Grid key={k} item xs={12}>
              <CardWrap>
                <ImageEvent />
                <TitleEvent />
                <SubTitle />
              </CardWrap>
            </Grid>
          ))}
          <div style={{marginTop: '1em'}}/>

          <Grid item xs={12}>
            <Title />
            <Text />
          </Grid>
        </Grid>
      </Wrap>
    </React.Fragment>
  );
}
