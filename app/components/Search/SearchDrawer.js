import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import SearchResult from './SearchResult';
import style from '../../theme/style';

const StyledDrawer = styled(SwipeableDrawer)`
  width: 0;
  .MuiDrawer-paper{
    width: ${style.$rightBodyPanel};
  }
`;

@inject('searchStore')
@observer
class SearchDrawer extends Component{
  handleDrawerToggle = () => {};

  render() {
    const {searchStore:{search}} = this.props;

    return (
      <div>
        <StyledDrawer
          variant="temporary"
          anchor="right"
          open={search === 1}
          onClose={this.handleDrawerToggle}
          onOpen={this.handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
            closeAfterTransition: true,
            disableAutoFocus: true,
            // disablePortal: true,
            disableEnforceFocus: true,
            // disableRestoreFocus: true,
            disableScrollLock: true,
            hideBackdrop: true,
          }}
        >
          <SearchResult/>
        </StyledDrawer>
      </div>
    );
  }
}

export default SearchDrawer;