import React from 'react';
import { NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { withRouter } from 'react-router-dom';

import createStyles from '@material-ui/styles/createStyles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Menu as AntMenu } from 'antd';

import lama from './images/screen-2.jpg';

import style from '../../../theme/style';
import {
  BilegoIconClose, BilegoIconFacebook,
  BilegoIconMenuDotted,
  BilegoIconSearch, BilegoIconVk
} from '../../../theme/bilegoIcons';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

const styles = createStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: style.$white
  },
  title: {
    flexGrow: 1,
    color: style.$white
  },
  bar: {
    backgroundColor: 'transparent!important',
    boxShadow: '0px 2px 0px -1px rgba(255,255,255,0.09)'
  },
  drawerPaper: {
    width: '100%'
  }
}));

const SIconButton = styled(IconButton)`
  & svg{
    font-size: 0.9rem!important;
    color: ${style.$white};
  }
`;
const SGrid = styled(Grid)`
  padding: 30px 30px 10px 30px!important;
`;
const StyledIconButton = styled(IconButton)`
  margin: 0 5px!important;
  svg{
    cursor: pointer;
    vertical-align: middle;
    font-size: 1rem!important;
    color: ${style.$white};
  }
`;
const vk = (
  // eslint-disable-next-line jsx-a11y/href-no-hash
  <a href="#">
    <StyledIconButton aria-label="vk" className="bilego-button">
      {BilegoIconVk}
    </StyledIconButton>
  </a>
);
const facebook = (
  // eslint-disable-next-line jsx-a11y/href-no-hash
  <a href="#">
    <StyledIconButton aria-label="facebook" className="bilego-button">
      {BilegoIconFacebook}
    </StyledIconButton>
  </a>
);
const SSwipeableDrawer = styled(SwipeableDrawer)`
  .MuiDrawer-paper{
    background-image: url('${lama}');
    background-size: cover;
    background-position: 50% 25%;
    background-repeat: no-repeat;
    ::before{
      content: '';
      background: linear-gradient(to bottom, rgba(40, 49, 56, 1) 0%, ${style.$redtr} 100%)!important;
      width: 100%;
      height: 100%;
      position: absolute;
    }
  }
  .ant-menu{
    background: transparent;
    .ant-menu-item{
      .menu__item-name{
        color: ${style.$white};
      }
    }
  }
  
`;

@withRouter
@inject('globalStore', 'searchStore')
@observer
class Header extends React.Component{
  @observable openMenu = false;

  @action
  toggleMenu = () => {
    this.openMenu = !this.openMenu;
  };

  handleClick = async e => {
    const {link} = e.item.props,
      {setSearchString} = this.props.searchStore;

    this.props.history.push(link);
    setSearchString(link);
    this.toggleMenu();
  };

  menu = [
    {
      name: 'Главная',
      link: '',
    }, {
      name: 'Концерты',
      link: '/search?cat=concerts',
    }, {
      name: 'Фестивали',
      link: '/search?cat=festivals',
    }
  ];
  subMenu = [
    {
      name: 'Реклама',
      link: '/advertising',
    }, {
      name: 'Контакты',
      link: '/contacts',
    }, {
      name: 'Оферта',
      link: '/offer',
    }
  ];

  render() {
    const { classes, globalStore:{ baseNameForRouting } } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.bar}>
          <Toolbar>
            <IconButton onClick={this.toggleMenu} className={`${classes.menuButton}`} aria-label="menu">
              {BilegoIconMenuDotted}
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Bilego
            </Typography>
            <IconButton className={`${classes.menuButton}`} aria-label="search">
              {BilegoIconSearch}
            </IconButton>
          </Toolbar>
        </AppBar>
        <SSwipeableDrawer
          classes={{paper: classes.drawerPaper}}
          className={classes.drawer}
          open={this.openMenu}
          onClose={this.toggleMenu}
          onOpen={this.toggleMenu}>
          <Grid container spacing={2}>
            <SGrid item xs={9}>
              {vk}
              {facebook}
            </SGrid>
            <SGrid item xs={3}>
              <SIconButton className="bilego-button" onClick={this.toggleMenu} aria-label="cancel">
                {BilegoIconClose}
              </SIconButton>
            </SGrid>
          </Grid>
          <AntMenu onSelect={this.handleClick} >
            {this.menu.map((el, k)=>(
              <AntMenu.Item key={k} name={el.name} link={`/${baseNameForRouting}${el.link}`}>
                <NavLink to={`/${baseNameForRouting}${el.link}`} exact className="menu__item">
                  <Typography component="h6" variant="subtitle2" className="menu__item-name">{el.name}</Typography>
                </NavLink>
              </AntMenu.Item>
            ))}
            <AntMenu.Divider />
            {this.subMenu.map((el, k)=>(
              <AntMenu.Item key={k} name={el.name} link={`/${baseNameForRouting}${el.link}`}>
                <NavLink to={`/${baseNameForRouting}${el.link}`} exact className="menu__item">
                  <Typography component="h6" variant="subtitle2" className="menu__item-name">{el.name}</Typography>
                </NavLink>
              </AntMenu.Item>
            ))}
          </AntMenu>
        </SSwipeableDrawer>
      </div>
    )
  }
}

export default withStyles(styles)(Header);
