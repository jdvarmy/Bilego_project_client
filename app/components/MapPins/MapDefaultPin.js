import React from 'react';
import styled from 'styled-components';

import Fab from '@material-ui/core/Fab';
import { BilegoIconMapPin } from '../../theme/bilegoIcons';

const StyledFab = styled(Fab)`
  box-shadow: none!important;
  background-color: transparent!important;
`;

export default function MapDefaultPin(props){
  const { onClick } = props;

  return (
    <StyledFab onClick={onClick}>
      {BilegoIconMapPin}
    </StyledFab>
  );
};