import React from 'react';
import styled, { keyframes } from 'styled-components';
import Grid from '@material-ui/core/Grid';
import {Event143} from "../Event";

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
const Calendar = styled(Image)`
  border-radius: 24px;
  width: inherit;
  height: 40px;
  margin: 20px;
`;
const Line = styled.div`
  width: 1000px;
  > div{
    display: inline-block;
  }
`;
const Wrap = styled.div`
  margin-left: 16px;
`;
const EventImage = styled(Image)`
  height: 143px;
  width: 208px;
`;
const TitleWrap = styled(Image)`
  display: inline-block;
  margin: 20px 0 0 16px;
  border-radius: 24px;
  height: 22px;
  width: 40%;
`;
const Title = styled(Image)`
  display: inline-block;
  border-radius: 24px;
  height: 18px;
  width: 60%;
  margin: 0;
`;
const SubTitle = styled(Image)`
  display: inline-block;
  border-radius: 24px;
  height: 14px;
  width: 80%;
  margin: 0;
`;
const SImage = styled(Image)`
  height: 190px;
  margin: 25px 16px;
  width: inherit;
`;

export default function LoadingSingleEvent(){
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Calendar />
        </Grid>
        <Grid item xs={12}>
          {[1,2,3].map((el, key) => (
            <React.Fragment key={key}>
              <TitleWrap />
              <Line>
                {[1,2,3,4].map((e, k) => (
                  <Wrap key={k}>
                    <EventImage />
                    <Title />
                    <SubTitle />
                  </Wrap>
                ))}
              </Line>
            </React.Fragment>
          ))}
        </Grid>
        <Grid item xs={12}>
          <TitleWrap />
          <SImage />
          <SImage />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
