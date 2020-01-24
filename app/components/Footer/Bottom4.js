import React from 'react';
import styled from 'styled-components';
import { style } from '../../theme';

const Wrapper = styled.div`
  color: ${style.$white}
`;

export default function Bottom4() {
  const date = new Date().getFullYear();
  return (
    <Wrapper>
      Copyright &#169; {`2019-${date} Bilego. Все права защищены.`}
    </Wrapper>
  );
}
