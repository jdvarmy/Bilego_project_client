import React from 'react';
import {inject, observer} from 'mobx-react';
import styled from 'styled-components';
import MenuItem from '@material-ui/core/MenuItem';

import { StyledTextField } from '../../components/StyledTextField';
import style from '../../theme/style';

export const FilterLine = inject('pageStore')(observer(
  ({pageStore: {lineFilters}}) => {
    console.log(lineFilters)

    return <React.Fragment>
      <StyledTextField
        select
        label="Жанр"
        value={'all'}
        // onChange={this.setCategory}
        margin="normal"
        variant="outlined"
      >
        {[{id: 0, name: 'Все жанры', slug: 'all'}, ...lineFilters.genre].map(genre =>(
          <MenuItem key={genre.name} value={genre.slug}>
            {genre.name}
          </MenuItem>
        ))}
      </StyledTextField>
    </React.Fragment>;
  }
));
