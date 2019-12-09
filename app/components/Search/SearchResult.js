import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import Spinner from '../Spinner';
import BlockHeaderTextOld from '../BlockHeaderTextOld';
import { Spin } from 'antd';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Event from './Event';
import Item from './Item';
import { Scrollbars } from 'react-custom-scrollbars';
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
    color: ${style.$grey}
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
            <Spin spinning={isLoading} indicator={<Spinner leftPadding={27/2}/>}>
              {events &&
                <Fragment>
                  <Sh2>События</Sh2>
                  <List>
                    {events.map(event=>(
                      <ListItem key={event.id}>
                        <Event {...event} baseNameForRouting={baseNameForRouting}/>
                      </ListItem>
                      ))
                    }
                  </List>
                </Fragment>
              }
              {events && items && <Divider />}
              {items &&
              <Fragment>
                <Sh2>Площадки</Sh2>
                <List>
                  {items.map(item=>(
                    <ListItem key={item.id}>
                      <Item {...item} baseNameForRouting={baseNameForRouting}/>
                    </ListItem>
                  ))
                  }
                </List>
              </Fragment>
              }
            </Spin>
          </Scroll>
        </SList>
      </Fragment>
    );
  }
}

export default SearchResult;