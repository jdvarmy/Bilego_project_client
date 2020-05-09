import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';
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
  }
`;

@inject('pageStore', 'globalStore')
@observer
class Menu extends Component{
  handleClick = async e => {
    const {slug, page, name} = e.item.props,
      {pageStore:{changeCategoryEvent, changePageType, changePageName, clear, getEventsByCategory}, globalStore:{baseNameForRouting, setMeta}} = this.props;

    clear();
    changePageName(name);
    changePageType(page);
    changeCategoryEvent(e.key, slug);

    await getEventsByCategory({city: baseNameForRouting, category: this.props.pageStore.categoryEventSlug});
    setMeta(this.props.pageStore.seoPage);
  };

  render() {
    const {globalStore:{baseNameForRouting, categoriesForMenu}} = this.props;

    return (
      <StyledMenu onSelect={this.handleClick} mode="horizontal" className="bilego-menu">
        {categoriesForMenu.map(el=>(
          <AntMenu.Item key={el.id} slug={el.slug} page={el.page} name={el.name}>
            <NavLink to={`/${baseNameForRouting}/${el.link}`} exact activeClassName="menu__item-select" className="menu__item">
              <Typography component="h6" variant="h6" className="menu__item-name">{el.name}</Typography>
            </NavLink>
          </AntMenu.Item>
        ))}
      </StyledMenu>
    );
  }
}

export default Menu;
