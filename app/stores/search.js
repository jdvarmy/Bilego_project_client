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

  @observable title = 'Поиск';

  @observable searchResult = undefined; // events, items
  @observable events = undefined;
  @observable items = undefined;

  defaultPageSize = 21;
  @observable searchString = '';
  @observable searchEvents = [];
  @observable pagination = {current: 1, pageSize: this.defaultPageSize, showButton: true};

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
  setStartDataSearchPage = (data) => {
    this.searchEvents = data.events.length > 0 ? data.events : [];
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

  // todo: описать код
  @action
  setTitle = (args) => {
    // console.log(args)
    this.title = args;
  };

  @action
  getSearchResult = flow( function* getSearchResult(apiRoot){
    this.isLoading = true;
    try {
      const key = this.request + this.date.getFullYear()+this.date.getMonth()+this.date.getDate();
      if(this.searchCache.exist(key)){
        this.searchResult = this.searchCache.get(key);
        this.events = this.searchResult.events.length > 0 ? this.searchResult.events : undefined;
        this.items = this.searchResult.items.length > 0 ? this.searchResult.items : undefined;
      }else {
          const args = {
            text: this.request,
            date: this.date.getTime()
          };
          this.searchResult = yield searchService.getSearchResult(apiRoot, args);
          this.events = this.searchResult.events.length > 0 ? this.searchResult.events : undefined;
          this.items = this.searchResult.items.length > 0 ? this.searchResult.items : undefined;
          this.searchCache.set(key, this.searchResult)
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }).bind(this);

  @action
  getSearchPageResult = flow( function* getSearchPageResult(apiRoot, all=false){
    this.isLoading = true;
    try {
      let args = this.parseString();
      if(all){
        args.size = -1;
        args.page = 1;
      }else {
        args.size = this.pagination.pageSize;
        args.page = this.pagination.current;
      }

      const response = yield searchService.getSearchPageResult(apiRoot, args);
      this.searchEvents = response.events.length > 0 ? response.events : [];
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
      mask: params.get('mask'),
      cat: params.get('cat'),
    };
  }
}

// decorate(Search, {
//   getSearchResult: action.bound
// });

export default new Search();
