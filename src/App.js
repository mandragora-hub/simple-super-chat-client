import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import Routes from './routes';
import { SnackbarProvider } from 'notistack';

import { QueryCache, ReactQueryCacheProvider } from 'react-query';
const queryCache = new QueryCache();

const App = () => {
  const Routing = useRoutes(Routes);

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <SnackbarProvider maxSnack={3}>{Routing}</SnackbarProvider>
      </ThemeProvider>
    </ReactQueryCacheProvider>
  );
};

export default App;
