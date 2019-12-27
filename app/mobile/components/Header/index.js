import React from 'react';
import { NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';
import createStyles from '@material-ui/styles/createStyles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Menu as AntMenu } from 'antd';

import style from '../../../theme/style';
import { BilegoIconMenuDotted, BilegoIconSearch } from '../../../theme/bilegoIcons';

const styles = createStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: style.$black
  },
  title: {
    flexGrow: 1,
  },
  bar: {
    boxShadow: '0px 2px 0px -1px rgba(0,0,0,0.09)'
  },
  drawerPaper: {
    width: '100%'
  }
}));

@inject('globalStore')
@observer
class Header extends React.Component{
  @observable openMenu = false;

  @action
  toggleMenu = () => {
    this.openMenu = !this.openMenu;
  };

  handleClick = () => {
    console.log('menu')
  };

  menu = [
    {
      cat: 'Concerts',
      page: 'page',
      name: 'Концерты',
      link: 'events/concerts',
    }, {
      cat: 'Festivals',
      page: 'page',
      name: 'Фестивали',
      link: 'events/festivals',
    }
  ];

  render() {
    const { classes, globalStore:{ baseNameForRouting } } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="relative" className={classes.bar}>
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
        <SwipeableDrawer
          classes={{paper: classes.drawerPaper}}
          className={classes.drawer}
          open={this.openMenu}
          onClose={this.toggleMenu}
          onOpen={this.toggleMenu}>
          <AntMenu onSelect={this.handleClick} >
            {this.menu.map(el=>(
              <AntMenu.Item key={el.cat} cat={el.cat} page={el.page} name={el.name}>
                <NavLink to={`/${baseNameForRouting}/${el.link}`} exact activeClassName="menu__item-select" className="menu__item">
                  <Typography component="h6" variant="h6" className="menu__item-name">{el.name}</Typography>
                </NavLink>
              </AntMenu.Item>
            ))}
            <AntMenu.Divider />
          </AntMenu>
        </SwipeableDrawer>
      </div>
    )
  }
}

export default withStyles(styles)(Header);
