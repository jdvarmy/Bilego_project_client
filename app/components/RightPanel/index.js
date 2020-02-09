import React from 'react';
import Mapbox from '../Map/Mapbox';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { NoSsr } from '@material-ui/core';
import style from '../../theme/style';
import TimeLine from '../TimeLine';
import DatePickerLine from '../DatePickerLine';

const StyledDrawer = styled(Drawer)`
  width: ${style.$rightBodyPanel};
  flex-shrink: 0;
  & .MuiPaper-root{
    overflow: hidden;
    width: ${style.$rightBodyPanel};
  }
`;
const Wrapper = styled('div')`
  height: ${style.$heightMenu}px;
  display: flex;
  align-items: center;
`;
const StyledList = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 458px);
`;
const Scroll = styled(Scrollbars)`
    height: 100%;
`;

export default function RightPanel() {
  return(
    <StyledDrawer
      className={`bilego-drawer`}
      variant="permanent"
      anchor="right"
    >
      <Wrapper style={{overflow: 'hidden'}}>
        <DatePickerLine flickity/>
      </Wrapper>
      <StyledList>
        <Divider />
        <Mapbox/>
        <NoSsr>
          <Scroll>
            <TimeLine className="bilego-hidden"/>
          </Scroll>
        </NoSsr>
      </StyledList>
    </StyledDrawer>
  );
}
