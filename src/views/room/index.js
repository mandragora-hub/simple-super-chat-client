import React, { useState, useEffect } from 'react';
import { Box, InputAdornment, TextField, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import LayoutView from 'src/components/LayoutView';
import Message from './Message';
import SendIcon from '@material-ui/icons/Send';
import useChat from 'src/utils/useChat';
import SimpleDialog from './SimpleDialog';
import {useMutation, useQuery} from 'react-query';
import { client } from 'src/utils/api-client';


const MyMessage = ({ username, message, ...rest }) => {
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      {...rest}>
      <Message
        {...rest}
        myMessage
        username={username}
        message={message} />
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  root: { height: '100%' },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  chatBody: {
    padding: theme.spacing(2),
    height: '80vh',
    overflowY: 'scroll'
  }
}));

const RoomView = () => {
  const classes = useStyles();
  let { uuid } = useParams();

  useQuery('message', () => client(`room/${uuid}/messages`), {
      refetchOnWindowFocus: false,
      // enabled: false, // turned off by default, manual refetch is needed
      onSuccess: res => {
        const newArray = res.data?.messages.map((item)=>{
          return {
            body: item?.body,
            username: item?.user?.username
          }
        })
        setMessages(newArray)
      }
    }
  );

  const [mutate] = useMutation((data) =>
  client('message/create', {
    data: {
      roomId: data.roomId,
      userId: data.userId,
      body: data.body,
    }
  }))

  
  const { messages, incoming, sendMessage, setMessages } = useChat(uuid); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = useState(''); // Message to be sent
  const [user, setUser] = useState(); // Message to be sent
  
  useEffect(()=>{mutate(incoming)},[incoming, mutate])

  const handleNewMessageChange = event => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage === '') return;
    sendMessage(user, newMessage);
    setNewMessage('');
  };

  return (
    <LayoutView
      className={classes.root}
      pageTitle="Room - Superchat">
      <SimpleDialog
        open
        roomUuid={uuid}
        onClose={user => setUser(user.data)} />
      <Box className={classes.content}>
        <Box className={classes.chatBody}>
          {messages.map((message, i) => {
            return (
              <Box key={i}>
                {message.username === user?.username ? (
                  <MyMessage
                    username={message.username}
                    message={message.body}
                  />
                ) : (
                  <Message
                    username={message.username}
                    message={message.body} />
                )}
              </Box>
            );
          })}
        </Box>
        <Box
          display="flex"
          alignItems="center">
          <TextField
            placeholder="Type a message..."
            variant="filled"
            fullWidth
            value={newMessage}
            onChange={handleNewMessageChange}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SendIcon onClick={handleSendMessage}/>
                </InputAdornment>
              )
            }}
          />
        </Box>
      </Box>
    </LayoutView>
  );
};

export default RoomView;
