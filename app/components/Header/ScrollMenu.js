import React from 'react';
import styled from 'styled-components';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { Col, Row } from 'antd';
import style from '../../theme/style'
import Menu from './Menu';
import Search from '../Search';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: style.$leftBodyPanel,
    left: 0
  },
  title: {
    textAlign: 'center',
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    color: style.$second,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 250,
      },
    },
  },
}));

const Wrapper = styled(Row)`
  height: ${style.$heightMenu}px;
  width: 100%;
`;
const StyledCol = styled(Col)`
  height: 100%;
`;

export default function ScrollMenuFunction(props){
  const classes = useStyles();

  return(
    <HideOnScroll {...props}>
      <AppBar className={classes.root}>
        <Toolbar>
          <Wrapper align='middle' type='flex' justify='center'>
            <StyledCol span={16}>
              <Menu/>
            </StyledCol>
            <StyledCol span={8}>
              <Search/>
            </StyledCol>
          </Wrapper>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}


function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 145,
  });

  return (
    <Slide appear={false} direction="down" in={trigger}>
      {children}
    </Slide>
  );
}