import React from 'react';
import {Link, NavLink} from 'react-router-dom';
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
import lamaSearch from './images/lama-priroda-fon-1.jpg';
import logo from './images/Bilego-logo_white-pink.png';

import style from '../../../theme/style';
import {
  BilegoIconClose, BilegoIconFacebook,
  BilegoIconMenuDotted,
  BilegoIconSearch, BilegoIconVk
} from '../../../theme/bilegoIcons';
import { Input, Spin } from 'antd';

import { Scrollbars } from 'react-custom-scrollbars';
import SearchResult from '../../../components/Search/SearchResult';
import Drawer from '@material-ui/core/Drawer';
import Spinner from '../../../components/Spinner';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Event from '../../../components/Search/Event';
import Divider from '@material-ui/core/Divider';
import Item from '../../../components/Search/Item';

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
const SearchSSwipeableDrawer = styled(SSwipeableDrawer)`
  .MuiDrawer-paper{
    overflow: hidden;
    background-image: url('${lamaSearch}');
    ::before{
      content: '';
      background: linear-gradient(to bottom,rgba(40,49,56,0.7) 0%,rgba(40,49,56,0.91) 100%)!important;
      z-index: -1;
    }
  }
  &.bilego-city-mobile-drawer{
    .MuiPaper-root{
      padding-bottom: 50px;
      border-radius: 0 0 16px 16px;
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.1), 
                0 0 12px rgba(255, 255, 255, 0.1), 
                inset 0 0 4px rgba(255, 255, 255, 0.1), 
                0 0 8px rgba(0, 0, 0, 0.15);
      .MuiTypography-root a{
        color: ${style.$white}!important;
      }
      ::after{
        content: '';
        position: absolute;
        bottom: 12px;
        left: calc( 100% - 70% );
        height: 4px;
        width: 40%;
        background: ${style.$grey};
        border-radius: 10px;
      }
    }
  }
`;
const Subscribe = styled.div`
  margin: 0 30px;
  > div{
    color: ${style.$white};
    margin-bottom: 8px;
  }
  .ant-input{
    position: relative;
    display: flex;
    height: 44px;
    width: 100%;
    border-radius: 80px;
    border: none;
    font-size: 14px;
    padding: 0 25px;
    letter-spacing: 0.05em;
    color: ${style.$black};
    background: rgba(255,255,255,0.5);
  }
`;
const Results = styled.div`
  position: absolute;
  padding-top: 16px;
  width: 100%;
  height: calc(100% - 153px);
  background: ${style.$white};
  bottom: 0;
  border-radius: 16px 16px 0 0;
  transform: translate(0, 93%);
  transition: transform ${style.$transitionfast} ${style.$transitionanimation};
  &.show{
    transform: translate(0, 0);
  }
`;
const Scroll = styled(Scrollbars)`
    height: 100%;
    h4{
      margin-left: 15px;
    }
`;
const CityIconButton = styled(IconButton)`
  position: absolute!important;
  right: 0;
  top: 55px;
  color: ${p=> p.textcolor}!important;
  font-size: 1em!important;
  margin-right: 0!important;
`;

@withRouter
@inject('globalStore', 'searchStore', 'pageStore', 'sliderStore')
@observer
class Header extends React.Component{
  @observable openMenu = false;
  @observable openSearch = false;
  @observable openCities = false;

  @action
  toggleMenu = () => {
    this.openMenu = !this.openMenu;
  };
  @action
  toggleSearch = () => {
    this.openSearch = !this.openSearch;
    this.props.searchStore.clear();
  };
  @action
  toggleCity = () => {
    this.openCities = !this.openCities;
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
    // {
    //   name: 'Реклама',
    //   link: '/advertising',
    // },
    {
      name: 'Контакты',
      link: '/contacts',
    }, {
      name: 'Оферта',
      link: '/offer',
    }
  ];

  time;
  componentWillUnmount(){
    clearTimeout(this.time);
  };

