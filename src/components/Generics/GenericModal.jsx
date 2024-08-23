import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const GenericModal = ({ open, onClose, title, content, actions, onSave }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fechar
        </Button>
        <Button onClick={onSave} color="primary" variant="contained">
          Salvar
        </Button>
        {actions}
      </DialogActions>
    </Dialog>
  );
};

export default GenericModal;
