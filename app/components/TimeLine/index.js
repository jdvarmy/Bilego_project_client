import React, {Component, Fragment} from 'react';
import {inject, observer} from 'mobx-react';
import styled from 'styled-components';
import {BilegoIconLoading} from '../../theme/BilegoIcons';
import Fab from '@material-ui/core/Fab';
import style from '../../theme/style';
import {NavLink} from 'react-router-dom';

const Wrapper = styled.div`
  position: relative;
`;
const Container = styled.div`
  &:before{
    content: "";
    position: absolute;
    top: 30px;
    left: 25px;
    bottom: 0;
    width: 4px;
    background: ${style.$grey};
  }
`;
const SFab = styled(Fab)`
  margin: 35px auto!important;
  transition: opacity .2s ease 0s;
`;
const LoadMore = styled.div`
  display: flex;
`;

const LineContainer = styled.div`
  margin-top: 30px;
  margin-left: 30px;
  &:first-child{
    margin-top: 0;
  }
`;
const LineHeaderDate = styled.div`
  position: relative;
  left: -30px;
  margin-top: 25px;
  padding: 5px 0;
  overflow: hidden;
`;
const Date = styled.div`
  display: flex;
  width: 57px;
  height: 57px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${style.$white}
  & div:first-child{
    font-size: 1.8em;
  }
  & div:last-child{
    text-transform: uppercase;
    color: ${style.$greydark};
    margin-top: -8px;
    padding-bottom: 4px;
  }
`;
const LineEvent = styled.div`
  padding: 0 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
  :last-child{
    margin-bottom: 0;
  }
  & > span{
    width: 10px;
    height: 10px;
    position: absolute;
    background: ${style.$red};
    border-radius: 100%;
    left: -8px;
    top: calc(50% - 5px);
    transition: transform ${style.$transition} ${style.$transitionanimation} 0s;
    &:before{
      content: "";
      width: 10px;
      height: 8px;
      background: ${style.$white};
      position: absolute;
      top: -8px;
    }
    &:after{
      content: "";
      width: 10px;
      height: 8px;
      background: ${style.$white};
      position: absolute;
      bottom: -8px;
    }
  }
`;
const LineEventImage = styled.div`
  height: 80px;
  width: 80px;
  overflow: hidden;
  border-radius: 100%;
  position: relative;
  & a > div:first-child{
    height: 100%;
    background-image: url('${p=>(p.img)}');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: transform .5s ease 0s;
  }
  & a > div:last-child{
    background-color: ${style.$redtr};
    width: 80px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity ${style.$transition} ${style.$transitionanimation} 0s;
  }
`;
const LineEventContent = styled.div`
  width: calc(100% - 80px);
  padding-left: 20px;
  & > a:first-child{
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 5px;
    color: ${style.$black}
    &:hover{
      color: ${style.$red}
    }
  }
  & > div:last-child{
    color: ${style.$greydark}
  }
`;


  // 'e_id'
  // 'e_title'
  // 'e_name'
  // 'e_date'
  // 'e_format_date'
  // 'e_img'
  //
  // 'i_id'
  // 'i_title'
  // 'i_name'
  // 'i_map'
// todo: add address


@inject('rightPanelStore', 'globalStore')
@observer
class TimeLine extends Component {
  componentDidMount() {
    const {rightPanelStore:{getDataTimeLine, clear}} = this.props;

    clear();
    getDataTimeLine();
  }

  loadMore = () => {
    const {rightPanelStore:{pagination, setPagination, getDataTimeLine}} = this.props;

    setPagination(pagination.current + 1);
    getDataTimeLine();
  };

  render() {
    const {rightPanelStore:{events, pagination, isLoading}, globalStore:{baseNameForRouting}} = this.props;

    return (
      <Fragment>
        <Wrapper>
          <Container className="bilego-timeline">
            {events.map(event => {
              return (
                <LineContainer key={event.date}>
                  <LineHeaderDate>
                    <Date>
                      <div>{event.events[0].e_format_date.d}</div>
                      <div>{event.events[0].e_format_date.M}</div>
                    </Date>
                  </LineHeaderDate>
                  {event.events.map(e=>(
                    <LineEvent className="bilego-line-event" key={e.e_id}>
                      <span className="line-event-dot"/>
                      <LineEventImage img={e.e_img}>
                        <NavLink to={`/${baseNameForRouting}/event/${e.e_name}`} exact>
                          <div className="event-image"/>
                          <div className="event-image-overlay"/>
                        </NavLink>
                      </LineEventImage>
                      <LineEventContent>
                        <NavLink to={`/${baseNameForRouting}/event/${e.e_name}`} exact>
                          {e.e_title}
                        </NavLink>
                        <div>{e.i_title}</div>
                      </LineEventContent>
                    </LineEvent>
                  ))}
                </LineContainer>
              )
            })}
          </Container>
        </Wrapper>
        <LoadMore>
          {pagination.showButton &&
          <SFab disabled={isLoading} onClick={this.loadMore} variant="extended" aria-label="load" style={{opacity: `${p=>p.loading ? 0 : 1}`}}>
            {BilegoIconLoading} load more
          </SFab>}
        </LoadMore>
      </Fragment>
    );
  }
}

export default TimeLine;