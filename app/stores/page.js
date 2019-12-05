import {observable, action, configure, flow} from 'mobx';
import {pageService} from "../services";

configure({
  enforceActions: 'always'
});

class Page{
  defaultPageSize = 21;

  @observable isLoading = false;

  @observable name = '';

  @observable categoryEvent = '';
  @observable categoryEventId = 0;
  @observable pageType = ''; // category, front, page

  @observable pagination = {current: 1, pageSize: this.defaultPageSize, showButton: true};
  @observable itemFilters = {
    search: '',
    category: '',
  };

  // front page
  @observable eventsSoon = [];
  @observable eventsHot = [];
  @observable eventsConcerts = [];
  @observable itemsFrontPage = [];
  @observable popularOnWeek = [];

  // another page
  @observable events = [];
  @observable eventsByCategory = [];
  @observable items = [];
  @observable itemsByCategory = []; // not use
  @observable itemsCategoryList = [];

  @action
  changePageName = (name) => {
    this.name = name
  };
  @action
  changePageType = (type) => {
    this.pageType = type
  };
  @action
  changeCategoryEvent = (id, category) => {
    this.categoryEvent = category;
    this.categoryEventId = id;
  };

  @action
  getEventsSoon = flow( function* getEventsSoon(){
    this.isLoading = true;
    try{
      this.eventsSoon = [];
      this.eventsSoon = yield pageService.getEventsSoon();
    }catch(e){
      console.log(e);
    }finally {
      this.isLoading = false;
    }
  }).bind(this);
  @action
  getEventsHot = flow( function* getEventsHot(){
    this.isLoading = true;
    try{
      this.eventsHot = [];
      this.eventsHot = yield pageService.getEventsHot();
    }catch(e){
      console.log(e);
    }finally {
      this.isLoading = false;
    }
  }).bind(this);
  @action
  getEventsConcerts = flow( function* getEventsConcerts(params){
    this.isLoading = true;
    try{
      this.eventsConcerts = [];

      const args = {
        page: 1,
        size: 3
      };
      this.eventsConcerts = yield pageService.getEventsConcerts(args, params);
    }catch(e){
      console.log(e);
    }finally {
      this.isLoading = false;
    }
  }).bind(this);
  @action
  getItemsFrontPage = flow( function* getItemsFrontPage(params){
    this.isLoading = true;
    try{
      this.itemsFrontPage = [];

      const args = {
        page: 1,
        size: 4
      };
      this.itemsFrontPage = yield pageService.getItemsFrontPage(args, params);
    }catch(e){
      console.log(e);
    }finally {
      this.isLoading = false;
    }
  }).bind(this);
  @action
  getPopularOnWeek = flow( function* getPopularOnWeek(){
    this.isLoading = true;
    try{
      this.popularOnWeek = [];
      this.popularOnWeek = yield pageService.getPopularOnWeek();
    }catch(e){
      console.log(e);
    }finally {
      this.isLoading = false;
    }
  }).bind(this);



  @action
  clear = () => {
    this.eventsByCategory = [];
    this.events = [];
    this.itemsByCategory = [];
    this.items = [];
    this.pagination = {current: 1, pageSize: this.defaultPageSize, showButton: true}
  };
  @action
  setPagination = (current, pageSize = this.defaultPageSize) => {
    this.pagination.current = current ? current : this.pagination.current;
    this.pagination.pageSize = pageSize ? pageSize : this.pagination.pageSize;
  };
  @action
  setItemFilter = (filters) => {
    this.itemFilters = { ...this.itemFilters, ...filters };
    this.clear();
    this.getItemsSearch();
  };



  @action
  getEvents = flow( function* getEvents(params){
    if(this.isLoading) return;

    this.isLoading = true;
    try{
      const args = {
        page: this.pagination.current,
        size: this.pagination.pageSize
      };
      const response = yield pageService.getEvents(args, {...params});
      this.pagination.showButton = response.length === this.pagination.pageSize;
      this.events = [
        ...this.events,
        ...response
      ];
    }catch(e){
      console.log(e);
    }finally {
      this.isLoading = false;
    }
  }).bind(this);
  @action
  getEventsByCategory = flow( function* getEventsByCategory(params){
    if(this.isLoading) return;

    this.isLoading = true;
    try{
      const args = {
        page: this.pagination.current,
        size: this.pagination.pageSize
      };
      const response = yield pageService.getEventsByCategory(args, {categoryId: params.categoryId});
      console.log(response)
      this.pagination.showButton = response.length === this.pagination.pageSize;
      this.eventsByCategory = [
        ...this.eventsByCategory,
        ...response
      ];
    }catch(e){
      console.log(e);
    }finally {
      this.isLoading = false;
    }
  }).bind(this);

  @action
  getItems = flow( function* getItems(params){
    this.isLoading = true;
    try{
      const args = {
        page: this.pagination.current,
        size: this.pagination.pageSize
      };

      const response = yield pageService.getItems(args, {...this.itemFilters, ...params});
      this.pagination.showButton = response.length === this.pagination.pageSize;
      this.items = [
        ...this.items,
        ...response
      ];
    }catch(e){
      console.log(e);
    }finally {
      this.isLoading = false;
    }
  }).bind(this);

  @action
  getItemsSearch = flow( function* getItemsSearch(params){
    this.isLoading = true;
    try{
      const key = this.itemFilters.search.toString() + this.itemFilters.category.toString() + this.pagination.current.toString();

      if(this.ItemsSearchCache.exist(key)){
        this.items = this.ItemsSearchCache.get(key);
      }else {
        this.items = yield pageService.getItems({page: 1, size: this.pagination.pageSize}, {...this.itemFilters, ...params});
        this.pagination.showButton = this.items.length === this.pagination.pageSize;
        this.ItemsSearchCache.set(key, this.items)
      }
    }catch(e){
      console.log(e);
    }finally {
      this.isLoading = false;
    }
  }).bind(this);

  @action
  getItemsCategoryList = flow( function* getItemsCategoryList(){
    try{
      this.itemsCategoryList = yield pageService.getItemsCategoryList();
    }catch(e){
      console.log(e);
    }
  }).bind(this);

  cache = {};
  ItemsSearchCache = {
    remove: (resource) => {
      delete this.cache[resource];
    },
    exist: (resource) => {
      return this.cache.hasOwnProperty(resource) && this.cache[resource] !== null;
    },
    get: (resource) => {
      return this.cache[resource];
    },
    set: (resource, cachedData) => {
      this.ItemsSearchCache.remove(resource);
      this.cache[resource] = cachedData;
    },
  };
}

export default new Page();