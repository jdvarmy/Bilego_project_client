import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import { style } from '../../theme';

const Title = styled(Typography)`
  color: ${style.$black};
  font-weight: 300!important;
  svg{
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
  :hover{
    svg{
      transform: translate(15px, 0);
    }
  }
`;

export default function BlockHeaderTextH3(props) {
  return (
    <Title component="h3" variant="h3">
      {props.children}
    </Title>
  );
}
