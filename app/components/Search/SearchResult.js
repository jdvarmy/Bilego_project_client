import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { Scrollbars } from 'react-custom-scrollbars';
import styled from 'styled-components';

import { Spin } from 'antd';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Spinner from '../Spinner';
import BlockHeaderTextH3 from '../BlockHeaderTextH3';
import Event from './Event';
import Item from './Item';
import Artist from './Artist';

import css from '../../theme/style';
import Button from "@material-ui/core/Button";

const Wrapper = styled.div`
  height: ${css.$heightMenu}px;
  display: flex;
  align-items: center;
  .MuiTypography-h3{
    margin: ${css.sizes.md};
    color: ${css.$grey};
  }
`;
const SList = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  .ant-spin-nested-loading{
    height: 100%;
  }
  button{
    margin: 0 auto ${css.sizes.lg};
    display: block;
    width: 80%;
    border-radius: ${css.sizes.borderRadius};
    transform: scale(.85);
  }
`;
const Scroll = styled(Scrollbars)`
  height: 100%;
  h4{
    margin-left: 15px;
  }
`;
const NoResult = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

@inject('searchStore', 'globalStore')
@observer
class SearchResult extends Component {
  @observable countEvents = 3;
  @observable countItems = 3;
  @observable countArtists = 3;

  @action loadMore = (flagEl) => {
    this[flagEl] += 6;
  };

  render(){
    const {searchStore:{events, items, artists, isLoading}, globalStore:{baseNameForRouting}} = this.props;

    return(
      <Fragment>
        <Wrapper>
          <BlockHeaderTextH3>Поиск</BlockHeaderTextH3>
        </Wrapper>
        <SList>
          <Scroll>
            <Spin spinning={isLoading} indicator={<Spinner leftPadding={0} position="absolute"/>}>
              {events && <Divider />}
              {events &&
                <div>
                  <Typography variant="h5" component="h4">События</Typography>
                  <List>
                    {events.slice(0, this.countEvents).map(event=>(
                      <ListItem key={event.id}>
                        <Event {...event} baseNameForRouting={baseNameForRouting}/>
                      </ListItem>
                      ))
                    }
                  </List>
                  {events.length > this.countEvents &&
                  <Button onClick={() => this.loadMore('countEvents')} size="medium" variant="outlined" disableElevation>
                    Загрузить ещё событий
                  </Button>
                  }
                </div>
              }
              {items && <Divider />}
              {items &&
              <div>
                <Typography variant="h5" component="h4">Площадки</Typography>
                <List>
                  {items.slice(0, this.countItems).map(item=>(
                    <ListItem key={item.id}>
                      <Item {...item} baseNameForRouting={baseNameForRouting}/>
                    </ListItem>
                  ))
                  }
                </List>
                {items.length > this.countItems &&
                  <Button onClick={() => this.loadMore('countItems')} size="medium" variant="outlined" disableElevation>
                    Загрузить ещё площадок
                  </Button>
                }
              </div>
              }
              {artists && <Divider />}
              {artists &&
              <div>
                <Typography variant="h5" component="h4">Артисты</Typography>
                <List>
                  {artists.slice(0, this.countArtists).map(artist=>(
                    <ListItem key={artist.id}>
                      <Artist {...artist} baseNameForRouting={baseNameForRouting}/>
                    </ListItem>
                  ))
                  }
                </List>
                {artists.length > this.countArtists &&
                <Button onClick={() => this.loadMore('countArtists')} size="medium" variant="outlined" disableElevation>
                  Загрузить ещё артистов
                </Button>
                }
              </div>
              }
            </Spin>
          </Scroll>
        </SList>
        {!events && !items && !artists &&
        <NoResult>
          <Typography component="div" variant="h6">Ничего не нашли</Typography>
          <Typography component="div" variant="subtitle1">совсем ничего</Typography>
        </NoResult>}
      </Fragment>
    );
  }
}

export default SearchResult;
