import React from 'react';
import styled from 'styled-components';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import style from '../../theme/style';
import Menu from './Menu';
import Search from '../Search';

const SAppBar = styled(AppBar)`
  &.bilego-menu-wrapper{
    flex-grow: 1;
    width: ${style.$leftBodyPanel};
    left: 0;
  }
`;

export default function ScrollMenuFunction(props) {
  return (
    <HideOnScroll {...props}>
      <SAppBar className="bilego-menu-wrapper">
        <Toolbar>
          <Grid alignItems="center" container justify="center" spacing={0}>
            <Grid item xs={8}>
              <Menu />
            </Grid>
            <Grid item xs={4}>
              <Search />
            </Grid>
          </Grid>
        </Toolbar>
      </SAppBar>
    </HideOnScroll>
  );
}


function HideOnScroll(props) {
  // eslint-disable-next-line react/prop-types
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 145
  });

  return (
    <Slide appear={false} direction="down" in={trigger}>
      {children}
    </Slide>
  );
}
