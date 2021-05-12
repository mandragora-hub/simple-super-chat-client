import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box,Paper, Divider, Typography, Link, makeStyles } from '@material-ui/core';

function Copyright() {
  return (
    <Box p={2}>
      <Box
        pb={2}
        display="flex">
        <Link
          component={RouterLink}
          color="inherit"
          underline="always"
          to={'#'}>
          <Typography variant="caption">Term of Use</Typography>
        </Link>
        <Typography
          style={{ padding: '0 10px' }}
          variant="caption">
          |
        </Typography>
        <Link
          component={RouterLink}
          color="inherit"
          underline="always"
          to={'#'}>
          <Typography variant="caption">Privacy Policy</Typography>
        </Link>
      </Box>
      <Typography variant="caption">
        {`© 1995 - ${new Date().getFullYear()} by SuperChat.com.`}
      </Typography>
    </Box>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.common.white
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={1}>
      <Divider />
      <Copyright />
    </Paper>
  );
};

export default Footer;
