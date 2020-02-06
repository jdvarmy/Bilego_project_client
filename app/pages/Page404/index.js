import React from 'react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {BilegoIconHandshake} from "../../theme/bilegoIcons";
import {inject} from "mobx-react";
import {Link, NavLink} from "react-router-dom";

// https://revolution.themepunch.com/404-error-page-template/
// https://texterra.ru/blog/kak-sdelat-iz-stranitsy-404-chto-to-poleznoe-i-interesnoe-primery.html
const Wrapper = styled.div``;

// todo: сделать нормальную страницу

@inject('globalStore')
class Page404 extends React.Component{
  render(){
    const {globalStore:{baseNameForRouting, categoriesForMenu}} = this.props;

    return(
      <Wrapper>
        <Grid container spacing={4}>
          <Grid item xs={8}></Grid>
          <Grid item xs={4}>
            <List component="nav" aria-label="main">
              {categoriesForMenu.map(el=>(
                <ListItem key={el.id} button>
                  <ListItemIcon>{BilegoIconHandshake}</ListItemIcon>
                  <Link to={`/${baseNameForRouting}/${el.link}`}>
                    <ListItemText primary={el.name} />
                  </Link>
                </ListItem>
              ))}
            </List>

            <Divider />

            <List component="nav" aria-label="secondary">
              <ListItem button>
                <ListItemIcon>
                  {BilegoIconHandshake}
                </ListItemIcon>
                <ListItemText primary="Trash" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  {BilegoIconHandshake}
                </ListItemIcon>
                <ListItemText primary="Trash" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Wrapper>
    );
  }
}

export default Page404;
