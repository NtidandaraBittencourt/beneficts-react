import React from 'react';
import { Alert } from '@mui/material';

const MessageAlert = ({ message }) => {
  return message.msg && <Alert variant="filled" severity={message.status}> {message.msg}</Alert>;
};

export default MessageAlert;
