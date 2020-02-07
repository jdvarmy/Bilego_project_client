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
  const { categoriesForFooterMenu, baseNameForRouting } = props;

  return (
    <Fragment>
      <StyledMenu mode="horizontal" className="bilego-menu">
        <AntMenu.Item key="Main">
          <Link to={`/${baseNameForRouting}`}>
            <span className="">Главная</span>
          </Link>
        </AntMenu.Item>
        {categoriesForFooterMenu.map(el=>(
          <AntMenu.Item key={el.id}>
            <Link to={el.link}>
              <span className="">{el.name}</span>
            </Link>
          </AntMenu.Item>
        ))}
      </StyledMenu>
    </Fragment>
  );
}
