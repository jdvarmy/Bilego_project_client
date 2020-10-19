import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';

import { Calendar, MuiPickersUtilsProvider } from 'material-ui-pickers';
import ruLocale from 'date-fns/locale/ru';
import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';

import clsx from 'clsx';
import style from '../../theme/style';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {instanceOf} from "prop-types";

const useStyles = makeStyles({
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
    border: `1px solid #202124`,
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
  calendarWrap: {
    overflow: "hidden",
    maxWidth: "390px"
  },
  maxWidth: {
    maxWidth: "390px",
    display: "flex",
    justifyContent: "center"
  }
});

export const FilterLine = withRouter(inject('pageStore', 'calendarStore', 'globalStore', 'searchStore')(observer(
  ({
    history,
    pageStore: {lineFilters},
    calendarStore:{start, end, months, days, selectedDate, daysFilter, setDate, clear, setStart, setEnd, setDaysFilter, getSearchString},
    globalStore:{baseNameForRouting},
    searchStore: {setSearchString}
  }) => {
    // clear();
    const classes = useStyles();

    const changeDate = DateIOType => {
      setDate(DateIOType);
    };

    const handlerClickByButton = flag => {
      clear();

      function addDays(date, days) {
        if (date instanceof Date)
          return new Date(date.setDate(date.getDate() + days));

        return false;
      }

      let d = new Date();
      if(flag === 'today'){
        setStart(d);
        setEnd(d);
      }else if(flag === 'tomorrow'){
        setStart(addDays(d, 1));
        setEnd(d);
      }else if(flag === 'weekend'){
        if(d.getDay() === 6 || d.getDay() === 0){
          if(d.getDay() === 6){
            setStart(d);
            setEnd(addDays(d, 1));
          }else if(d.getDay() === 0){
            setStart(d);
            setEnd(d);
          }
        }else{
          const days = 6 - d.getDay(); // кол-во добавляемых дней до субботы
          setStart(addDays(d, days));
          setEnd(addDays(d,days + 1));
        }
      }
      setDaysFilter(flag);

      // history.push(`/${baseNameForRouting}/search?${getSearchString}`);
      // setSearchString(getSearchString);
      console.log(getSearchString)
    };

    const handlerClick = flag => {
      console.log(flag)
    };

    const renderWrappedDay = (date, selectedDate, dayInCurrentMonth) => {
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

    return <>
      <Grid container>
        <Grid item xs={6}>
          <Typography className="pb1 center" variant="h6" component="h6">Календарь</Typography>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="subtitle1" component="h6">Сегодня {`${days[new Date().getDay()]}, ${new Date().getDate()} ${months[new Date().getMonth()]}`}</Typography>
              <Box className="bilego-buttons-filters">
                <Fab onClick={() => {handlerClickByButton('today')}} variant="extended" aria-label="today">Сегодня</Fab>
                <Fab onClick={() => {handlerClickByButton('tomorrow')}} variant="extended" aria-label="tomorrow">Завтра</Fab>
                <Fab onClick={() => {handlerClickByButton('weekend')}} variant="extended" aria-label="weekend">Выходные</Fab>
                <Fab onClick={() => {handlerClickByButton('month')}} variant="extended" aria-label="month">Месяц</Fab>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                <div className={classes.calendarWrap}>
                  <Calendar
                    disablePast
                    date={selectedDate}
                    onChange={changeDate}
                    renderDay={renderWrappedDay}
                  />
                </div>
              </MuiPickersUtilsProvider>
              <Box className={classes.maxWidth}>
                <Fab onClick={handlerClick} variant="extended" aria-label="Calendar" disabled={!start}>
                  {
                    !start
                    ? `Выберите даты`
                    : start && !end
                      ? `Выбрать события с ${start.getDate()} ${months[start.getMonth()]}`
                      : start && end
                        ? start.getMonth() === end.getMonth()
                          ? `Выбрать с ${start.getDate()} по ${end.getDate()} ${months[start.getMonth()]}`
                          : `Выбрать с ${start.getDate()} ${months[start.getMonth()]} по ${end.getDate()} ${months[end.getMonth()]}`
                        : `Выберите даты`
                  }
                </Fab>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={2}>
          <Typography className="pb1 center" variant="h6" component="h6">Жанры</Typography>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={2}>
          <Typography className="pb1 center" variant="h6" component="h6">Площадки</Typography>
        </Grid>
      </Grid>
     </>
  }
)));
