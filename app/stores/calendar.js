import {observable, action, configure, computed} from 'mobx';
import format from 'date-fns/format';

configure({
  enforceActions: 'always'
});

class Calendar{
  @observable start = null;
  @observable end = null;

  @observable selectedDate = new Date();

  months = ["января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];
  days = ['воскр', 'понед', 'вторн', 'среда', 'четв', 'пятн', 'субб'];

  @observable daysFilter = '';
  @action setDaysFilter = day =>{
    this.daysFilter = day
  };

  @computed get getYear() {
    return (!this.start || !this.end)
           ? new Date().getFullYear()
           : this.start.getFullYear() === this.end.getFullYear()
             ? this.start.getFullYear()
             : this.start.getFullYear()
               ? this.start.getFullYear()
               : new Date().getFullYear();
  }
  @computed get getStartDateString() {
    return this.start ? `${this.days[this.start.getDay()]}, ${this.start.getDate()} ${this.months[this.start.getMonth()]}` : null;
  }
  @computed get getEndDateString() {
    return this.end ? `${this.days[this.end.getDay()]}, ${this.end.getDate()} ${this.months[this.end.getMonth()]}` : null;
  }
  @computed get getSearchString() {
    let string = null;

    if(this.start || this.end) {
      string = '';

      if (this.start) {
        string += `start=${this.start.getDate()}-${this.start.getMonth()+1}-${this.start.getFullYear()}`;
      }
      if (this.start && this.end) {
        string += `&end=${this.end.getDate()}-${this.end.getMonth()+1}-${this.end.getFullYear()}`;
      }
    }

    return string;
  }

  @action
  setStart = date => {
    this.start = date;
  };
  @action
  setEnd = date => {
    this.end = date;
  };

  @action
  setDate = date => {
    this.selectedDate = date;
    if(this.start && format(this.start, 'MM/dd/yyyy') === format(date, 'MM/dd/yyyy'))
      return;

    if (this.start !== null && this.end !== null) {
      this.clear();
      this.start = date;
    }else if (this.start !== null && this.end === null) {
      this.end = date;
    }else if (this.start === null) {
      this.start = date;
    }

    if (this.start && this.end && this.start.getTime() > this.end.getTime())
      [this.start, this.end] = [this.end, this.start];
  };

  @action
  clear = () => {
    this.start = null;
    this.end = null;
  }
}

export default new Calendar();