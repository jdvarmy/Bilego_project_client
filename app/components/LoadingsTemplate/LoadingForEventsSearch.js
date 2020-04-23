import React from 'react';
import styled, { keyframes } from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import css from '../../theme/style';

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
  border-radius: ${css.sizes.xd};
  height: 220px;
  width: 100%;
`;
const Image220 = styled(Image)`
  margin-bottom: ${css.sizes.lg};
`;
const Title = styled(Image)`
  height: ${css.sizes.xxxl};
  width: 42%;
  border-radius: ${css.sizes.lg};
`;
const TitleArt = styled(Image)`
  height: 22px;
  margin-bottom: ${css.sizes.md};
  border-radius: ${css.sizes.lg};
`;
const SubTitle = styled(Image)`
  border-radius: ${css.sizes.lg};
  width: 200px;
  height: ${css.sizes.xd};
`;

export default function LoadingForEventsWith300(){
  return(
    <React.Fragment>
      <Grid item xs={12}>
        <Title />
      </Grid>
      {[1,2,3,4,5,6].map((el, k) => (
        <Grid key={k} item xs={4}>
          <Image220 />
          <TitleArt />
          <SubTitle />
        </Grid>
      ))}
      <Grid item xs={12} />
    </React.Fragment>
  )
}
