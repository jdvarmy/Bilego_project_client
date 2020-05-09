import React from 'react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import { NoSsr } from '@material-ui/core';
import { style } from '../../theme';
import Menu from './Menu';
import Search from '../Search';

const Wrapper = styled(Grid)`
  height: ${style.$heightMenu}px;
`;
const LeftCol = styled(Grid)`
  height: 100%;
  background-color: ${style.$first};
`;
const RightCol = styled(Grid)`
  height: 100%;
`;

export default function BottomMenu() {
  return (
    <Wrapper alignItems="center" container justify="center" spacing={0}>
      <LeftCol item xs={8}>
        <Menu />
      </LeftCol>
      <RightCol item xs={4}>
        <NoSsr>
          <Search />
        </NoSsr>
      </RightCol>
    </Wrapper>
  );
}
