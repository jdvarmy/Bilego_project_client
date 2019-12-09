import Grid from '@material-ui/core/Grid';
import React, {Component} from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import Selection from '../../components/Selection';
import {BlockHeaderText} from '../../theme/elements';
import {inject, observer} from 'mobx-react';

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
        image: 'https://mos.bilego.ru/wp-content/uploads/cache/images/2019/10/jakuznya/jakuznya-1337482152.jpg',
        title: ['Чем', 'заняться в', 'выходные'],
        mask: 'weekends',
        link: `/${baseNameForRouting}/search/?mask=weekends`
      },
      bilego: {
        image: 'https://mos.bilego.ru/wp-content/uploads/cache/images/2019/10/moscow-raceway/moscow-raceway-1586251346.jpg',
        title: ['Bilego', 'для', 'Детей'],
        mask: 'bilego',
        link: `/${baseNameForRouting}/search/?mask=bilego`
      },
      art: {
        image: 'https://mos.bilego.ru/wp-content/uploads/cache/images/2019/10/resto-podsolnuhi/resto-podsolnuhi-3204549477.jpeg',
        title: ['Art', 'лекторий', 'в кино'],
        mask: 'art',
        link: `/${baseNameForRouting}/search/?mask=art`
      },
      theatre: {
        image: 'https://mos.bilego.ru/wp-content/uploads/cache/images/2019/10/rock-house-klub/rock-house-klub-3415468135.jpg',
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