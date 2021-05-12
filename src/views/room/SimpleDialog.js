import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  makeStyles
} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import { client } from 'src/utils/api-client';
import { useQuery } from 'react-query';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide
    direction="up"
    ref={ref}
    {...props} />;
});

const useStyles = makeStyles({
  root: {}
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, roomUuid, open } = props;

  const [openDialog, setOpenDialog] = useState(open);
  const [username, setUsername] = useState('');
  const [truename, setTruename] = useState('');

  useQuery([truename], () =>
      client('user/create', {
        data: {
          roomUuid: roomUuid,
          username: truename
        }
      }),
    {
      refetchOnWindowFocus: false,
      enabled: truename, // turned off by default, manual refetch is needed
      onSuccess: res => {
        onClose(res);
        setOpenDialog(false)
      }
    }
  );

  const handleClose = () => {
    setTruename(username)
  };

  const handleChange = event => {
    setUsername(event.target.value);
  };

  return (
    <Dialog
      TransitionComponent={Transition}
      keepMounted
      maxWidth="sm"
      onClose={handleClose}
      open={openDialog}>
      <DialogTitle>Set your username</DialogTitle>
      <DialogContent>
        <TextField
          value={username}
          onChange={handleChange}
          label="username"
          placeholder="username"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default SimpleDialog;
