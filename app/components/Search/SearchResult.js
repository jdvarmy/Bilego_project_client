import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Scrollbars } from 'react-custom-scrollbars';
import styled from 'styled-components';

import { Spin } from 'antd';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Spinner from '../Spinner';
import BlockHeaderTextOld from '../BlockHeaderTextOld';
import Event from './Event';
import Item from './Item';
import style from '../../theme/style';

const Wrapper = styled.div`
  height: ${style.$heightMenu}px;
  display: flex;
  align-items: center;
`;
const SList = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  .ant-spin-nested-loading{
    height: 100%;
  }
`;
const Scroll = styled(Scrollbars)`
    height: 100%;
`;
const Sh2 = styled.h2`
    margin: 16px;
`;
const SBlockHeaderText = styled(BlockHeaderTextOld)`
    margin: 16px;
    color: ${style.$grey};
`;

@inject('searchStore', 'globalStore')
@observer
class SearchResult extends Component {

  render(){
    const {searchStore:{events, items, isLoading}, globalStore:{baseNameForRouting}} = this.props;

    return(
      <Fragment>
        <Wrapper>
          <SBlockHeaderText>Поиск</SBlockHeaderText>
        </Wrapper>
        <Divider />
        <SList>
          <Scroll>
            <Spin spinning={isLoading} indicator={<Spinner leftPadding={0} position="absolute"/>}>
            {events &&
              <div>
                <Typography variant="h5" component="h4">События</Typography>
                <List>
                  {events.map(event=>(
                    <ListItem key={event.id}>
                      <Event {...event} baseNameForRouting={baseNameForRouting}/>
                    </ListItem>
                    ))
                  }
                </List>
              </div>
            }
            {events && items && <Divider />}
            {items &&
            <div>
              <Typography variant="h5" component="h4">Площадки</Typography>
              <List>
                {items.map(item=>(
                  <ListItem key={item.id}>
                    <Item {...item} baseNameForRouting={baseNameForRouting}/>
                  </ListItem>
                ))
                }
              </List>
            </div>
            }
            </Spin>
          </Scroll>
        </SList>
      </Fragment>
    );
  }
}

export default SearchResult;