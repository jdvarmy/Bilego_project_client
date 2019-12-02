import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { style } from '../../theme';

import TopMenu from './TopMenu';
// import BottomMenu from './BottomMenu';
// import ScrollMenu from './ScrollMenu';
// import SearchDrawer from '../Search/SearchDrawer';

const useStyles = makeStyles(theme => ({
  wrapper: {
    maxWidth: '1250px',
    margin: 'auto'
  },
  line: {
    borderTop: `1px solid ${style.$grey}`
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.wrapper}>
        <TopMenu />
      </div>
      <div className={classes.line} />
      {/* <Wrapper>*/}
      {/*   <BottomMenu />*/}
      {/*   <ScrollMenu />*/}
      {/* </Wrapper>*/}
      {/* <SearchDrawer />*/}
    </Fragment>
  );
}

