import React, {Fragment} from 'react';
import styled from 'styled-components';
import {Menu as AntMenu} from 'antd';
import {style} from '../../theme';
import {NavLink} from 'react-router-dom';

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

export default function Bottom8(props){
  const {baseNameForRouting} = props;

  return (
    <Fragment>
      <StyledMenu mode="horizontal">
        <AntMenu.Item key="Main">
          <NavLink to={`/${baseNameForRouting}`} exact activeClassName="" className="">
            <span className="">Главная</span>
          </NavLink>
        </AntMenu.Item>
        <AntMenu.Item key="Advertising">
          <NavLink to={`/${baseNameForRouting}/advertising`} exact activeClassName="" className="">
            <span className="">Реклама</span>
          </NavLink>
        </AntMenu.Item>
        <AntMenu.Item key="Contacts">
          <NavLink to={`/${baseNameForRouting}/contacts`} exact activeClassName="" className="">
            <span className="">Контакты</span>
          </NavLink>
        </AntMenu.Item>
        <AntMenu.Item key="Offer">
          <NavLink to={`/${baseNameForRouting}/offer`} exact activeClassName="" className="">
            <span className="">Оферта</span>
          </NavLink>
        </AntMenu.Item>
        <AntMenu.Item key="Events">
          <NavLink to={`/${baseNameForRouting}/events`} exact activeClassName="" className="">
            <span className="">События</span>
          </NavLink>
        </AntMenu.Item>
        <AntMenu.Item key="Items">
          <NavLink to={`/${baseNameForRouting}/items`} exact activeClassName="" className="">
            <span className="">Места</span>
          </NavLink>
        </AntMenu.Item>
      </StyledMenu>
    </Fragment>
  );
}