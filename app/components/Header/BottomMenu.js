import React from 'react';
import styled from 'styled-components';
import {Col, Row} from 'antd';
import {style} from '../../theme';
import SMenu from './SMenu';
import Search from '../Search';

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
const RightCol = styled(StyledCol)`
  padding-right: 30px;
`;

export default function BottomMenu() {
  return(
    <Wrapper align='middle' type='flex' justify='center'>
      <LeftCol span={16}>
        <SMenu/>
      </LeftCol>
      <RightCol span={8}>
        <Search/>
      </RightCol>
    </Wrapper>
  );
}