import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = process.env.REACT_APP_NEW_CHAT_MESSAGE_EVENT // Name of the event
const SOCKET_SERVER_URL = process.env.REACT_APP_REST_API_URL;


const useChat = (uuid) => {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const [incoming, setInconming] = useState({});
  const socketRef = useRef();

  useEffect(() => {
    
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { uuid },
    });
    
    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
      setInconming(incomingMessage)
    });
    
    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [uuid]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (user, messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      userId: user.id,
      roomId: user.roomId,
      username: user.username,
      body: messageBody,
      senderId: socketRef.current.id,
    });
  };

  return { messages, incoming, setMessages, sendMessage };
};

export default useChat;