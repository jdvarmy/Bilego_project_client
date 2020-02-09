import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import { style } from '../../theme';

const Title = styled(Typography)`
  color: ${style.$black};
`;

export default function BlockHeaderText(props) {
  return (
    <Title component="h1" variant="h2">
      {props.children}
    </Title>
  );
}
