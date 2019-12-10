import React from 'react';
import style from '../../theme/style';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Mapbox from '../Map/Mapbox';
import TimeLine from '../TimeLine';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import DatePickerLine from '../DatePickerLine';

const Wrapper = styled('div')`
  height: ${style.$heightMenu}px;
  display: flex;
  align-items: center;
`;
const StyledList = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 80px);
`;
const Scroll = styled(Scrollbars)`
    height: 100%;
`;

const drawerWidth = style.$rightBodyPanel;
const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
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
    <Drawer
      className={`${classes.drawer} bilego-drawer`}
      variant="permanent"
      anchor="right"
      classes={{paper: classes.drawerPaper,}}
    >
      <Wrapper style={{overflow: 'hidden'}}>
        <DatePickerLine flickity/>
      </Wrapper>
      <StyledList>
        <Scroll>
          <Divider />
          <Mapbox/>
          <TimeLine/>
        </Scroll>
      </StyledList>
    </Drawer>
  );
}