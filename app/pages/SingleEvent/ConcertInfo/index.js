import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Info from './Info';

@inject('singleEventStore')
@observer
class ContentInfo extends Component{
  render() {
    const {singleEventStore:{event, isLoading}} = this.props;

    return !isLoading && <Info {...event}/>
  }
}

export default ContentInfo;