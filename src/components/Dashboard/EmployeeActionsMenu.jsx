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
        hover
      >
        <MenuItem 
          onClick={() => handleOptionClick('Edit')}
          sx={{
            '&:hover': { cursor: 'pointer', backgroundColor:  '#f0f0f0' }
          }}> 
          Editar funcionário
        </MenuItem>
        <MenuItem
          onClick={handleEditBenefits}
          sx={{
            '&:hover': { cursor: 'pointer', backgroundColor:  '#f0f0f0' }
          }}
        >
            Editar benefício
        </MenuItem>
        <MenuItem
          onClick={() => handleOptionClick('Delete')}
          sx={{
            '&:hover': { cursor: 'pointer', backgroundColor:  '#f0f0f0' }
          }}
        >
          Excluir
        </MenuItem>
      </Menu>
    </>
  );
};

export default EmployeeActionsMenu;
