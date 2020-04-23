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
import BlockHeaderTextH3 from '../BlockHeaderTextH3';
import Event from './Event';
import Item from './Item';
import css from '../../theme/style';

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
`;
const Scroll = styled(Scrollbars)`
  height: 100%;
  h4{
    margin-left: 15px;
  }
`;

@inject('searchStore', 'globalStore')
@observer
class SearchResult extends Component {

  render(){
    const {searchStore:{events, items, isLoading}, globalStore:{baseNameForRouting}} = this.props;

    return(
      <Fragment>
        <Wrapper>
          <BlockHeaderTextH3>Поиск</BlockHeaderTextH3>
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
