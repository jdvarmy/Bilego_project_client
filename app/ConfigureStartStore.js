import { observable, action, computed, flow, configure } from 'mobx';
import { matchPath } from 'react-router-dom';
import { globalService, pageService, eventService, itemService } from './services';
import { cities } from './stores';

configure({
  enforceActions: 'always'
});

export default class ConfigureStartStore {
  @observable CITY = -1; // Москва == 0, Питер == 1
  @action setCity = val => {
    this.CITY = val
  };
  cities;
  pageName;
  @observable daData;
  @observable data;
  @observable history;

  @observable frontPageFirstData = null;
  @observable eventsFirstData = null;
  @observable eventCategoryFirstData = null;
  @observable itemsFirstData = null;
  @observable singleEventFirstData = null;
  @observable singleItemFirstData = null;

  // def variables
  @computed get baseNameForRouting(){
    if(this.CITY !== -1) return this.cities[this.CITY].baseName;
    return false;
  };
  @computed get cityLabel(){
    if(this.CITY !== -1) return this.cities[this.CITY].cityLabel;
    return false;
  };
  @computed get categoryConcertsForFrontPage(){
    if(this.CITY !== -1) return this.cities[this.CITY].categoryConcerts;
    return false;
  };
  @computed get apiRoot(){
    if(this.CITY !== -1) return this.cities[this.CITY].apiRoot;
    return false;
  };
  @computed get categoriesForMenu(){
    if(this.CITY !== -1) return [
      {
        id: this.cities[this.CITY].category.concerts,
        cat: 'Concerts',
        page: 'page',
        name: 'Концерты',
        link: 'events/concerts',
      }, {
        id: this.cities[this.CITY].category.festivals,
        cat: 'Festivals',
        page: 'page',
        name: 'Фестивали',
        link: 'events/festivals',
      }, {
        id: this.cities[this.CITY].category.lectures,
        cat: 'Lectures',
        page: 'category',
        name: 'Лекции',
        link: 'events/lectures',
      }, {
        id: this.cities[this.CITY].category.exhibitions,
        cat: 'Exhibitions',
        page: 'category',
        name: 'Выставки',
        link: 'events/exhibitions',
      }, {
        id: this.cities[this.CITY].category.children,
        cat: 'Children',
        page: 'category',
        name: 'Детям',
        link: 'events/forkids',
      }
    ];

    return false;
  }

  constructor(initialState, history) {
    this.setData(initialState);
    this.setHistory(history);

    this.cities = cities;
  }
  @action setData = (initialState) => {
    this.CITY = initialState.CITY;
    this.cities = initialState.cities;
    this.daData = initialState.daData;
    this.data = initialState.data;

    this.pageName = initialState.pageName;

    this.frontPageFirstData = initialState.frontPageFirstData;
    this.eventsFirstData = initialState.eventsFirstData;
    this.eventCategoryFirstData = initialState.eventCategoryFirstData;
    this.itemsFirstData = initialState.itemsFirstData;
    this.singleEventFirstData = initialState.singleEventFirstData;
    this.singleItemFirstData = initialState.singleItemFirstData;
  };
  @action setHistory = (history) => {
    this.history = history;
  };

  @action getData = async (props) => {
    try {
      if (this.history.location.pathname.indexOf('mos') + 1) {
        this.setCity(0);
      } else if (this.history.location.pathname.indexOf('spb') + 1) {
        this.setCity(1);
      } else {
        const daData = await this.getSypex(props.ip);
        const city = daData && daData.city ? daData.city.name_ru : false;
        const region = daData && daData.region ? daData.region.name_ru : false;

        if(daData && city && region){
          if( (city && city.indexOf('Москв')+1) || (region && region.indexOf('Московск')+1) ){
            this.setCity(0);
          }else if( (city && city.indexOf('Петербург')+1) || (region && region.indexOf('Ленинград')+1) ){
            this.setCity(1);
          }else{
            this.setCity(0);
          }
        }else{
          this.setCity(0);
        }
      }
    }catch (e) {
      console.log(e)
    }
  };

  @action getSypex = flow( function* getSypex(props){
    try{
      const resp = yield globalService.getSypex(props);
      this.daData = resp;

      return resp;
    }catch(e){
      console.log(e);
    }
  }).bind(this);

  // todo: create this function
  @action getPageData = flow( function* getPageData(routes){
    // console.log(routes)
    try{
      const match = matchRoutesPath(this.history.location.pathname, routes);
      let resp;

      switch (match.component.key) {
        case 'FrontPage':
        case 'FrontPageCity':
          resp = yield pageService.getFrontPageData(this.apiRoot, {categoryId: this.categoryConcertsForFrontPage, itemOrderby: 'rand'});
          this.frontPageFirstData = resp;
          break;

        case 'Events':
          resp = yield pageService.getEvents(this.apiRoot, {page: 1, size: 21});
          this.eventsFirstData = resp;
          break;
        case 'Concerts':
        case 'Festivals':
        case 'EventCategory':
          const category = matchCategories(this.categoriesForMenu, match)[0];
          resp = yield pageService.getEventsByCategory(this.apiRoot, {page: 1, size: 21}, {categoryId: category.id});
          this.eventCategoryFirstData = resp;
          this.pageName = category.name;
          break;
        case 'Items':
          resp = yield pageService.getItems(this.apiRoot, {page: 1, size: 21});
          this.itemsFirstData = resp;
          break;
        case 'SingleEvent':
          resp = yield eventService.getEventDataBySlug(this.apiRoot, {slug: match.match.params.eventSlug});
          this.singleEventFirstData = resp;
          break;
        case 'SingleItem':
          resp = yield itemService.getItemDataBySlug(this.apiRoot, {slug: match.match.params.itemSlug});
          this.singleItemFirstData = resp;
          break;

        case 'Offer':
          console.log('Offer')
          break;
        case 'Advertising':
          console.log('Advertising')
          break;
        case 'Contacts':
          console.log('Contacts')
          break;

        default:
          console.log('default')
      }

      return resp;
    }catch(e){
      console.log(e);
    }
  }).bind(this);

  toJson() {
    return {
      CITY: this.CITY,
      cities: this.cities,
      daData: this.daData,
      data: this.data,
      history: this.history,

      pageName: this.pageName,

      frontPageFirstData: this.frontPageFirstData,
      eventsFirstData: this.eventsFirstData,
      eventCategoryFirstData: this.eventCategoryFirstData,
      itemsFirstData: this.itemsFirstData,
      singleEventFirstData: this.singleEventFirstData,
      singleItemFirstData: this.singleItemFirstData
    };
  }
}

function matchRoutesPath(localPath, routes){
  return routes.map(el => {
    const rout = el.path;

    const match = matchPath(
      localPath,
      { path: rout, exact: true }
    );

    if(match !== null) return {component: el, match}
  }).filter(el => {
    return el !== undefined
  })[0];
}
function matchCategories(categories, cat){
  let c = categories.filter(category => {
    if(category.cat === cat.component.key || category.cat.toLowerCase() === cat.match.params.catName)
      return category;
  });
  return c;
}
