import React from 'react';
import clsx from 'clsx';
import {
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core';
import orange from '@material-ui/core/colors/orange';
import blue from '@material-ui/core/colors/blue';


const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'red',
    borderRadius: '5%',
    maxWidth: '250px',
    margin: theme.spacing(2, 1),
    padding: theme.spacing(2)
  },
  theirMessage: {
    background: orange[50],
  },
  myMessage: {
    background: blue[50],
  },
}));

const Message = ({username, message, myMessage, ...rest}) => {
  const classes = useStyles();

  return (
    <Paper className={clsx(classes.root, {
      [classes.theirMessage]: !myMessage,
      [classes.myMessage]: myMessage
    })} {...rest}>
      <Typography
        gutterBottom
        variant="body2">
        {username} 
      </Typography>
      <Typography variant="body2">{message}</Typography>
    </Paper>
  );
};

export default Message;
