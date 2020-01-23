import React from 'react';
import Mapbox from '../Map/Mapbox';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { NoSsr } from '@material-ui/core';
import style from '../../theme/style';
import TimeLine from '../TimeLine';
import DatePickerLine from '../DatePickerLine';

const StyledDrawer = styled(Drawer)`
  & .MuiPaper-root{
    overflow: hidden;
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

const useStyles = makeStyles(theme => ({
  drawer: {
    width: style.$rightBodyPanel,
    flexShrink: 0,
  },
  drawerPaper: {
    width: style.$rightBodyPanel,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function RightPanel() {
  const classes = useStyles();

  return(
    <StyledDrawer
      className={`${classes.drawer} bilego-drawer`}
      variant="permanent"
      anchor="right"
      classes={{paper: classes.drawerPaper}}
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
