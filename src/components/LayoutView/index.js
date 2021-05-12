import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },

  content: {
    flex: '1 0 auto'
  },
  
}));

const LayoutView = ({ className, pageTitle, children }) => {
  const classes = useStyles();

  return (
    <Page
      className={clsx(classes.root, className)}
      title={pageTitle}>
      <Box className={classes.content}>{children}</Box>
    </Page>
  );
};

LayoutView.propTypes = {
  className: PropTypes.string,
  pageTitle: PropTypes.string,
  children: PropTypes.node.isRequired
  // data: PropTypes.object
};

export default LayoutView;
