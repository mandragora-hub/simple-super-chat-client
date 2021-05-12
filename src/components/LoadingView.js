import React from 'react';
import {
  Box,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import PropTypes from 'prop-types';


const useStyles = makeStyles(() => ({
  root: {},

  layout: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularProgress: {
    marginTop: '20%',
  }
}));

const LoadingView = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Box className={classes.layout}>
      <CircularProgress className={classes.circularProgress} size={50}/>
    </Box>
  )
};

LoadingView.propTypes = {
  className: PropTypes.string
};


export default LoadingView;
