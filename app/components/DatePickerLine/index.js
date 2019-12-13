import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { withRouter } from 'react-router-dom';
import Flickity from 'react-flickity-component';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import clsx from 'clsx';
import 'date-fns';

import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Fab from '@material-ui/core/Fab';
import Popover from '@material-ui/core/Popover';
import { Calendar } from '@material-ui/pickers'
import Box from '@material-ui/core/Box';
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import createStyles from '@material-ui/styles/createStyles';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import format from 'date-fns/format';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';
import style from '../../theme/style';
import { ArrowDown, BilegoIconCalendar } from '../../theme/BilegoIcons';

const SBox = styled(Box)`
  width: 224px;
  padding: 16px;
`;
const WrapFab = styled.div`
  margin: 0 18px;
  .MuiFab-extended{
    color: ${style.$greydark};
    background-color: ${style.$white};
  }
  &.selected button{
    color: ${style.$white};
    background-color: ${style.$red};
  }
`;

@withRouter
@inject('calendarStore', 'searchStore', 'globalStore')
@observer
class DatePickerLine extends Component{
  handlerClick = () => {
    const {calendarStore:{getSearchString, setDaysFilter}, searchStore:{setSearchString}, globalStore:{baseNameForRouting}} = this.props;

    this.props.history.push(`/${baseNameForRouting}/search?${getSearchString}`);
    setSearchString(getSearchString);

    setDaysFilter('calendar');
  };

  handlerClickByDay = (day) => {
    const {calendarStore:{clear, setStart, setEnd, setDaysFilter}, globalStore:{baseNameForRouting}} = this.props;
    clear();

    function addDays(date, days) {
      let result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }

    if(day === 'today'){
      setStart( new Date() );
      setEnd( new Date() );
      setDaysFilter('today');
    }else if(day === 'tomorrow'){
      setStart( addDays(new Date(), 1) );
      setEnd( addDays(new Date(), 1) );
      setDaysFilter('tomorrow');
    }else if(day === 'weekend'){
      let date = new Date();
      if(date.getDay() === 6 || date.getDay() === 0){
        if(date.getDay() === 6){
          setStart( date );
          setEnd( addDays(date, 1) );
        }else if(date.getDay() === 0){
          setStart( date );
          setEnd( date );
        }
      }else{
        const days = 6 - date.getDay(); // кол-во добавляемых дней до субботы
        setStart( addDays(date, days) );
        setEnd( addDays(date, days + 1) );
      }
      setDaysFilter('weekend');
    }

    const {getSearchString} = this.props.calendarStore;
    const {setSearchString} = this.props.searchStore;

    this.props.history.push(`/${baseNameForRouting}/search?${getSearchString}`);
    setSearchString(getSearchString);
  };

  handlerClickOpen = e => {
      this.show(e);
  };

  @observable open = false;
  @observable anchorEl = null;
  @action show = (e) => {
    this.open = !this.open;
    this.anchorEl = e.currentTarget;
  };