  onInputSearchChange = e => {
    const {target:{value}} = e,
      {searchStore:{changeSearchStatus, setRequest, getSearchResult}, globalStore:{apiRoot}} = this.props;
    switch (true) {
      case value.length === 0:
        changeSearchStatus(-1);
        setRequest(value);
        break;
      case value.length === 1:
        changeSearchStatus(0);
        setRequest(value);
        break;
      case value.length > 1:
        changeSearchStatus(1);
        setRequest(value);
        this.time = setTimeout(function(){
          getSearchResult(apiRoot);
        }, 100);
        break;
      default:
        break;
    }
  };
  handlerClick = id => {
    if(this.props.globalStore.CITY !== id)
      this.changeCity(id);

    this.toggleCity();
  };
  changeCity = async id => {
    const {globalStore:{setCity}, searchStore, pageStore, sliderStore} = this.props;
    setCity(id);

    searchStore.clear();
    pageStore.clear();
    sliderStore.clear();

    const {baseNameForRouting} = this.props.globalStore;
    this.props.history.push(`/${baseNameForRouting}`);

    const {pageStore: {getFrontPageData}, globalStore: {categoryConcertsForFrontPage, apiRoot, setMeta}} = this.props;

    getFrontPageData(apiRoot, {categoryId: categoryConcertsForFrontPage, itemOrderby: 'rand'});
    sliderStore.getMainSlides(apiRoot);
    setMeta(this.props.pageStore.seoPage);
  };

  render() {
    const { classes, globalStore:{ baseNameForRouting, mobileMenuCityColor, cities, CITY }, searchStore:{events, items, isLoading, search} } = this.props;

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
            <IconButton onClick={this.toggleSearch} className={`${classes.menuButton}`} aria-label="search">
              {BilegoIconSearch}
            </IconButton>

            <CityIconButton onClick={this.toggleCity} className={`${classes.menuButton}`} aria-label="city" textcolor={mobileMenuCityColor}>
              {cities[CITY].cityRus}
            </CityIconButton>
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
            <Divider light={true} />
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
        <SearchSSwipeableDrawer
          classes={{paper: classes.drawerPaper}}
          className={classes.drawer}
          open={this.openSearch}
          onClose={this.toggleSearch}
          onOpen={this.toggleSearch}
          anchor="right">
          <Grid container spacing={2}>
            <SGrid item xs={9}>
              {vk}
              {facebook}
            </SGrid>
            <SGrid item xs={3}>
              <SIconButton className="bilego-button" onClick={this.toggleSearch} aria-label="cancel">
                {BilegoIconClose}
              </SIconButton>
            </SGrid>
            <Grid item xs={12}>
              <Subscribe>
                <div>События, артисты, места</div>
                <Input
                  onChange={this.onInputSearchChange}
                  placeholder="Начните вводить запрос"
                  size="large"
                />
              </Subscribe>
              <Results className={search === 1 && `show`}>
                <Scroll>
                  <Spin spinning={isLoading} indicator={<Spinner leftPadding={0} position="absolute"/>}>
                    {events &&
                    <div>
                      <Typography variant="h5" component="h4">События</Typography>
                      <List>
                        {events.map(event=>(
                          <ListItem onClick={this.toggleSearch} key={event.id}>
                            <Event {...event} baseNameForRouting={baseNameForRouting}/>
                          </ListItem>
                        ))
                        }
                      </List>
                    </div>
                    }
                    {events && items && <Divider />}
                    {items &&
                    <div>
                      <Typography variant="h5" component="h4">Площадки</Typography>
                      <List>
                        {items.map(item=>(
                          <ListItem onClick={this.toggleSearch} key={item.id}>
                            <Item {...item} baseNameForRouting={baseNameForRouting}/>
                          </ListItem>
                        ))
                        }
                      </List>
                    </div>
                    }
                  </Spin>
                </Scroll>
              </Results>
            </Grid>
          </Grid>
        </SearchSSwipeableDrawer>
        <SearchSSwipeableDrawer
          anchor="top"
          classes={{paper: classes.drawerPaper}}
          className={`${classes.drawer} bilego-city-mobile-drawer`}
          open={this.openCities}
          onClose={this.toggleCity}
          onOpen={this.toggleCity}>
          <Grid container spacing={2}>
            <SGrid item xs={9}>
              {vk}
              {facebook}
            </SGrid>
            <SGrid item xs={3}>
              <SIconButton className="bilego-button" onClick={this.toggleCity} aria-label="cancel">
                {BilegoIconClose}
              </SIconButton>
            </SGrid>
          </Grid>
          <MenuList className="bilego-mobile-menu-list">
            {cities.map(el=>(
              <MenuItem key={el.id} >
                <Typography variant="h5" component="h5" key={el.baseName}>
                  <Link to={`/${el.baseName}`} onClick={() => this.handlerClick(el.id)}>{el.cityRus}</Link>
                </Typography>
              </MenuItem>
            ))}
            <Divider light={true} />
          </MenuList>
        </SearchSSwipeableDrawer>
      </div>
    )
  }
}

export default withStyles(styles)(Header);
