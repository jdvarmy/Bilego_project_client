import React, { useEffect, useState } from 'react';
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
import { useStyles, CssTextField } from './styles.js';
import css from '../../theme/style';

import {
  BilegoIconGenre,
  BilegoIconItem,
} from '../../theme/bilegoIcons';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

export const FilterLine = withRouter(inject('pageStore', 'calendarStore', 'globalStore', 'searchStore')(observer(
  props => {
    const {
      searchPage,
      history,
      pageStore: {lineFilters, getFilters},
      calendarStore:{start, end, months, days, selectedDate, daysFilter, setDate, clear, setStart, setEnd, setDaysFilter},
      globalStore:{baseNameForRouting},
      searchStore: {setSearchString, addReqItem, addReqGenre, reqItems, reqGenre, removeReq}
    } = props;

    useEffect(() => {
      (async () => {
        await getFilters({city: baseNameForRouting});
        const {pageStore:{lineFilters}} = props;
        setState(prev => ({
          ...prev,
          listGenre: lineFilters.genre && lineFilters.genre.slice().sort(() => Math.random() - 0.5).filter((e, i) => i < 6),
          listItem: lineFilters.item && lineFilters.item.slice().sort(() => Math.random() - 0.5).filter((e, i) => i < 6),
        }));
      })();

      return () => {
        setState(prev => ({
          ...prev,
          genre: '',
          item: '',
        }));
        if(searchPage) {
          removeReq('all');
          deleteChipDate();
        }
      }
    }, []);
    const [state, setState] = useState({
      genre: '',
      item: '',
      listGenre: [],
      listItem: []
    });
    const updateText = (e, flag) => {
      e.persist();
      setState( prev => ({
        ...prev,
        [flag]: e.target.value
      }))
    };

    const classes = useStyles();
    const GENRE = 'genre', ITEM = 'item';

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
        const dayOfWeek = d.getDay();
        if(dayOfWeek === 6){
          setStart(d);
          setEnd(addDays(d, 1));
        }else if(dayOfWeek === 0){
          setStart(d);
          setEnd(d);
        }else{
          const days = 6 - dayOfWeek; // кол-во добавляемых дней до субботы
          setStart(addDays(d, days));
          setEnd(addDays(d,1));
        }
      }else if(flag === 'thisMonth'){
        setStart(new Date());
        setEnd(new Date(d.getFullYear(), d.getMonth() + 1, 0));
      }else if(flag === 'month'){
        setStart(new Date());
        setEnd(new Date(d.setMonth(d.getMonth() +1)));
      }
      setDaysFilter(flag);

      const {calendarStore:{getSearchString}} = props;
      history.push(`/${baseNameForRouting}/search?${getSearchString}`);
      setSearchString(getSearchString);
    };
    const handlerListClick = (flag, data) => {
      switch (flag) {
        case GENRE:
          addReqGenre(data);
          break;
        case ITEM:
          addReqItem(data);
          break;
      }
    };
    const deleteChip = (flag, id) => {
        removeReq(flag, id)
    };
    const deleteChipDate = () => {clear()};
    const deleteAllChips = () => {
      clear();
      setState(prev => ({
        ...prev,
        genre: '',
        item: '',
      }));
      removeReq('all')
    };

    const handlerClick = () => {
      const {calendarStore:{getSearchString}} = props;
      let searchString = '';
      if(reqGenre.length > 0){
        searchString += reqGenre.map(el => (`genre=${el.slug}`)).join('&')
      }
      if(reqItems.length > 0){
        if(searchString !== '') searchString += '&';
        searchString += reqItems.map(el => (`item=${el.slug}`)).join('&')
      }
      if(getSearchString && searchString){
        searchString = getSearchString+'&'+searchString;
      }else if(getSearchString && !searchString){
        searchString = getSearchString
      }

      history.push(`/${baseNameForRouting}/search?${searchString}`);
      setSearchString(searchString);
    };

    const listGenreRender = ({id, image, name, slug}) => (
      <ListItem key={id} role={undefined} dense button>
        <ListItemIcon>
          <img src={image} alt={slug} width={css.sizes.lg} height={css.sizes.lg} />
        </ListItemIcon>
        <ListItemText id={id} primary={name} onClick={() => handlerListClick(GENRE, {id, slug, name, image})} />
      </ListItem>
    );
    const listItemRender = ({id, image, name, slug}) => (
      <ListItem key={id} role={undefined} dense button>
        <ListItemText id={id} primary={name} onClick={() => handlerListClick(ITEM, {id, slug, name, image})} />
      </ListItem>
    );

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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography className="pb1 center" variant="h6" component="h6">Календарь</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className="pb1 center" variant="h6" component="h6">Жанры</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className="pb1 center" variant="h6" component="h6">Площадки</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" component="h6">Сегодня {`${days[new Date().getDay()]}, ${new Date().getDate()} ${months[new Date().getMonth()]}`}</Typography>
                  <Box>
                    <List>{[{name: 'Сегодня', label: 'today'},
                        {name: 'Завтра', label: 'tomorrow'},
                        {name: 'Выходные', label: 'weekend'},
                        {name: 'Этот месяц', label: 'thisMonth'},
                        {name: 'Месяц', label: 'month'},
                      ].map(({name, label}) => (
                        <ListItem key={label} role={undefined} dense button>
                          <ListItemText id={label} primary={name} onClick={() => {handlerClickByButton(label)}}/>
                        </ListItem>
                      ))}
                    </List>
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
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <FormControl>
                <CssTextField
                  label="Название жанра"
                  InputProps={{startAdornment: (
                      <InputAdornment position="start">
                        {BilegoIconGenre}
                      </InputAdornment>
                    )}}
                  onChange={e => {updateText(e, GENRE)}}
                  value={state.genre}
                />
                <div>
                  <List>
                    { state.genre.length <= 1
                    ? state.listGenre.map(listGenreRender)
                    : lineFilters.genre && lineFilters.genre.slice()
                        .filter(el => el.name.toLowerCase().indexOf(state.genre.toLowerCase().trim()) !== -1)
                        .filter((e, i) => i < 6)
                        .map(listGenreRender)
                    }
                  </List>
                </div>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl>
                <CssTextField
                  label="Название площадки"
                  InputProps={{startAdornment: (
                      <InputAdornment position="start">
                        {BilegoIconItem}
                      </InputAdornment>
                    )}}
                  onChange={e => {updateText(e, ITEM)}}
                  value={state.item}
                />
                <div>
                  <List>
                    { state.item.length <= 1
                      ? state.listItem.map(listItemRender)
                      : lineFilters.item && lineFilters.item.slice()
                        .filter(el => el.name.toLowerCase().indexOf(state.item.toLowerCase().trim()) !== -1
                          || el.excerpt.toLowerCase().indexOf(state.item.toLowerCase().trim()) !== -1)
                        .filter((e, i) => i < 6)
                        .map(listItemRender)
                    }
                  </List>
                </div>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Box className={classes.chipWrap}>
                {!start
                  ? ``
                  : start && !end
                    ? <Chip variant="outlined" label={`Выбрать события с ${start.getDate()} ${months[start.getMonth()]}`} onDelete={deleteChipDate} />
                    : start && end
                      ? start.getMonth() === end.getMonth() && start.getDate() === end.getDate()
                        ? <Chip variant="outlined" label={`Выбрать события за ${start.getDate()} ${months[start.getMonth()]}`} onDelete={deleteChipDate} />
                        : start.getMonth() === end.getMonth()
                          ? <Chip variant="outlined" label={`Выбрать события с ${start.getDate()} по ${end.getDate()} ${months[start.getMonth()]}`} onDelete={deleteChipDate} />
                          : <Chip variant="outlined" label={`С ${start.getDate()} ${months[start.getMonth()]} по ${end.getDate()} ${months[end.getMonth()]}`} onDelete={deleteChipDate} />
                      : ``
                }
                {reqGenre.map(el => <Chip variant="outlined" key={el.id} label={el.name} onDelete={() => deleteChip(GENRE, el.id)} avatar={<Avatar alt={el.slug} src={el.image} />} />)}
                {reqItems.map(el => <Chip variant="outlined" key={el.id} label={el.name} onDelete={() => deleteChip(ITEM, el.id)} avatar={<Avatar alt={el.slug} src={el.image} />} />)}
              </Box>
            </Grid>
            <Grid item xs={3} container alignItems="flex-end">
              <Box className={classes.maxWidth}>
                <Fab onClick={handlerClick} variant="extended" aria-label="Calendar" disabled={!start && !reqGenre.length && !reqItems.length}>
                  Показать события
                </Fab>
                <Button onClick={deleteAllChips} variant="text" size="small" aria-label="Clear" disabled={!start && !reqGenre.length && !reqItems.length}>
                  Сбросить
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
     </>
  }
)));
