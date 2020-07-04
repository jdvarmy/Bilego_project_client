import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import css from '../../theme/style';

const Field = styled(TextField)`
  .MuiOutlinedInput-root{
    border-radius: ${css.sizes.xxxxl};
  }
  .MuiOutlinedInput-input{
    padding-left: ${css.sizes.lg};
    padding-right: ${css.sizes.lg};
  }
  .MuiInputLabel-outlined{
    transform: translate(${css.sizes.lg}, 20px) scale(1);
  }
`;

export const StyledTextField = function(props){
  return <Field {...props} />
};
