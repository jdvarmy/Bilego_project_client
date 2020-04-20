import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

const Wrapper = styled.div`
  ${p => (
    p.event &&
    `width: 100%; height: 645px;`
  )}
  & > div{
    width: 100%;
    height: 645px;
  }
  iframe{
    border: none;
  }
`;

@inject('singleEventStore')
@observer
class TicketsFrame extends Component{
  iframe = (link) => (
    {__html: `<iframe src="${link}" width="100%" height="100%" allowfullscreen />`}
  );

  render() {
    const {event} = this.props.singleEventStore;

    return (
      <Wrapper event={event && event.ticket_link}>
        {event && event.ticket_link && <div dangerouslySetInnerHTML={this.iframe(event.ticket_link)}/>}
      </Wrapper>
    )
  }
}

export default TicketsFrame;
