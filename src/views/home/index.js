import React from 'react';
import {useNavigate} from 'react-router-dom';
import { Box, Button, makeStyles } from '@material-ui/core';
import LayoutView from 'src/components/LayoutView';
import Plesiosaur from 'src/components/Plesiosaur';
import CreateRoomDialog from './CreateRoomDialog';
// import CreateIcon from '@material-ui/icons/Create';
// import RedditIcon from '@material-ui/icons/Reddit';
import { client } from 'src/utils/api-client';
import { useQuery } from 'react-query';

const useStyles = makeStyles(theme => ({
  root: { height: '100%' },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const HomeView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  useQuery(
    [name],
    () =>
      client('room/create', {
        data: {
          roomName: name
        }
      }),
    {
      refetchOnWindowFocus: false,
      enabled: name, // turned off by default, manual refetch is needed
      onSuccess: res => {
        console.log(res);
        navigate(`/room/${res.data.uuid}`)
      }
    }
  );

  const handleCreateChange = () => {
    setOpen(true);
  };

  const handleClose = roomName => {
    setOpen(false);
    setName(roomName);
  };

  return (
    <LayoutView
      className={classes.root}
      pageTitle="Home - SuperChat">
      <CreateRoomDialog
        open={open}
        onClose={handleClose} />
      <Box className={classes.content}>
        <Box
          mt={'30%'}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center">
          <Plesiosaur width="100px" />
          <Box display="flex">
            <Button href="/join">Join to room</Button>
            <Box pl={1} />
            <Button onClick={handleCreateChange}>Create room</Button>
          </Box>
        </Box>
      </Box>
    </LayoutView>
  );
};

export default HomeView;
