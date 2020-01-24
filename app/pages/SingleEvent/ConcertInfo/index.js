import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Info from './Info';
import { LoadingContentInfo } from '../../../components/LoadingsTemplate';

@inject('singleEventStore')
@observer
class ContentInfo extends Component{
  render() {
    const {singleEventStore:{event, isLoading}} = this.props;

    return isLoading && event === undefined
      ? <LoadingContentInfo />
      : <Info {...event} />
  }
}

export default ContentInfo;