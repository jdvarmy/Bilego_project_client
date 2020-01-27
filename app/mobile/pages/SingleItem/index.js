import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import style from '../../../theme/style';
import PopularOnWeek from '../../components/PopularOnWeek';
import Slider from './Slider';
import Events from './Events';

const Wrap = styled.div`
  overflow: hidden;
`;
const Content = styled.div`
  background-color: ${style.$white};
  overflow: hidden;
  margin-top: -24px;
  border-radius: 16px 16px 0 0;
  z-index: 1;
  position: relative;
  padding-top: 16px;
`;
const GridWrap = styled(Grid)`
  padding: 5px 16px;
`;

@withRouter
@inject('singleItemStore', 'globalStore')
@observer
class SingleItem extends Component {
  componentDidMount = async () => {
    try {
      const {singleItemStore:{getItemDataBySlug}, match, globalStore:{apiRoot, setMeta}} = this.props;
      await getItemDataBySlug(apiRoot, {slug: match.params.itemSlug});

      setMeta(this.props.singleItemStore.item.seo_meta);
    }catch (e) {
      console.log('single item: ', e);
    }
  };

  componentDidUpdate = async (prevProps, prevState, snapshot) => {
    try {
      const {singleItemStore: {getItemDataBySlug}, globalStore: {apiRoot, setMeta}} = this.props;

      if (prevProps.match.params.itemSlug !== this.props.match.params.itemSlug) {
        await getItemDataBySlug(apiRoot, {slug: this.props.match.params.itemSlug});
        setMeta(this.props.singleItemStore.item.seo_meta);
      }
    }catch (e) {
      console.log('single item: ', e);
    }
  };

  componentWillUnmount() {
    this.props.singleItemStore.clear();
  }

  render() {
    const {singleItemStore:{item}, globalStore:{baseNameForRouting}} = this.props;

    return (
      <Wrap>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {item && <Slider item={item} baseNameForRouting={baseNameForRouting} />}
          </Grid>
        </Grid>
        <Content>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {item && <Events />}
            </Grid>
            <Grid item xs={12}>
              <GridWrap container spacing={2}>
                <Grid item xs={12}>
                  <div style={{marginTop: '1em'}}/>
                  <Typography component="h1" variant="h4">{item && item.title}</Typography>
                  <div style={{marginTop: '1em'}}/>
                  {item &&
                  <Typography className="bilego-event-content" component="div" variant="body1">
                    <span dangerouslySetInnerHTML={{ __html: item.content }}/>
                  </Typography>
                  }
                </Grid>
              </GridWrap>
            </Grid>
            <Grid item xs={12}>
              <PopularOnWeek />
            </Grid>
          </Grid>
        </Content>
      </Wrap>
    )
  }
}

export default SingleItem;
