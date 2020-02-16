import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const STextField = styled(TextField)`
  width: 387px;
`;
const STextFieldCat = styled(TextField)`
  width: 200px;
`;
const Sform = styled.form`
  max-width: 870px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  legend{
    display: none!important;
  }
`;

@inject('pageStore', 'globalStore')
@observer
class ItemsSearch extends Component{
  componentDidMount() {
    const {pageStore:{getItemsCategoryList}, globalStore:{apiRoot}} = this.props;
    getItemsCategoryList(apiRoot);
  }

  time;

  setCategory = event => {
    const {pageStore:{setItemFilter}, globalStore:{apiRoot}} = this.props;
    const value = 'Все площадки' === event.target.value ? '' : event.target.value;

    setItemFilter(apiRoot, {category: value});
  };
  setSearch = (event) => {
    const {pageStore:{setItemFilter}, globalStore:{apiRoot}} = this.props;
    const value = event.target.value;

    this.time = setTimeout(function(){
      setItemFilter(apiRoot, {search: value});
    }, 100);
  };

  componentWillUnmount(){
    clearTimeout(this.time);
  };

  render(){
    const {pageStore:{itemsCategoryList, itemFilters}} = this.props;

    return(
      <Sform noValidate autoComplete="off">
        <STextField
          id="bilego-search"
          label="Название места, улица"
          type="search"
          onChange={this.setSearch}
          margin="normal"
          variant="outlined"
        />
        <STextFieldCat
          id="bilego-select-category"
          select
          label="Тип места"
          value={itemFilters.category ? itemFilters.category : 'Все площадки'}
          onChange={this.setCategory}
          margin="normal"
          variant="outlined"
        >
          {[{cat_ID: 0, name: 'Все площадки'}, ...itemsCategoryList].map((cat) =>(
            <MenuItem key={cat.name} value={cat.name}>
              {cat.name}
            </MenuItem>
          ))}
        </STextFieldCat>
      </Sform>
    )
  }
}

export default ItemsSearch;
