import React from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';

// import Social from './Social';
// import Logo from './Logo';
// import Cities from './Cities';
import { style } from '../../theme';

const Wrapper = styled(Row)`
  height: ${style.$heightMenu}px;
`;
const StyledCol = styled(Col)`
  height: 100%;
`;
const LeftCol = styled(StyledCol)`
  background-color: ${style.$first};
  padding-left: 30px;
`;
const CenterCol = styled(StyledCol)`
  background-color: ${style.$first};
`;
const RightCol = styled(StyledCol)`
  background-color: ${style.$first};
  padding-right: 30px;
`;

export default function TopMenu() {
  return (
    <Wrapper align="middle" justify="center" type="flex">
      <LeftCol span={6}>
        {/* <Social />*/}
      </LeftCol>
      <CenterCol span={12}>
        {/* <Logo />*/}
      </CenterCol>
      <RightCol span={6}>
        {/* <Cities />*/}
      </RightCol>
    </Wrapper>
  );
}
