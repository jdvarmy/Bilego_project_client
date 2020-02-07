import React from 'react';
import { inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import { style } from '../../theme';

import Game from './Game';

// https://revolution.themepunch.com/404-error-page-template/
// https://texterra.ru/blog/kak-sdelat-iz-stranitsy-404-chto-to-poleznoe-i-interesnoe-primery.html
const Wrapper = styled.div`
  padding: 20px;
  a{
    color: ${style.$black};
  }
  .MuiListItemIcon-root{
    display: flex;
    height: 100%;
  }
`;
const Padding = styled.div`
  padding: 38px;
`;
// todo: не работает клавиатура после этой страницы

@inject('globalStore')
class Page404 extends React.Component{
  render(){
    const {globalStore:{baseNameForRouting, categoriesForMenu, categoriesForFooterMenu}} = this.props;

    return(
      <Wrapper>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <Typography component="h1" variant="h2">Четыре Ноль Четыре</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Padding />
                <Game />
                <Padding />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <List component="nav" aria-label="main">
              {categoriesForMenu.map(el=>(
                <ListItem key={el.id} button>
                  <ListItemIcon>{el.icon}</ListItemIcon>
                  <Link to={`/${baseNameForRouting}/${el.link}`}>
                    <ListItemText primary={el.name} />
                  </Link>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List component="nav" aria-label="secondary">
              {categoriesForFooterMenu.map(el=>(
                <ListItem key={el.id} button>
                  <ListItemIcon>{el.icon}</ListItemIcon>
                  <Link to={`/${baseNameForRouting}/${el.link}`}>
                    <ListItemText primary={el.name} />
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Wrapper>
    );
  }
}

export default Page404;
