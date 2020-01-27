import React from 'react';
import { NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import createStyles from '@material-ui/styles/createStyles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import lama from './images/screen-2.jpg';
import logo from './images/Bilego-logo_white-pink.png';

import style from '../../../theme/style';
import {
  BilegoIconClose, BilegoIconFacebook,
  BilegoIconMenuDotted,
  BilegoIconSearch, BilegoIconVk
} from '../../../theme/bilegoIcons';

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
  .bilego-mobile-menu-list{
    margin-top: 30px;
    padding: 8px 12px;
    .bilego-mobile-menu-item{
      h6{
        color: ${style.$white};
        text-transform: uppercase;
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

  handleClick = link => {
    const {setSearchString} = this.props.searchStore;

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
            <NavLink to={`/${baseNameForRouting}`} exact className={classes.title}>
              <img src={logo} alt="bilego" width="73px" height="17px" />
            </NavLink>
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
          <MenuList className="bilego-mobile-menu-list">
            {this.menu.map((el, k)=>(
            <MenuItem className="bilego-mobile-menu-item"
                      key={k}
                      onClick={()=>{this.handleClick(`/${baseNameForRouting}${el.link}`)}}>
              <NavLink to={`/${baseNameForRouting}${el.link}`} exact>
                <Typography component="h6" variant="h6">{el.name}</Typography>
              </NavLink>
            </MenuItem>
            ))}
            {this.subMenu.map((el, k)=>(
            <MenuItem className="bilego-mobile-menu-item"
                      key={k}
                      onClick={()=>{this.handleClick(`/${baseNameForRouting}${el.link}`)}}>
              <NavLink to={`/${baseNameForRouting}${el.link}`} exact>
                <Typography component="h6" variant="h6">{el.name}</Typography>
              </NavLink>
            </MenuItem>
            ))}
          </MenuList>
        </SSwipeableDrawer>
      </div>
    )
  }
}

export default withStyles(styles)(Header);
