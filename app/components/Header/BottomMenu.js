import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { style } from '../../theme';
import SMenu from './SMenu';
import Search from '../Search';

const Wrapper = styled(Grid)`
  height: ${style.$heightMenu}px;
`;
const LeftCol = styled(Grid)`
  height: 100%;
  background-color: ${style.$first};
  padding-left: 30px;
`;
const RightCol = styled(Grid)`
  height: 100%;
  padding-right: 30px;
`;

export default function BottomMenu() {
  return(
    <Wrapper container alignItems="center" justify="center" spacing={0}>
      <LeftCol item xs={8}>
        <SMenu/>
      </LeftCol>
      <RightCol item xs={4}>
        <Search/>
      </RightCol>
    </Wrapper>
  );
}