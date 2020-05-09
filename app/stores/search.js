import {observable, action, configure, flow} from 'mobx';
import {searchService} from '../services';

configure({
  enforceActions: 'always'
});

class Search{
  @observable search = -1;
  @observable request = '';
  @observable date = new Date();
  @observable dateDayFlag = null;

  @observable title;

  @observable searchResult = undefined; // events, items, artists
  @observable events = undefined;
  @observable items = undefined;
  @observable artists = undefined;

  defaultPageSize = 21;
  @observable searchString = '';
  @observable searchEvents = [];
  @observable pagination = {current: 1, pageSize: this.defaultPageSize, showButton: true};

  @observable seoPage = [];

  cache = {};
  searchCache = {
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
      this.searchCache.remove(resource);
      this.cache[resource] = cachedData;
    },
  };

  @observable focus = false;
  @observable isLoading = false;

  @action
  clear = () => {
    this.searchResult = undefined;
    this.events = undefined;
    this.items = undefined;
    this.artists = undefined;
    this.cache = {};
    this.seoPage = [];
    this.title = undefined;
    this.searchEvents = [];

    this.changeSearchStatus(-1);
    this.setRequest('');
  };

  @action
  setStartDataSearchPage = (data) => {
    this.searchEvents = data.events.length > 0 ? data.events : undefined;
    this.seoPage = data.seo_meta ? data.seo_meta : [];
    this.setTitle(data.seo_meta && data.seo_meta.title_page ? data.seo_meta.title_page : '');
  };

  @action
  setSearchString = (string) => {
    this.searchString = string;
  };

  @action
  changeSearchStatus = (status) => {
    this.search = status;
  };

  @action
  setRequest = (value) => {
    this.request = value;
  };

  @action
  setDate = (value) => {
    this.date = value;
  };

  @action
  changeFocus = (flag) => {
    this.focus = flag;
  };

  @action
  setTitle = (args) => {
    if(args)
      this.title = args;
  };

  @action
  getSearchResult = flow( function* getSearchResult(params){
    this.isLoading = true;
    try {
      const key = this.request + this.date.getFullYear()+this.date.getMonth()+this.date.getDate();
      if(this.searchCache.exist(key)){
        this.searchResult = this.searchCache.get(key);
        this.events = this.searchResult.events.length > 0 ? this.searchResult.events : undefined;
        this.items = this.searchResult.items.length > 0 ? this.searchResult.items : undefined;
        this.artists = this.searchResult.artists.length > 0 ? this.searchResult.artists : undefined;
      }else {
        const args = {
          text: this.request,
        };
        const response = yield searchService.getSearchResult({...params, ...args});
        this.searchResult = response;
        this.events = response.events.length > 0 ? response.events : undefined;
        this.items = response.items.length > 0 ? response.items : undefined;
        this.artists = response.artists.length > 0 ? response.artists : undefined;
        this.searchCache.set(key, this.searchResult)
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }).bind(this);

  @action
  getSearchPageResult = flow( function* getSearchPageResult(params, all=false){
    this.isLoading = true;
    try {
      let args = this.parseString();
      if(!all) {
        args.size = this.pagination.pageSize;
        args.page = this.pagination.current;
      }

      const response = yield searchService.getSearchPageResult({...params, ...args});
      this.searchEvents = response.posts.length > 0 ? response.posts : [];
      this.seoPage = response.seo ? response.seo : [];
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }).bind(this);

  parseString = () => {
    const params = new URLSearchParams(this.searchString);

    return {
      start: params.get('start'),
      end: params.get('end'),
      s: params.get('s'),
      selection: params.get('selection'),
      cat: params.get('cat'),
    };
  }
}

// decorate(Search, {
//   getSearchResult: action.bound
// });

export default new Search();
