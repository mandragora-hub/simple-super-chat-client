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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide
    direction="up"
    ref={ref}
    {...props} />;
});

const useStyles = makeStyles({
  root: {}
});

function CreateRoomDialog(props) {
  const classes = useStyles();
  const { onClose, open } = props;

  const [roomName, setRoomName] = useState('');
  const handleClose = () => {
    onClose(roomName);
  };

  const handleChange = event => {
    setRoomName(event.target.value);
  };

  return (
    <Dialog
      TransitionComponent={Transition}
      keepMounted
      maxWidth="sm"
      onClose={handleClose}
      open={open}>
      <DialogTitle>Room name</DialogTitle>
      <DialogContent>
        <TextField
          value={roomName}
          onChange={handleChange}
          label="username"
          placeholder="username"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CreateRoomDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default CreateRoomDialog;
