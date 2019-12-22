import { createMuiTheme } from '@material-ui/core/styles';
// import './scss/base.scss';

export { default as style } from './style';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#202124',
    },
    background: {
      default: '#fff',
    },
  },
  shape: {
    borderRadius: 0
  }
});
