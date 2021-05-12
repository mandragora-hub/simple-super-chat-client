import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Typography,
  Box,
  IconButton,
  makeStyles
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.common.white,
    height: '56px'
  },
  brand: {
    marginLeft: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  navigator: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'noWrap'
  }
}));

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar
      position="sticky"
      elevation={1}
      className={clsx(classes.root, className)}
      {...rest}>
      <Box display="flex">
        <Box className={classes.brand}>
          <Typography
            color="secondary"
            variant="h6">
            SuperChat
          </Typography>
        </Box>
        <Box flexGrow={1} />
        <Box className={classes.navigator}>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};
export default TopBar;
