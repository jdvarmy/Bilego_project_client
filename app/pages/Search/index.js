import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import NoContent from '../../components/NoContent';
import { Event300 } from '../../components/Event';
import style from '../../theme/style';
import DatePickerLine from '../../components/DatePickerLine';
import PopularOnWeek from '../FrontPage/PopularOnWeek';
import { LoadingForEventsSearch } from '../../components/LoadingsTemplate';
import BlockHeaderText from '../../components/BlockHeaderText';

import css from '../../theme/style';

const GridWrap = styled(Grid)`
  padding: ${css.sizes.lg};
  .MuiPaper-elevation1{
    box-shadow: none;
  }
`;
const CardWrap = styled(Card)`
  margin-bottom: ${css.sizes.xl};
`;
const DateContainer = styled.div`
  height: ${style.$heightMenu}px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

@withRouter
@inject('searchStore', 'globalStore', 'calendarStore')
@observer
class Search extends Component{
  componentDidMount = async () => {
    const {
      searchStore:{setSearchString, getSearchPageResult, setTitle, parseString},
      location,
      globalStore:{apiRoot, setMeta}
    } = this.props;

    try {
      setSearchString(location.search.substr(1));

      await getSearchPageResult(apiRoot, true);
      setMeta(this.props.searchStore.seoPage);

      setTitle(this.props.searchStore.seoPage.title_page)
    }catch (e) {
      console.log('single event: ', e);
    }
  };
  componentDidUpdate = async (prevProps, prevState, snapshot) => {
    const {
      searchStore:{setSearchString, getSearchPageResult, clear, setTitle},
      globalStore:{apiRoot, setMeta}
    } = this.props;

    try {
      if(prevProps.location.search.substr(1) !== this.props.location.search.substr(1)) {
        clear();
        setSearchString(this.props.location.search.substr(1));

        await getSearchPageResult(apiRoot, true);
        setMeta(this.props.searchStore.seoPage);

        setTitle(this.props.searchStore.seoPage.title_page)
      }
    }catch (e) {
      console.log('single event: ', e);
    }
  };
  componentWillUnmount() {
    this.props.calendarStore.setDaysFilter('');
    this.props.searchStore.clear();
  }

  render(){
    const {searchStore:{isLoading, searchEvents, title}, globalStore:{baseNameForRouting}} = this.props;

    const content = searchEvents && searchEvents.length > 0
        ? searchEvents.map(event=>(
          <Grid key={event.id} item xs={4}>
            <CardWrap>
              <Event300 {...event} baseNameForRouting={baseNameForRouting}/>
            </CardWrap>
          </Grid>
        ))
        : !isLoading &&
        <Grid item xs={12}>
          <NoContent/>
        </Grid>;

    return(
      <GridWrap container spacing={4}>
        <Grid item xs={12}>
          <DateContainer align='middle' type='flex' justify='center'>
            <DatePickerLine/>
          </DateContainer>
        </Grid>
          {isLoading && searchEvents && searchEvents.length <= 0
            ? <LoadingForEventsSearch />
            : <React.Fragment>
              <Grid item xs={12}>
                <BlockHeaderText>{title}</BlockHeaderText>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={4}>
                  {content}
                </Grid>
              </Grid>
            </React.Fragment>
          }
        <Grid item xs={12}>
          <PopularOnWeek />
        </Grid>
      </GridWrap>
    );
  }
}

export default Search;
