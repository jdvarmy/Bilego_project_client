import { observable, action, configure, flow } from 'mobx';
import { pageService } from '../services';

configure({
  enforceActions: 'always'
});

class Page{
  defaultPageSize = 21;

  @observable isLoading = false;

  @observable name = '';

  @observable categoryEventSlug = '';
  @observable categoryEventId = 0;
  @observable pageType = ''; // category, front, page

  @observable pagination = {current: 1, pageSize: this.defaultPageSize, showButton: true};
  @observable itemFilters = {
    search: '',
    category: '',
  };

  // front page
  @observable eventsSoon = [];
  @observable eventsPopular = [];
  @observable eventsExpect = [];
  @observable eventsConcerts = [];
  @observable itemsFrontPage = [];

  @observable popularOnWeek = [];
  @observable previouslyWatched = [];

  // another page
  @observable events = [];
  @observable eventsByCategory = [];
  @observable items = [];
  @observable itemsByCategory = []; // not use
  @observable itemsCategoryList = [];

  @observable eventCategoriesSelections = [];

  @observable seoPage = [];

  @action
  changePageName = (name) => {
    this.name = name
  };
  @action
  changePageType = (type) => {
    this.pageType = type
  };
  @action
  changeCategoryEvent = (id, categorySlug) => {
    this.categoryEventSlug = categorySlug;
    this.categoryEventId = id;
  };

  @action
  getFrontPageData = flow( function* getFrontPageData(params){
    this.isLoading = true;
    try{
      const response = yield pageService.getFrontPageData(params);
      this.eventsSoon = response.posts.soon;
      this.eventsPopular = response.posts.popular;
      this.eventsExpect = response.posts.expect;
      this.eventsConcerts = response.posts.concerts;
      this.itemsFrontPage = response.posts.items;
      this.eventCategoriesSelections = response.posts.selections;
      this.seoPage = response.seo;
    }catch(e){
      console.log(e);
    }finally {
      this.isLoading = false;
    }
  }).bind(this);

  @action
  setStartDataFrontPage = (data) => {
    this.eventsSoon = data.posts.soon;
    this.eventsPopular = data.posts.popular;
    this.eventsExpect = data.posts.expect;
    this.eventsConcerts = data.posts.concerts;
    this.itemsFrontPage = data.items;
    this.eventCategoriesSelections = data.posts.selections;
  };
  @action
  setStartDataEventsPage = (data) => {
    this.events = data.posts;
  };
  @action
  setStartDataCategoryPage = (data) => {
    this.eventsByCategory = data.posts;
  };
  @action
  setStartDataItemsPage = (data) => {
    this.items = data.posts;
  };


  @action
  getPopularOnWeek = flow( function* getPopularOnWeek(params){
    this.isLoading = true;
    try{
      this.popularOnWeek = [];
      const response = yield pageService.getPopularOnWeek({category: 'ait-locations', name: 'popular', ...params});
      this.popularOnWeek = response;
    }catch(e){
      console.log(e);
    }finally {
      this.isLoading = false;
    }
  }).bind(this);
  @action
  getPreviouslyWatched = flow( function* getPreviouslyWatched(params){
    this.isLoading = true;
    try{
      this.previouslyWatched = [];
      const response = yield pageService.getPreviouslyWatched(params);
      this.previouslyWatched = response.posts;
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

    this.eventCategoriesSelections = [];

    this.eventsSoon = [];
    this.eventsPopular = [];
    this.eventsExpect = [];
    this.eventsConcerts = [];

    this.itemFilters = [];

    this.pagination = {current: 1, pageSize: this.defaultPageSize, showButton: true}
  };
  @action
  setPagination = (current, pageSize = this.defaultPageSize) => {
    this.pagination.current = current ? current : this.pagination.current;
    this.pagination.pageSize = pageSize ? pageSize : this.pagination.pageSize;
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
      const response = yield pageService.getEvents({...args, ...params});
      const posts = response.posts;
      this.seoPage = response.seo;
      this.pagination.showButton = posts && posts.length === this.pagination.pageSize;

      if(this.pagination.current === 1)
        this.events = posts;
      else
        this.events = [
          ...this.events,
          ...posts
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
      const response = yield pageService.getEventsByCategory({...args, ...params});
      const posts = response.posts;
      this.seoPage = response.seo;
      this.pagination.showButton = posts && posts.length === this.pagination.pageSize;

      if(this.pagination.current === 1)
        this.eventsByCategory = posts;
      else
        this.eventsByCategory = [
          ...this.eventsByCategory,
          ...posts
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
      const response = yield pageService.getItems({...args, ...this.itemFilters, ...params});
      const posts = response.posts;
      this.seoPage = response.seo;
      this.pagination.showButton = posts && posts.length === this.pagination.pageSize;

      if(this.pagination.current === 1)
        this.items = posts;
      else
        this.items = [
          ...this.items,
          ...posts
        ];
    }catch(e){
      console.log(e);
    }finally {
      this.isLoading = false;
    }
  }).bind(this);

  @action
  setItemFilter = (params) => {
    this.itemFilters = { ...this.itemFilters, ...params };
    this.setPagination(1);
    this.getItemsSearch();
  };
  @action
  getItemsSearch = flow( function* getItemsSearch(){
    this.isLoading = true;
    try{
      const s = this.itemFilters.search ? this.itemFilters.search.toString() : '';
      const c = this.itemFilters.category ? this.itemFilters.category.toString() : '';
      const i = this.itemFilters.current ? this.itemFilters.current.toString() : '';
      const key = s + c + i;

      if(this.ItemsSearchCache.exist(key)){
        this.items = this.ItemsSearchCache.get(key);
      }else {
        const response = yield pageService.getItems({page: 1, size: this.pagination.pageSize, ...this.itemFilters});
        this.items = response.posts;
        this.seoPage = response.seo;
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
  getItemsCategoryList = flow( function* getItemsCategoryList(params){
    try{
      this.itemsCategoryList = yield pageService.getItemsCategoryList({term: 'ait-items', ...params});
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
