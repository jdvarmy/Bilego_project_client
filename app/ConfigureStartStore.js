import { observable, action, computed, flow, configure } from 'mobx';
import { globalService } from './services';
import { cities } from './stores';

configure({
  enforceActions: 'always'
});

export default class ConfigureStartStore {
  @observable CITY = -1; // Москва == 0, Питер == 1
  @action setCity = val => {
    this.city = val
  };
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
        id: this.citys[this.city].category.concerts,
        cat: 'Concerts',
        page: 'page',
        name: 'Концерты',
        link: 'events/concerts',
      }, {
        id: this.citys[this.city].category.festivals,
        cat: 'Festivals',
        page: 'page',
        name: 'Фестивали',
        link: 'events/festivals',
      }, {
        id: this.citys[this.city].category.lectures,
        cat: 'Lectures',
        page: 'category',
        name: 'Лекции',
        link: 'events/lectures',
      }, {
        id: this.citys[this.city].category.exhibitions,
        cat: 'Exhibitions',
        page: 'category',
        name: 'Выставки',
        link: 'events/exhibitions',
      }, {
        id: this.citys[this.city].category.children,
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
    this.data = initialState;
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

        console.log('MEOW', this.history.location.pathname)

        const daData = await this.getDaData(props.ip);

        if(daData && daData.location && daData.location.value){
          if(daData.location.value.indexOf('Моск')+1){
            this.setCity(0);
          }else if(daData.location.value.indexOf('Ленинград')+1 || daData.location.value.indexOf('Санкт-Петербург')+1){
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

  @action getDaData = flow( function* getDaData(props){
    try{
      const resp = yield globalService.getSypex(props);
      console.log(resp.city);
      this.daData = resp;
    }catch(e){
      console.log(e);
    }
  }).bind(this);

  toJson() {
    return {
      data: this.data,
      history: this.history,
    };
  }
}
