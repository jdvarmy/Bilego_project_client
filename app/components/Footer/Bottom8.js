import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { Menu as AntMenu } from 'antd';
import { style } from '../../theme';

const StyledMenu = styled(AntMenu)`
  position: relative;
  display: flex;
  align-items: center;
  &.ant-menu-horizontal{
    border-bottom: none;
    margin-left: 5px;
  }
  &.ant-menu{
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .ant-menu-item > a{
    margin-left: 35px;
    color: ${style.$white}!important;
    :hover{
      color: ${style.$red}!important;
    }
  }
`;

export default function Bottom8(props) {
  // eslint-disable-next-line react/prop-types
  const { baseNameForRouting } = props;

  return (
    <Fragment>
      <StyledMenu mode="horizontal">
        <AntMenu.Item key="Main">
          <Link to={`/${baseNameForRouting}`}>
            <span className="">Главная</span>
          </Link>
        </AntMenu.Item>
        <AntMenu.Item key="Advertising">
          <Link to={`/${baseNameForRouting}/advertising`}>
            <span className="">Реклама</span>
          </Link>
        </AntMenu.Item>
        <AntMenu.Item key="Contacts">
          <Link to={`/${baseNameForRouting}/contacts`}>
            <span className="">Контакты</span>
          </Link>
        </AntMenu.Item>
        <AntMenu.Item key="Offer">
          <Link to={`/${baseNameForRouting}/offer`}>
            <span className="">Оферта</span>
          </Link>
        </AntMenu.Item>
        <AntMenu.Item key="Events">
          <Link to={`/${baseNameForRouting}/events`}>
            <span className="">События</span>
          </Link>
        </AntMenu.Item>
        <AntMenu.Item key="Items">
          <Link to={`/${baseNameForRouting}/items`}>
            <span className="">Места</span>
          </Link>
        </AntMenu.Item>
      </StyledMenu>
    </Fragment>
  );
}
