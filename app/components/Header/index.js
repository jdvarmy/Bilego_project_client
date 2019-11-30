import React, { Fragment } from 'react';
// import styled from 'styled-components';
import { style } from '../../theme';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import NoSsr from '@material-ui/core/NoSsr';

// import TopMenu from './TopMenu';
// import BottomMenu from './BottomMenu';
// import ScrollMenu from './ScrollMenu';
// import SearchDrawer from '../Search/SearchDrawer';

const useStyles = makeStyles(() => ({
  wrapper: {
    maxWidth: '1250px',
    margin: 'auto'
  },
  line: {
    borderTop: `1px solid ${style.$grey}`
  }
}));

export default function Header() {
  return (
    <Fragment>
      <div className={useStyles.wrapper}>
      {/*  <TopMenu />*/}
        <Box p={2} bgcolor="primary.main" color="primary.contrastText">
          Server and Client
        </Box>
        <NoSsr>
          <Box p={2} bgcolor="secondary.main" color="primary.contrastText">
            Client only
          </Box>
        </NoSsr>
      </div>
      <div className={useStyles.line} />
      {/* <Wrapper>*/}
      {/*   <BottomMenu />*/}
      {/*   <ScrollMenu />*/}
      {/* </Wrapper>*/}
      {/* <SearchDrawer />*/}
    </Fragment>
  );
}

