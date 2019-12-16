import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import { Menu as AntMenu } from 'antd';
import { style } from '../../theme';

const StyledMenu = styled(AntMenu)`
  position: relative;
  height: ${style.$heightMenu}px;
  display: flex;
  align-items: center;
  &.ant-menu-horizontal{
    border-bottom: none;
    margin-left: 5px;
  }
`;

@withRouter
@inject('pageStore', 'globalStore')
@observer
class SMenu extends Component{
  handleClick = e => {
    const {cat, page, name} = e.item.props,
      {pageStore:{changeCategoryEvent, changePageType, changePageName, clear}, globalStore:{apiRoot}} = this.props;

    clear();
    changePageName(name);
    changePageType(page);
    changeCategoryEvent(e.key, cat);

    const {pageStore:{categoryEventId, getEventsByCategory}} = this.props;
    getEventsByCategory(apiRoot, {categoryId: categoryEventId});
  };

  render() {
    const {globalStore:{baseNameForRouting, categoriesForMenu}} = this.props;

    return (
      <StyledMenu onSelect={this.handleClick} mode="horizontal">
        {categoriesForMenu.map(el=>(
          <AntMenu.Item key={el.id} cat={el.cat} page={el.page} name={el.name}>
            <NavLink to={`/${baseNameForRouting}/${el.link}`} exact activeClassName="menu__item-select" className="menu__item">
              <Typography component="h6" variant="h6" className="menu__item-name">{el.name}</Typography>
            </NavLink>
          </AntMenu.Item>
        ))}
      </StyledMenu>
    );
  }
}

export default SMenu;
