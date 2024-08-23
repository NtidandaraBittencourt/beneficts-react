import React from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const EmployeeActionsMenu = ({
  anchorEl,
  handleMenuClose,
  handleMenuOpen,
  handleOptionClick,
  handleEditBenefits,
  selectedEmployee,
}) => {
  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={(event) => handleMenuOpen(event, selectedEmployee)}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleOptionClick('Edit')}>Editar</MenuItem>
        <MenuItem onClick={() => handleOptionClick('Delete')}>Excluir</MenuItem>
        <MenuItem onClick={handleEditBenefits}>Adicionar benefício</MenuItem>
      </Menu>
    </>
  );
};

export default EmployeeActionsMenu;
