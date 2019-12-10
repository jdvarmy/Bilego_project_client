import React from 'react';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';

const StyledFab = styled(Fab)`
  margin-left: 20px!important;
  height: 26px!important;
  padding: 0 15px!important;
  font-size: 0.7rem!important;
  background-color: black!important;
  box-shadow: none!important;
  .MuiSvgIcon-root{
    font-size: 0.8rem!important;
  }
`;

export default function Next(props) {
  const {ariaLabel, children} = props;

  return (<StyledFab variant="extended" aria-label={ariaLabel}>{children}</StyledFab>)
};