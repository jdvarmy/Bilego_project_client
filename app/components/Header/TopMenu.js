import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { style } from '../../theme';
import Social from './Social';
import Logo from './Logo';
// import Cities from './Cities';

const Wrapper = styled(Grid)`
  height: ${style.$heightMenu}px;
`;
const LeftCol = styled(Grid)`
  height: 100%;
  background-color: ${style.$first};
  padding-left: 30px;
`;
const CenterCol = styled(Grid)`
  height: 100%;
  background-color: ${style.$first};
`;
const RightCol = styled(Grid)`
  height: 100%;
  background-color: ${style.$first};
  padding-right: 30px;
`;

export default function TopMenu() {
  return (
    <Wrapper container alignItems="center" justify="center">
      <LeftCol item span={6}>
         <Social />
      </LeftCol>
      <CenterCol item span={12}>
         <Logo />
      </CenterCol>
      <RightCol item span={6}>
         {/*<Cities />*/}
      </RightCol>
    </Wrapper>
  );
}
