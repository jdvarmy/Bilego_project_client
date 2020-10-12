import React from 'react';
import {inject, observer} from 'mobx-react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';

import {BasePicker, Calendar, MuiPickersUtilsProvider} from 'material-ui-pickers';
import ruLocale from 'date-fns/locale/ru';
import DateFnsUtils from '@date-io/date-fns';

import css from '../../theme/style';

const CalendarWrap = styled('div')`
  overflow: hidden;
`;

export const FilterLine = inject('pageStore', 'calendarStore')(observer(
  ({
     pageStore: {lineFilters},
     calendarStore:{start, end, months, days, selectedDate, daysFilter, setDate},
     classes
  }) => {

    const changeDate = DateIOType => {
      setDate(DateIOType);

      console.log(DateIOType)
    };

    const handlerClickByDay = flag => {
      console.log(flag)
    };

    return <>
      <Grid container>
        <Grid item xs={6}>
          <Typography className="pb1 center" variant="h6" component="h6">Календарь</Typography>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="subtitle1" component="h6">Сегодня {`${days[new Date().getDay()]}, ${new Date().getDate()} ${months[new Date().getMonth()]}`}</Typography>
              <Box className="bilego-buttons-filters">
                <Fab onClick={() => {handlerClickByDay('today')}} variant="extended" aria-label="today">Сегодня</Fab>
                <Fab onClick={() => {handlerClickByDay('tomorrow')}} variant="extended" aria-label="tomorrow">Завтра</Fab>
                <Fab onClick={() => {handlerClickByDay('weekend')}} variant="extended" aria-label="weekend">Выходные</Fab>
                <Fab onClick={() => {handlerClickByDay('month')}} variant="extended" aria-label="month">Месяц</Fab>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                <BasePicker value={selectedDate} onChange={changeDate}>
                  {({date, handleChange}) => (
                    <CalendarWrap>
                      <Calendar
                        disablePast
                        date={date}
                        onChange={handleChange}
                      />
                    </CalendarWrap>
                  )}
                </BasePicker>
              </MuiPickersUtilsProvider>
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
      <Box>
        {/*{buffy}*/}
      </Box>
     </>
  }
));
