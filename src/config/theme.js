import {createMuiTheme} from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8AE2FF',
    },
    secondary: {
      main: '#91F362',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});