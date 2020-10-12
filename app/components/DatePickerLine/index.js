import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
import {
  ArrowDown,
  BilegoIconGenre,
  BilegoIconItem,
  BilegoIconTheCalendar
} from '../../theme/bilegoIcons';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import css from '../../theme/style';

const SBox = styled(Box)`
  width: 224px;
  padding: ${css.sizes.md};
`;
const WrapFab = styled.div`
  ${p=>(
    p.mini ? 'margin: 0 6px;' : 'margin: 0 18px;'
  )}
  .MuiFab-extended{
    color: ${style.$greydark};
    background-color: ${style.$white};
    .MuiSvgIcon-root{
      font-size: 1.5rem;
    }
  }
  .selected button{
    color: ${style.$white};
    background-color: ${style.$red};
  }
  ${p=>(
    p.mini && `
      :first-child{
        margin: 0 6px 0 25px;
      }
      :last-child{
        margin: 0 25px 0 6px;
      }
    `
  )}
`;
const SListItemText = styled(ListItemText)`
  white-space: nowrap;
`;

@withRouter
@inject('calendarStore', 'searchStore', 'globalStore', 'pageStore')
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

  @action handlerClickOpen = (e, element) => {
    this.open = element;
    this.anchorEl = e.currentTarget;
  };

  @observable open = '';
  @observable anchorEl = null;

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
    const id = this.open ? 'simple-popover' : undefined,
      flag = this.props.history.location.pathname.indexOf('search') +1;
    const {calendarStore:{start, end, months, days, selectedDate, daysFilter}, mini, pageStore:{lineFilters}, globalStore:{baseNameForRouting}} = this.props,
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
      buffy = <Fab onClick={(e) => {this.handlerClickOpen(e, '')}} variant="extended" aria-label="Calendar">Отмена</Fab>;

    const Buttons = [
      <WrapFab mini={mini} className="bilego-wr-fab" key={1}>
        <Fab onClick={e => {this.handlerClickOpen(e, 'calendar')}} variant="extended" aria-label="Calendar">{BilegoIconTheCalendar} Календарь {ArrowDown}</Fab>
      </WrapFab>,
      <WrapFab mini={mini} className={`bilego-wr-fab ${daysFilter==='today' && flag && 'selected'}`} key={2}>
        <Fab onClick={()=>{this.handlerClickByDay('today')}} variant="extended" aria-label="today">Сегодня</Fab>
      </WrapFab>,
      <WrapFab mini={mini} className={`bilego-wr-fab ${daysFilter==='tomorrow' && flag && 'selected'}`} key={3}>
        <Fab onClick={()=>{this.handlerClickByDay('tomorrow')}} variant="extended" aria-label="tomorrow">Завтра</Fab>
      </WrapFab>,
      <WrapFab mini={mini} className={`bilego-wr-fab ${daysFilter==='weekend' && flag && 'selected'}`} key={4}>
        <Fab onClick={()=>{this.handlerClickByDay('weekend')}} variant="extended" aria-label="weekend">Выходные</Fab>
      </WrapFab>
    ];

    return (
      <Fragment>
        <div style={{paddingLeft: '20px'}} />
        {this.props.flickity
          ? <Flickity options={{prevNextButtons: false, pageDots: false, contain: true, freeScroll: true}}>{Buttons}</Flickity>
          : <>
              {Buttons.map(el=>el)}
              <WrapFab mini={mini} className="bilego-wr-fab">
                <Fab onClick={e => {this.handlerClickOpen(e, 'genre')}} variant="extended" aria-label="Genre">{BilegoIconGenre} Жанр {ArrowDown}</Fab>
              </WrapFab>
            </>
        }
        <div style={{paddingLeft: '20px'}} />
        <Popover
          open={this.open === 'calendar'}
          anchorEl={this.anchorEl}
          onClose={(e) => {this.handlerClickOpen(e, '')}}
          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
          transformOrigin={{vertical: 'top', horizontal: 'center'}}
          className="bilego-calendar"
        >
          <Grid container>
            {!this.props.mini &&
              <Grid item xs={5}>
                <SBox>
                  <Button className="bilego-today">
                    <Typography variant="h5"
                                component="h4">Сегодня {`${days[new Date().getDay()]}, ${new Date().getDate()} ${months[new Date().getMonth()]}`}</Typography>
                  </Button>
                  <Box className="bilego-buttons-filters">
                    <Fab onClick={() => {
                      this.handlerClickByDay('today')
                    }} variant="extended" aria-label="today">Сегодня</Fab>
                    <Fab onClick={() => {
                      this.handlerClickByDay('tomorrow')
                    }} variant="extended" aria-label="tomorrow">Завтра</Fab>
                    <Fab onClick={() => {
                      this.handlerClickByDay('weekend')
                    }} variant="extended" aria-label="weekend">Выходные</Fab>
                  </Box>
                </SBox>
              </Grid>
            }
            <Grid item xs={this.props.mini ? 12 : 7} style={{overflow: 'hidden'}}>
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
        <Popover
          open={this.open === 'genre'}
          anchorEl={this.anchorEl}
          onClose={(e) => {this.handlerClickOpen(e, '')}}
          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
          transformOrigin={{vertical: 'top', horizontal: 'center'}}
        >
          <Grid container>
            <Box className="genre">
              <Grid item xs={12}>
                <List component="nav" aria-label="genre">
                  {lineFilters.genre && lineFilters.genre.map( genre =>
                    <ListItem key={genre.slug} button>
                      <ListItemIcon>
                        <img src={genre.image} width={css.sizes.lg} height={css.sizes.lg}/>
                      </ListItemIcon>
                      <Link to={`/${baseNameForRouting}/genre/${genre.slug}`} style={{color: css.$second}}><SListItemText primary={genre.name} /></Link>
                    </ListItem>
                  )}
                </List>
              </Grid>
            </Box>
          </Grid>
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
