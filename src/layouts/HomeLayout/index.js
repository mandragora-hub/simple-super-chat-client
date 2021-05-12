import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, makeStyles } from '@material-ui/core';
import TopBar from './TopBar';
import Footer from './Footer';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.background.dark
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'auto'
  },
  wrapper: {
    backgroundColor: theme.palette.common.white,
    flex: '1 1 auto',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const HomeLayout = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container
        className={classes.container}
        disableGutters
        maxWidth="sm">
        <TopBar />
        <div className={classes.wrapper}>
          <Outlet />
        </div>
        {/* <Footer /> */}
      </Container>
    </div>
  );
};

export default HomeLayout;
