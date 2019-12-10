import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Selection from '../../components/Selection';
import BlockHeaderText from '../../components/BlockHeaderText';

import imgWeekends from './images/weekends.jpg';
import imgArt from './images/art.jpg';
import imgForKids from './images/bilego_for_kids.jpg';
import imgTheatre from './images/theatre.jpg';

const GridWrap = styled(Grid)`
  padding: 24px;
  .MuiPaper-elevation1{
    box-shadow: none;
  }
`;
const CardWrap = styled(Card)`
  height: 300px;
  margin-bottom: 30px;
`;

@inject('globalStore')
@observer
class Selections extends Component{
  render() {
    const {baseNameForRouting} = this.props.globalStore;

    const selections = {
      weekends: {
        image: imgWeekends,
        title: ['Чем', 'заняться в', 'выходные'],
        mask: 'weekends',
        link: `/${baseNameForRouting}/search/?mask=weekends`
      },
      bilego: {
        image: imgForKids,
        title: ['Bilego', 'для', 'Детей'],
        mask: 'bilego',
        link: `/${baseNameForRouting}/search/?mask=bilego`
      },
      art: {
        image: imgArt,
        title: ['Art', 'лекторий', 'в кино'],
        mask: 'art',
        link: `/${baseNameForRouting}/search/?mask=art`
      },
      theatre: {
        image: imgTheatre,
        title: ['olympic', 'theatre'],
        mask: 'theatre',
        link: `/${baseNameForRouting}/search/?mask=theatre`
      }
  };

    return (
      <GridWrap container spacing={4}>
        <Grid item xs={12}><BlockHeaderText>Подборки Bilego</BlockHeaderText></Grid>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <CardWrap>
                <Selection {...selections.weekends}/>
              </CardWrap>
              <CardWrap>
                <Selection {...selections.bilego}/>
              </CardWrap>
            </Grid>
            <Grid item xs={6}>
              <CardWrap>
                <Selection {...selections.art}/>
              </CardWrap>
              <CardWrap>
                <Selection {...selections.theatre}/>
              </CardWrap>
            </Grid>
          </Grid>
        </Grid>
      </GridWrap>
    );
  }
}

export default Selections;