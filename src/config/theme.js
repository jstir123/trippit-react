import {createMuiTheme} from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8AE2FF',
      contrastText: '#fff',
    },
    secondary: {
      main: '#91F362',
      contrastText: '#fff',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});