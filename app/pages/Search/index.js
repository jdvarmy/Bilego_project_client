import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Spin } from 'antd';
import Spinner from '../../components/Spinner';
import NoContent from '../../components/NoContent';
import { Event300 } from '../../components/Event';
import style from '../../theme/style';
import DatePickerLine from '../../components/DatePickerLine';
import PopularOnWeek from '../FrontPage/PopularOnWeek';
import { LoadingForEvents } from '../../components/LoadingsTemplate';

const Wrap = styled.div`
  padding: 20px;
  overflow: hidden;
`;
const GridWrap = styled(Grid)`
  .MuiPaper-elevation1{
    box-shadow: none;
  }
`;
const CardWrap = styled(Card)`
  margin-bottom: 30px;
`;
const DateContainer = styled.div`
  height: ${style.$heightMenu}px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

@withRouter
@inject('searchStore', 'globalStore')
@observer
class Search extends Component{
  componentDidMount() {
    const {searchStore:{setSearchString, getSearchPageResult}, location, globalStore:{apiRoot}} = this.props;

    setSearchString(location.search.substr(1));
    getSearchPageResult(apiRoot);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const {searchStore:{setSearchString, getSearchPageResult}, globalStore:{apiRoot}} = this.props;

    if(prevProps.location.search.substr(1) !== this.props.location.search.substr(1)) {
      setSearchString(this.props.location.search.substr(1));
      getSearchPageResult(apiRoot);
    }
  }

  render(){
    const {searchStore:{isLoading, searchEvents}, globalStore:{baseNameForRouting}} = this.props;

    const content = searchEvents.length > 0
        ?
        searchEvents.map(event=>(
          <Grid key={event.id} item xs={4}>
            <CardWrap>
              <Event300 {...event} baseNameForRouting={baseNameForRouting}/>
            </CardWrap>
          </Grid>
        ))
        :
        !isLoading &&
        <Grid item xs={12}>
          <NoContent/>
        </Grid>;

    return(
      <Wrap>
        <GridWrap container spacing={4}>
          <DateContainer align='middle' type='flex' justify='center'>
            <DatePickerLine/>
          </DateContainer>
          <Grid item xs={12}>
            <Spin spinning={isLoading} indicator={<Spinner leftPadding={27/2}/>}>
              <Grid container spacing={4}>
                {isLoading && searchEvents.length <= 0
                  ? <LoadingForEvents />
                  : content
                }
              </Grid>
            </Spin>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <PopularOnWeek />
            </Grid>
          </Grid>
        </GridWrap>
      </Wrap>
    );
  }
}

export default Search;
