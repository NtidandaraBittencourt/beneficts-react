import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EmployeeRow from './EmployeeRow';

const EmployeeTable = ({ employees, openCollapse, setOpenCollapse, setOpenModal, setEmployeeId }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Benefícios cadastrados</TableCell>
            <TableCell>Menu</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees?.map((employee, index) => (
            <EmployeeRow
              key={employee.id}
              employee={employee}
              index={index}
              openCollapse={openCollapse}
              setOpenCollapse={setOpenCollapse}
              setOpenModal={setOpenModal}
              setEmployeeId={setEmployeeId}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
