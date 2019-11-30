import { createMuiTheme } from '@material-ui/core/styles';

export { default as style } from './style';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    background: {
      default: '#fff',
    },
  },
  shape: {
    borderRadius: 0
  }
});
