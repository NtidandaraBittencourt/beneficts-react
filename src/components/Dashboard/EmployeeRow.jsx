import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { TableRow, TableCell, IconButton, Collapse, Box, Chip } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EmployeeDetails from './EmployeeDetails';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmployeeActionsMenu from './EmployeeActionsMenu';
import api from '../../services/api';

const EmployeeRow = ({ employee, index, openCollapse, setOpenCollapse, setOpenModal, setEmployeeId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = async (option) => {
    handleMenuClose();
    if (option === 'Edit') {
      navigate(`/edit-employee/${employee.id}`);
    } else if (option === 'Delete') {
      await api.delete(`/employees/${employee.id}`);
      queryClient.invalidateQueries(['employees']);
    }
  };

  const handleEditBenefits = () => {
    setEmployeeId(employee.id); 
    setOpenModal(true);
    handleMenuClose();
  };

  return (
    <>
      <TableRow
        hover
        sx={{
          '&:hover': { cursor: 'pointer', backgroundColor: '#f5f5f5' },
          backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#ffffff',
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenCollapse(openCollapse === index ? null : index)}
          >
            {openCollapse === index ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{employee.name}</TableCell>
        <TableCell>{employee.email}</TableCell>
        <TableCell>
          {employee.benefits.map((benefit) => (
            <Chip
              key={benefit.id}
              label={benefit.name}
              color="primary"
              size="small"
              style={{ marginRight: 4, marginBottom: 4 }}
            />
          ))}
        </TableCell>
        <TableCell>
          <EmployeeActionsMenu
            anchorEl={anchorEl}
            handleMenuClose={handleMenuClose}
            handleMenuOpen={handleMenuOpen}
            handleOptionClick={handleOptionClick}
            handleEditBenefits={handleEditBenefits}
            selectedEmployee={employee}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openCollapse === index} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <EmployeeDetails employee={employee} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default EmployeeRow;