  changeDate = DateIOType => {
    const {calendarStore:{setDate}} = this.props;
    setDate(DateIOType);
  };
  renderWrappedWeekDay = (date, selectedDate, dayInCurrentMonth) => {
    const { classes, calendarStore:{start, end} } = this.props;
    let dayIsBetween, isFirstDay, isLastDay, isBeforeDay, isToday;

    const cloneDate = new Date(format(date, 'MM/dd/yyyy')),
      today = new Date(format(new Date(), 'MM/dd/yyyy')),
      startDate = start && new Date(format(start, 'MM/dd/yyyy')),
      endDate = end && new Date(format(end, 'MM/dd/yyyy'));

    isBeforeDay = isBefore(cloneDate, today);
    if(start && end){
      dayIsBetween = date >= startDate && date <= endDate;
      isFirstDay = isSameDay(date, startDate);
      isLastDay = isSameDay(date, endDate);
    }else if(start){
      isToday = isSameDay(date, startDate);
    }

    const wrapperClassName = clsx({
      [classes.highlight]: dayIsBetween,
      [classes.firstHighlight]: isFirstDay,
      [classes.endHighlight]: isLastDay,
    });

    const dayClassName = clsx(classes.day, {
      [classes.beforeCurrentDay]: isBeforeDay,
      [classes.selectedDay]: isToday || isFirstDay || isLastDay,
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
    });

    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span> {format(date, "d")} </span>
        </IconButton>
      </div>
    );
  };

  render() {
    const id = this.open ? 'simple-popover' : undefined, flag = this.props.history.location.pathname.indexOf('search') +1;
    const {calendarStore:{start, end, months, days, selectedDate, daysFilter}} = this.props,
      sd = start ? start.getDate() : null,
      ed = end ? end.getDate() : null,
      sm = start && start.getMonth(),
      em = end && end.getMonth();
    let buffy = '';

    if(sd && !ed)
      buffy = <Fab onClick={this.handlerClick} variant="extended" aria-label="Calendar">Выбрать {`${sd} ${months[sm]}`}</Fab>;
    else if(sd && ed)
      buffy = <Fab onClick={this.handlerClick} variant="extended" aria-label="Calendar">Выбрать {`${sd} ${months[sm]} - ${ed} ${months[em]}`}</Fab>;
    else
      buffy = <Fab onClick={this.handlerClickOpen} variant="extended" aria-label="Calendar">Отмена</Fab>;

    const Buttons = [
      <WrapFab className="bilego-wr-fab" key={1}>
        <Fab onClick={this.handlerClickOpen} variant="extended" aria-label="Calendar">{BilegoIconCalendar} Календарь {ArrowDown}</Fab>
      </WrapFab>,
      <WrapFab className={`bilego-wr-fab ${daysFilter==='today' && flag && 'selected'}`} key={2}>
        <Fab onClick={()=>{this.handlerClickByDay('today')}} variant="extended" aria-label="today">Сегодня</Fab>
      </WrapFab>,
      <WrapFab className={`bilego-wr-fab ${daysFilter==='tomorrow' && flag && 'selected'}`} key={3}>
        <Fab onClick={()=>{this.handlerClickByDay('tomorrow')}} variant="extended" aria-label="tomorrow">Завтра</Fab>
      </WrapFab>,
      <WrapFab className={`bilego-wr-fab ${daysFilter==='weekend' && flag && 'selected'}`} key={4}>
        <Fab onClick={()=>{this.handlerClickByDay('weekend')}} variant="extended" aria-label="weekend">В выходные</Fab>
      </WrapFab>
    ];

    return (
      <Fragment>
        <div style={{paddingLeft: '20px'}} />
        {this.props.flickity
          ? <Flickity options={{prevNextButtons: false, pageDots: false, contain: true, freeScroll: true}}>{Buttons}</Flickity>
          : Buttons //todo: Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
        }
        <div style={{paddingLeft: '20px'}} />
        <Popover
          id={id}
          open={this.open}
          anchorEl={this.anchorEl}
          onClose={this.handlerClickOpen}
          anchorOrigin={{vertical: 'bottom', horizontal: 'center',}}
          transformOrigin={{vertical: 'top', horizontal: 'center',}}
          className="bilego-calendar"
        >
          <Grid container>
            <Grid item xs={5}>
              <SBox>
                <Button className="bilego-today">
                  <Typography variant="h5" component="h4">Сегодня {`${days[new Date().getDay()]}, ${new Date().getDate()} ${months[new Date().getMonth()]}`}</Typography>
                </Button>
                <Box className="bilego-buttons-filters">
                  <Fab onClick={()=>{this.handlerClickByDay('today')}} variant="extended" aria-label="today">Сегодня</Fab>
                  <Fab onClick={()=>{this.handlerClickByDay('tomorrow')}} variant="extended" aria-label="tomorrow">Завтра</Fab>
                  <Fab onClick={()=>{this.handlerClickByDay('weekend')}} variant="extended" aria-label="weekend">В выходные</Fab>
                </Box>
              </SBox>
            </Grid>
            <Grid item xs={7} style={{overflow: 'hidden'}}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                <Calendar
                  disablePast
                  variant="static"
                  openTo="date"
                  onChange={this.changeDate}
                  renderDay={this.renderWrappedWeekDay}
                  date={selectedDate}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <Box>
            {buffy}
          </Box>
        </Popover>
      </Fragment>
    )
  }
}

const styles = createStyles(theme => ({
  dayWrapper: {
    position: "relative",
  },
  day: {
    width: 36,
    height: 36,
    fontSize: "0.95em",
    margin: "0 2px",
    color: "inherit",
  },
  customDayHighlight: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "2px",
    right: "2px",
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "50%",
  },
  beforeCurrentDay: {
    color: style.$grey,
  },
  selectedDay: {
    color: '#fff',
    fontWeight: '500',
    backgroundColor: style.$red,
    '&:hover': {backgroundColor: style.$red},
  },
  nonCurrentMonthDay: {
    visibility: 'hidden',
  },
  highlightNonCurrentMonthDay: {
    color: style.$black,
  },
  highlight: {
    background: style.$redtr,
    color: style.$white,
  },
  firstHighlight: {
    extend: "highlight",
    background: `linear-gradient(90deg, rgba(255,255,255,0) 50%, ${style.$redtr} 51%, ${style.$redtr} 100%)`,
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  },
  endHighlight: {
    extend: "highlight",
    background: `linear-gradient(90deg, ${style.$redtr} 49%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%)`,
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  },
}));

export default withStyles(styles)(DatePickerLine);
