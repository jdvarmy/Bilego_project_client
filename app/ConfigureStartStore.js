import { observable, action } from 'mobx';

export default class ConfigureStartStore {
  @observable data;
  @observable history;
  constructor(initialState, history) {
    this.setData(initialState);
    this.setHistory(history);
  }
  @action setData = (initialState) => {
    this.data = initialState;
  };
  @action setHistory = (history) => {
    this.history = history;
  };
  toJson() {
    return {
      data: this.data,
      history: this.history,
    };
  }
}
