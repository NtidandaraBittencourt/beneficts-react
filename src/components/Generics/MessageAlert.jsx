import React from 'react';
import { Alert } from '@mui/material';

const MessageAlert = ({ message }) => {
  return message.msg && <Alert variant="filled" severity={message.status} 
  className='m-4 fixed bottom-0 left-0 right-0 z-50 w-1/2 flex justify-self-end'> {message.msg}
  </Alert>;
};

export default MessageAlert;
