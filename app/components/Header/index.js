import React from 'react';
import styled from 'styled-components';
import { style } from '../../theme';

import TopMenu from './TopMenu';
import BottomMenu from './BottomMenu';
import ScrollMenu from './ScrollMenu';
import SearchDrawer from '../Search/SearchDrawer';

const Wrapper = styled.div`
  max-width: 1250px;
  margin: auto;
`;
const Line = styled.div`
  border-top: 1px solid ${style.$grey};
`;

export default function Header() {
  return (
    <React.Fragment>
      <Wrapper>
        <TopMenu />
      </Wrapper>
      <Line />
      <Wrapper>
        <BottomMenu />
        <ScrollMenu />
      </Wrapper>
       <SearchDrawer />
    </React.Fragment>
  );
}

