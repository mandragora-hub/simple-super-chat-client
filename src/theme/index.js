import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#f5f5f5',
      default: colors.common.white,
      paper: colors.common.white,
      light: colors.common.white,
    },
    primary: {
      main: colors.blue[500]
    },
    secondary: {
      main: colors.common.black
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[700]
    }
  },
  // shape: { borderRadius: 15 },
  shadows,
  typography
});

export default theme;
