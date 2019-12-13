import { observable, action, computed, flow, configure } from 'mobx';
import { globalService } from './services';
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
  @observable daData;
  @observable data;
  @observable history;

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

  @action getDataCurrentPage = flow( function* getDataCurrentPage(){
    console.log(this.history.location.pathname)
    try{
      const resp = yield globalService.getPageData(props);
      console.log(resp)

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
    };
  }
}
